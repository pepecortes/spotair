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
		resetRequest: {default: false, type: Boolean},
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
	
	watch: {
		resetRequest(request) {
			if (!request) return
			const pos = {latitude: this.value.latitude, longitude: this.value.longitude}
			this.reset(pos)
		},
	},
	
	mounted() {
		this.createMap().then(map => this.reset(this.value))
	},

	methods: {
		
		async createMap() {
			if (this.mapAvailable) return this.MAP
			return this.$refs.mapRef.$mapPromise
				.then(map => {
					this.MAP = map
					this.MARKER = new this.google.maps.Marker({map: map, draggable:true})
					this.addCustomControl(this.$refs.gmapControls)
					this.google.maps.event.addListener(this.MAP, 'click', e => this.markerSync(e.latLng))
					this.google.maps.event.addListener(this.MARKER, 'dragend', e => this.markerSync(e.latLng))
					return map
				})
		},
		
		reset(pos) {
			const mrkPos = this.gMapPosition(pos)
			this.markerSync(mrkPos)
			this.zoomAndCenter(undefined, mrkPos)			
			this.$emit('reset')
		},
		
		gMapPosition(pos) {
			// Return a gMap position or false (if unable to get one)
			if (!pos) return false
			if (!pos.latitude || !pos.longitude) return false
			return {lat: pos.latitude, lng: pos.longitude}
		},
		
		markerSync(pos) {
			// Sync MARKER and this.value
			if (!pos) {this.MARKER.setVisible(false); return}
			this.MARKER.setVisible(true)
			this.MARKER.setPosition(pos)
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
					vm.markerSync(location)
					vm.zoomAndCenter(12, location)
				} else {alert("GOOGLE MAPS dit : " + status)}
			})
		},
		
		centerClicked() {
			const pos = this.gMapPosition(this.value)
			this.zoomAndCenter(undefined, pos)
		},
		
		addCustomControl(dom) {
			var borderDiv = document.createElement('div')
			borderDiv.className = "gMapControlBorder"
			borderDiv.appendChild(dom);
			this.MAP.controls[this.google.maps.ControlPosition.TOP_LEFT].push(borderDiv)
		},
		
		zoomAndCenter(zoom=this.zoom, center=this.center) {
			if (!center) return
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
