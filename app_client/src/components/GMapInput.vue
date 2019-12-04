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
		text: {default: "", type: String},
		latitude: {default: 0},
		longitude: {default: 0},
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
	
	mounted() {
		this.$refs.mapRef.$mapPromise.then(map => {
			this.MAP = map
			this.initializeMap()
			this.mapAvailable = true
			console.log(`text: ${this.text} / latitude: ${this.latitude}, longitude: ${this.longitude}`)
		})
	},

	methods: {
		
		initializeMap() {
			var vm = this
			vm.MARKER = new this.google.maps.Marker({map: vm.MAP, draggable:true})
			vm.google.maps.event.addListener(vm.MAP, 'click', 
				function(event) {
					vm.MARKER.setMap(vm.MAP)
					vm.MARKER.setPosition(event.latLng)
					const position = {'latitude': event.latLng.lat(), 'longitude': event.latLng.lng()}
					vm.$emit('input', position)
				})
			vm.addCustomControl(vm.$refs.gmapControls)
			vm.zoomAndCenter()
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
			alert("NOT COMPLETED")
			this.zoomAndCenter()
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
