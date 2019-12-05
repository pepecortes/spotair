<template lang="pug">
	div
		div(v-show='mapAvailable', ref='gmapControls', id='gmapControls')
			b-button(class='btn btn-primary', @click='searchClicked') Rechercher
			b-button(class='btn btn-primary', @click='centerClicked') Recentrer
	
		gmap-map(
			style="width: 60%; height: 450px",
			ref='mapRef',
			:center='center',
			:zoom='zoom',
			:options='options',
		)
</template>

<script>
import { gmapApi } from 'vue2-google-maps'

export default {
	
	props: {
		value: Object,
		text: {default: "", type: String},
	},
	
	data() {
		return {
      center: {lat:15, lng:15},
      zoom: 3,
      MAP: null,
      MARKER: null,
      mapAvailable: false,
    }
	},
	
	computed: {
		google: gmapApi,
		
		options() {
			if (!this.google) return {}
			return {mapTypeControlOptions: {position: this.google.maps.ControlPosition.TOP_RIGHT}}
		},
		
	},
	
	watch: {
		// TEST NOT YET COMPLETED. DEBOUNCE? MODIFY MARKERSYNC?
		value: {
			handler(v) {
				console.log("....")
				const x = new this.google.maps.LatLng(v.latitude, v.longitude)
				this.MARKER.setPosition(x)
			},
			deep: true,
		}
		
	},
	
	mounted() {
		this.$refs.mapRef.$mapPromise.then(map => {
			this.MAP = map
			this.initializeMap()
			this.mapAvailable = true
		})
	},

	methods: {
		
		initializeMap() {
			var vm = this
			vm.MARKER = new this.google.maps.Marker({map: vm.MAP, draggable:true})

			const x = new vm.google.maps.LatLng(vm.value.latitude, vm.value.longitude)
			vm.markerSync(x)
			
			vm.google.maps.event.addListener(vm.MAP, 'click', e => this.markerSync(e.latLng))
			vm.google.maps.event.addListener(vm.MARKER, 'dragend', e => this.markerSync(e.latLng))
			vm.google.maps.event.addListener(vm.MARKER, 'position_changed', vm.markerSync)
			vm.addCustomControl(vm.$refs.gmapControls)
			vm.zoomAndCenter(3, vm.value.latitude, vm.value.longitude)
		},
		
		markerSync(markerLatLng) {
			// Sync MARKER and this.value
			if (!this.MARKER) this.MARKER.setMap(this.MAP)
			if (markerLatLng) this.MARKER.setPosition(markerLatLng)
			const markerPos = this.MARKER.getPosition()		
			const gps = {'latitude': markerPos.lat(), 'longitude': markerPos.lng()}
			this.$emit('input', gps)
		},
		
		searchClicked() {
			var vm = this
			const geocoder = new vm.google.maps.Geocoder()
			geocoder.geocode({'address': vm.text}, function(results, status) {
				if (status === 'OK') {
					const location = results[0].geometry.location
					vm.MAP.setCenter(location)
					vm.MAP.setZoom(12)
					vm.MARKER.setMap(vm.MAP);
					vm.MARKER.setPosition(location);
				} else {alert("GOOGLE MAPS dit : " + status)}
			})
		},
		
		centerClicked() {
			if (!this.value) this.zoomAndCenter()
			else this.zoomAndCenter(3, this.value.latitude, this.value.longitude)
		},
		
		addCustomControl(dom) {
			var borderDiv = document.createElement('div')
			borderDiv.className = "gMapControlBorder"
			borderDiv.appendChild(dom);
			this.MAP.controls[this.google.maps.ControlPosition.TOP_LEFT].push(borderDiv)
		},
		
		zoomAndCenter(zoom=3, lat=15, long=15) {
			 var center = new this.google.maps.LatLng(lat, long)
			 this.MAP.panTo(center)
			 this.MAP.setZoom(zoom)
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

</style>
