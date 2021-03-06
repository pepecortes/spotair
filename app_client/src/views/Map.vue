<template lang="pug">
	div(id="map")
		b-alert(
			:variant="alert.type",
			dismissible,
			fade,
			:show="alert.show",
			@dismissed="alert.show=false",
		) {{ alert.text }}
		
		br
		
		div(v-show='mapAvailable', ref='gmapFilter', id='gmapFilter')
			div(style="width: 80%; float: left;" )
				v-select(
								:options="anneeOptionSorted",
								label="text",
								v-model="annee",
								placeholder="Année",
								selectLabel="",
								selectedLabel="",
								deselectLabel="",
								)
			b-button(size="sm", variant="outline-secondary", @click='homeClicked')
				b-icon(icon="house")
				
		gmap-map(
			style="width: 100%; height: 700px;",
			ref='mapRef',
			:center='center',
			:zoom='zoom',
			:options='options',
		)
</template>

<script>
import ControlVueMultiselect from "../components/ControlVueMultiselect.vue" 
import { alertMixin } from '../mixins/Alert'
import { gmapApi } from 'vue2-google-maps'
import { BIcon, BIconBullseye, BIconX, BIconHouse } from 'bootstrap-vue'
import lodash_orderBy from 'lodash/orderBy'

export default {
	
	components: {
    'v-select': ControlVueMultiselect,
		BIcon,
    BIconBullseye,
    BIconX,
    BIconHouse,
	},
	
	mixins: [alertMixin],
	
	data() {
		return {
      center: {lat:15, lng:15},
      zoom: 3,
      galeries: [],
      MAP: null,
      mapAvailable: false,
      markerClusterer: null,
      spiderfier: null,
      infoWindow: null,
      anneeOptions: [],
      annee: null,
      clusterOptions: {
				zoomOnClick: false,
				gridSize: 40,
				maxZoom: 12,
				imagePath: `${process.env.ASSETS_URL}icons/markercluster`
			},
			spiderfierOptions: {
				nearbyDistance: 40,
				nudgeStackedMarkers: false,
				markersWontMove: true,
				markersWontHide: true,
				basicFormatEvents: true,
				keepSpiderfied: true,
				spiderfiedShadowColor: false,
				spiralFootSeparation: 30,
				spiralLengthFactor: 4,
				spiralLengthStart: 20,
				legWeight: 0.2,
			},
    }
	},
	
	computed: {
		google: gmapApi,
		
		options() {
			if (!this.google) return {}
			return {
				mapTypeControl: false,
				fullscreenControl: false,
			}
		},
		
		anneeOptionSorted() {
			return lodash_orderBy(this.anneeOptions, [annee => annee.text], ['desc'])
		},
		
	},
	
	watch: {
		
		galeries: function(newValue, oldValue) {
			this.updateMarkers(this.galeries)
		},
		
		annee: function(newValue, oldValue) {
			const id = (newValue)? newValue.id : null
			this.getGaleries(id)
		},
		
	},
		
	beforeMount() {
		this.axios.get('annees')
			.then(response => this.anneeOptions = response.data)
			.catch(err => vm.showAxiosAlert(err))
	},
	
	mounted() {
		var vm = this
		this.$refs.mapRef.$mapPromise.then(map => {
			this.MAP = map
			this.initializeMap()
			this.mapAvailable = true
			this.getGaleries()
		})
	},

	methods: {
		
		getGaleries(id) {
			const apiCall = (id == null)? `galeries` : `galeries/byAnnee/${id}`
			this.axios.get(apiCall)
				.then(response => this.galeries = response.data)
				.catch(err => this.showAxiosAlert(err))
		},
		
		initializeMap() {
			const vm = this
			vm.addCustomControl(vm.$refs.gmapFilter)
			const MarkerClusterer = require('node-js-marker-clusterer')
			const OverlappingMarkerSpiderfier = require('overlapping-marker-spiderfier')
			vm.markerClusterer = new MarkerClusterer(vm.MAP, [], vm.clusterOptions)
			vm.infoWindow = new vm.google.maps.InfoWindow()
			vm.spiderfier = new OverlappingMarkerSpiderfier(vm.MAP, vm.spiderfierOptions)
			
			// add multiple listeners
			vm.MAP.addListener('click', () => vm.infoWindow.close())
			vm.google.maps.event.addListener(vm.markerClusterer, 'clusterclick', cluster => vm.zoomAroundCluster(cluster))
			vm.spiderfier.addListener('click', (marker, event) => vm.handleInfoWindow(marker))
			vm.spiderfier.addListener('unspiderfy', (m1, m2) =>	m1.forEach(m => m.stackMe()))
			vm.spiderfier.addListener('spiderfy', (m1, m2) => m1.forEach(m => m.unstackMe()))
			
			vm.zoomAndCenter()
		},
		
		homeClicked() {
			// Map to initial conditions (no filter, default zoom and center
			this.zoomAndCenter()
			this.annee = null
		},
		
		addCustomControl(dom) {
			var borderDiv = document.createElement('div')
			borderDiv.className = "gMapControlBorder"
			borderDiv.appendChild(dom);
			this.MAP.controls[this.google.maps.ControlPosition.TOP_LEFT].push(borderDiv)
		},
		
		zoomAroundCluster(cluster) {
			const currentZoom = this.MAP.getZoom()
			const targetZoom = (currentZoom < 12)? currentZoom + 4 : 14
			this.MAP.setCenter(cluster.getCenter())
			this.MAP.setZoom(targetZoom)
		},
		
		zoomAndCenter(zoom=3, lat=15, long=15) {
			 var center = new this.google.maps.LatLng(lat, long)
			 this.MAP.panTo(center)
			 this.MAP.setZoom(zoom)
		},
		
		handleInfoWindow(marker) {
			const galerie = marker.data
			let dom = document.createElement('div')
			const url = "/galeries/" + galerie.id
			dom.innerHTML = `
				<a title="${galerie.text}" href="${url}">${galerie.theme.text}</a>
				<br>
				${galerie.annee.text}, ${galerie.aerodrome.text}
				<br>
				${galerie.commentaire}
			`.trim()
			this.infoWindow.close()
			this.infoWindow.setContent(dom)
			this.infoWindow.open(null, marker)
		},
		
		updateMarkers(dataArray) {
			// Update all markers using the dataArray provided
			const vm = this
			
			function galleryToMarker(galerie) {
				/** 
				 * translate a JSON object 'galerie' into a google.maps.Marker
				 * note the property 'realLabel' added to the Marker object
				 * it will be used by the spiderfy-unspiderfy function
				 */
				const markerOptions = {
					zIndex: (Math.random() * 1000),// this will avoid overlapping
					position: new vm.google.maps.LatLng(galerie.aerodrome.latitude, galerie.aerodrome.longitude),
					title: galerie.text
				}
												
				let marker = new vm.google.maps.Marker(markerOptions)
				marker.data = galerie
				// define icons and labels for both spiderfied and unspiderfied states
				marker.stackedIcon = {url: `${process.env.ASSETS_URL}icons/geoloc_marker_stacked.png`}
				marker.unstackedIcon = {labelOrigin: new vm.google.maps.Point(19, 15)}
				marker.unstackedLabel = ""
					
				switch(galerie.annee.annee) {
					case "Musées":
						marker.unstackedIcon.url = `${process.env.ASSETS_URL}icons/geoloc_marker_musees.png`
						break;
					case "Collectors":
						marker.unstackedIcon.url = `${process.env.ASSETS_URL}icons/geoloc_marker_collectors.png`
						break;
					case "-NIL":
						marker.unstackedIcon.url = `${process.env.ASSETS_URL}icons/geoloc_marker_empty.png`
						break;
					default:
						marker.unstackedIcon.url = (galerie.isSpotair)?
							`${process.env.ASSETS_URL}icons/geoloc_marker_empty_spotair.png` :
							`${process.env.ASSETS_URL}icons/geoloc_marker_empty.png`
						const labelText = "'" + galerie.annee.annee.substr(2,2)
						marker.unstackedLabel = {text: labelText, fontSize: "10px", fontWeight: "bold"}
				}
					
				marker.stackMe = function() {
					this.setIcon(this.stackedIcon)
					this.setLabel("")
				}
					
				marker.unstackMe = function() {
					this.setIcon(marker.unstackedIcon)
					this.setLabel(this.unstackedLabel)
				}

				// set marker in unstacked state first
				marker.unstackMe()
				return marker
			}
			
			vm.markerClusterer.clearMarkers()
			const markers = dataArray
				.filter(data => (data.aerodrome.latitude !== null) && (data.aerodrome.longitude !== null))
				.map(galleryToMarker)
			// add markers to spiderfier, then to markercluster
			markers.map(m => vm.spiderfier.addMarker(m))
			vm.markerClusterer.addMarkers(markers)
			
			vm.MAP.addListener('idle', () => {
				const spiderable = vm.spiderfier.markersNearAnyOtherMarker()
				spiderable.forEach(m => {if (!m._omsData) m.stackMe()})
				// (m._omsData == false) => marker is NOT spiderfied
				// do not set the overlapped icon if it is spiderfied
			})
		},
    
  }
	
}
</script>

<style lang="scss">

#map {
	margin-top: -2.5rem;
}

.gMapControlBorder {
	background-color: #ffffff;
	border-radius: 3px;
	cursor: pointer;
	margin: 10px;
	text-align: center;
}

#gmapFilter {
	width: 250px;
	background-color: #ffffff;
	padding-top: 7px;
	padding-bottom: 9px;
	padding-left: 10px;
	padding-right: 10px;
	border-bottom-left-radius: 2px;
	border-top-left-radius: 2px;
	box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
}

</style>
