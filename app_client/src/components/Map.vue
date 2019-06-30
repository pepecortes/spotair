<template lang="pug">
	div
		b-alert(
			:variant="alert.type",
			dismissible,
			fade,
			:show="alert.show",
			@dismissed="alert.show=false",
		) {{ alert.text }}
		
		br
		
		div(v-show='mapAvailable', ref='gmapFilter', id='gmapFilter')
			button(class='btn btn-primary', @click='centerClicked') Recentrer
			button(class='btn btn-link', @click='resetClicked') Reset
		
		gmap-map(
			style="width: 100%; height: 300px",
			ref='mapRef',
			:center='center',
			:zoom='zoom',
			:options='options',
		)
			gmap-marker(:key="index", v-for="(m, index) in markers", :position="m.position", @click="center=m.position")
		
</template>

<script>

import { alertMixin } from './AlertMixin'
import { gmapApi } from 'vue2-google-maps'

export default {
	
	components: {
	},
	
	mixins: [alertMixin],
	
	data() {
		return {
      center: {lat:15, lng:15},
      zoom: 3,
      markers: [],
      places: [],
      MAP: null,
      mapAvailable: false,
      markerClusterer: null,
      spiderfier: null,
      infoWindow: null,
      currentPlace: null,
    }
	},
	
	computed: {
		google: gmapApi,
		
		options() {
			if (!this.google) return {}
			return {mapTypeControlOptions: {position: this.google.maps.ControlPosition.TOP_RIGHT}}
		},
		
	},
		
	beforeMount() {
		
		//console.log("beforemount " + process.env.ASSETS_URL)
	},
	
	mounted() {
		var vm = this
		this.$refs.mapRef.$mapPromise.then(map => {
			this.MAP = map
			this.initializeMap()
			this.mapAvailable = true
		})
	},

	methods: {
		
		initializeMap() {
			const vm = this
			vm.addCustomControl(vm.$refs.gmapFilter)
			const clusterOptions = {
				gridSize: 40,
				maxZoom: 12,
				imagePath: `${process.env.ASSETS_URL}icons/markercluster`
			}
			const spiderfierOptions = {
				markersWontMove: true,
				markersWontHide: true,
				keepSpiderfied: true,
				basicFormatEvents: true,
				spiralFootSeparation: 30,
				spiralLengthFactor: 4,
				spiralLengthStart: 20,
				legWeight: 0.2
			}
			const MarkerClusterer = require('node-js-marker-clusterer')
			const OverlappingMarkerSpiderfier = require('overlapping-marker-spiderfier')
			vm.markerClusterer = new MarkerClusterer(vm.MAP, [], clusterOptions)
			vm.infoWindow = new vm.google.maps.InfoWindow()
			vm.spiderfier = new OverlappingMarkerSpiderfier(vm.MAP, spiderfierOptions)
			
			// set events on each marker, so as to change between
			// overlapped and isolated marker labels
			this.MAP.addListener('idle', function() {
				const spiderable = vm.spiderfier.markersNearAnyOtherMarker()
				spiderable.forEach(m => {if (!m._omsData) m.stackMe()})
				// 'm._omsData' says whether or not the marker is spiderfied
				// do not set the overlapped icon if it is spiderfied
			})
			vm.spiderfier.addListener('unspiderfy', markers =>	markers.forEach(m => m.stackMe()))
			vm.spiderfier.addListener('spiderfy', markers => markers.forEach(m => m.unstackMe()))
			vm.zoomAndCenter()
		},
		
		centerClicked() {
			this.zoomAndCenter()
		},
		
		resetClicked() {
			const vm = this
			console.log("TEST: RESET CLICKED")
			vm.axios.get(`galeries`)
				.then(response => {
					vm.updateMarkers(response.data)
				})
		},
		
		addCustomControl(dom) {
			var borderDiv = document.createElement('div')
			borderDiv.className = "gMapControlBorder"
			borderDiv.appendChild(dom);
			this.MAP.controls[this.google.maps.ControlPosition.TOP_LEFT].push(borderDiv)
		},
		
		zoomAndCenter(zoom=3, lat=15, long=15) {
			/**
			 * Zoom and Center a given Google Map object
			 * inputs are self explanatory and get defaults
			 */
			 var center = new this.google.maps.LatLng(lat, long)
			 this.MAP.panTo(center)
			 this.MAP.setZoom(zoom)
		},
		
		updateMarkers(dataArray) {
			// Update all markers using the dataArray provided
			const vm = this
			
			function handleInfoWindow(marker) {
				console.log("handling infoWindow")
				var gallery = marker.data
				//const url = "/index.php?call=gallery&id=" + gallery.id;
				//const str = `
					//<div class="infoWindow galleryGMarker">
					//<a title="${gallery.text}" href="${url}">${gallery.sujet}</a>
					//<br>
					//${gallery.annee}, ${gallery.aerodrome}
					//<br>
					//${gallery.commentaire}
					//</div>
				//`.trim();
				// ATTENTION THIS IS JQUERY
				//const dom = $.parseHTML(str)[0];
				vm.infoWindow.close()
				//vm.infoWindow.setContent(dom)
				vm.infoWindow.setContent("INFOWINDOW TEXT")
				vm.infoWindow.open(null, marker)
			}
			
			function galleryToMarker(galerie) {
					/** 
					 * translate a JSON object 'galerie' into a google.maps.Marker
					 * note the property 'realLabel' added to the Marker object
					 * it will be used by the spiderfy-unspiderfy function
					 */

				
				var markerOptions = {
					zIndex: (Math.random() * 1000),// this will avoid overlapping
					position: new vm.google.maps.LatLng(galerie.aerodrome.latitude, galerie.aerodrome.longitude),
					title: galerie.text
				}
												
				var marker = new vm.google.maps.Marker(markerOptions)
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
			// set global event listener on spiderfier
			vm.spiderfier.addListener('click', (marker, event) => handleInfoWindow(marker))
		},
    
  }
	
}
</script>

<style lang="scss">

.gMapControlBorder {
    background-color: #ffffff;
    border-radius: 3px;
    cursor: pointer;
    margin: 10px;
    text-align: center;
}

#gmapFilter {
    background-color: #ffffff;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    padding-right: 10px;
    border-bottom-left-radius: 2px;
    border-top-left-radius: 2px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
}

</style>
