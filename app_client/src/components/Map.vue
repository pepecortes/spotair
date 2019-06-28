<template lang="pug">
	div
		b-alert(
			:variant="alert.type",
			dismissible,
			fade,
			:show="alert.show",
			@dismissed="alert.show=false",
		) {{ alert.text }}
		
		label
			gmap-autocomplete(@place_changed='setPlace')
			button(@click='addMarker') Add
		
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
	},
	
	mounted() {
		this.mapAvailable = true
		var vm = this
		this.$refs.mapRef.$mapPromise.then(map => {
			this.mapAvailable = true
			this.MAP = map
			this.initializeMap()
			//vm.center = new vm.google.maps.LatLng(45.508, -73.587)
			//const m1 = new vm.google.maps.Marker({position: vm.center})
			//vm.markers.push(m1)
		}
			
		)
	},

	methods: {
		
		initializeMap() {
			this.addCustomControl(this.$refs.gmapFilter)
			this.zoomAndCenter()
			const clusterOptions = {gridSize: 40, maxZoom: 12}
			
			const MarkerClusterer = require('node-js-marker-clusterer')
			const OverlappingMarkerSpiderfier = require('overlapping-marker-spiderfier')
			this.markerClusterer = new MarkerClusterer(this.MAP, [], clusterOptions)
			this.spiderfier = new OverlappingMarkerSpiderfier(this.MAP, {
				markersWontMove: true,
				markersWontHide: true,
				keepSpiderfied: true,
				basicFormatEvents: true,
				spiralFootSeparation: 30,
				spiralLengthFactor: 4,
				spiralLengthStart: 20,
				legWeight: 0.2
			})
			
			
		},
		
		centerClicked() {
			this.zoomAndCenter()
		},
		
		resetClicked() {
			console.log("RESET CLICKED")
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
		
		// receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
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
