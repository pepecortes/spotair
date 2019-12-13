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
		id: {default: null, type: Number},
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
		id(newId, oldId) {
			if (!this.mapAvailable || (newId == oldId)) return
			const pos = {latitude: this.value.latitude, longitude: this.value.longitude}
			const mrkPos = this.gMapPosition(pos)
			this.markerSync(mrkPos)
			this.zoomAndCenter(undefined, pos)
		}
	},
	
	mounted() {
		this.initMap(this.value)
	},

	methods: {
		
		async initMap(pos) {
			if (this.mapAvailable) return this.MAP
			return this.$refs.mapRef.$mapPromise
				.then(map => {
					this.MAP = map
					this.MARKER = new this.google.maps.Marker({map: map, draggable:true})
					const mrkPos = this.gMapPosition(pos)
					this.addCustomControl(this.$refs.gmapControls)
					this.google.maps.event.addListener(this.MAP, 'click', e => this.markerSync(e.latLng))
					this.google.maps.event.addListener(this.MARKER, 'dragend', e => this.markerSync(e.latLng))
					this.markerSync(mrkPos)
					this.zoomAndCenter(undefined, pos)
					return map
				})
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
					vm.MAP.setCenter(location)
					vm.MAP.setZoom(12)
					vm.MARKER.setMap(vm.MAP)
					vm.MARKER.setPosition(location)
				} else {alert("GOOGLE MAPS dit : " + status)}
			})
		},
		
		centerClicked() {
			if (!this.value) this.zoomAndCenter()
			else {
				const pos = {latitude: this.value.latitude, longitude: this.value.longitude}
				this.zoomAndCenter(undefined, pos)
			}
		},
		
		addCustomControl(dom) {
			var borderDiv = document.createElement('div')
			borderDiv.className = "gMapControlBorder"
			borderDiv.appendChild(dom);
			this.MAP.controls[this.google.maps.ControlPosition.TOP_LEFT].push(borderDiv)
		},
		
		zoomAndCenter(zoom=this.zoom, center=this.center) {
			this.MAP.panTo(this.gMapPosition(center))
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
