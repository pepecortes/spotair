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
    }
	},
	
	computed: {
		google: gmapApi,
		
		options() {
			if (!this.google) return {}
			return {mapTypeControlOptions: {position: this.google.maps.ControlPosition.TOP_RIGHT}}
		},
		
		mapAvailable() {return (this.MAP != null)},
	},
	
	mounted() {
		console.log("value " + JSON.stringify(this.value) + " mapavail " + this.mapAvailable)
		this.initMap(this.value)
	},

	methods: {
		
		async initMap(pos) {
			if (this.mapAvailable) return this.MAP
			return this.$refs.mapRef.$mapPromise
				.then(map => {
					this.MAP = map
					this.MARKER = new this.google.maps.Marker({draggable:true})
					const mrkPos = (pos)?	{lat: pos.latitude, lng: pos.longitude} :	null
					this.addCustomControl(this.$refs.gmapControls)
					this.google.maps.event.addListener(this.MAP, 'click', e => this.markerSync(e.latLng))
					this.google.maps.event.addListener(this.MARKER, 'dragend', e => this.markerSync(e.latLng))
					this.markerSync(mrkPos)
					this.zoomAndCenter(3, this.value.latitude, this.value.longitude)
					return map
				})
		},
		
		resetMarker(pos) {
			console.log("RESET MARKER: " + JSON.stringify(pos))
			return
			//this.initMap()
				//.then(map => {
					
					//if (this.value.latitude && this.value.longitude) {
						//const x = new this.google.maps.LatLng(this.value.latitude, this.value.longitude)
						//console.log("SETTING MARxER " + x)
						//this.MARKER.setMap(this.MAP)
						//this.MARKER.setPosition(x)
						//const markerPos = this.MARKER.getPosition()
						//console.log(JSON.stringify(markerPos))
					//} else {
						////this.MARKER.setMap(null)
					//}
				//})
		},
		
		markerSync(markerLatLng) {
			// Sync MARKER and this.value
			
			if (!markerLatLng) {this.MARKER.setMap(null); return}
			else this.MARKER.setMap(this.MAP)
			
			this.MARKER.setPosition(markerLatLng)
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
					vm.MARKER.setMap(vm.MAP)
					vm.MARKER.setPosition(location)
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
