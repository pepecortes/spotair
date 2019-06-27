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
		
		div(id="gmapFilter")
			button(@click='centerClicked') Recentrer
			button() Reset
		
		gmap-map(
			style="width: 500px; height: 300px",
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
			this.MAP = map
			this.initializeMap()
			//vm.center = new vm.google.maps.LatLng(45.508, -73.587)
			//const m1 = new vm.google.maps.Marker({position: vm.center})
			//vm.markers.push(m1)
		}
			
		)
	},

	methods: {
		
			
		customControl(controlDiv, text, customFunction) {

			// Set CSS for the control border.
			var controlUI = document.createElement('div');
			controlUI.className = "gMapControlBorder";
			controlUI.title = text;
			controlDiv.appendChild(controlUI);

			// Set CSS for the control interior.
			var controlText = document.createElement('div');
			controlText.className = "gMapControlInterior";
			controlText.innerHTML = text;
			controlUI.appendChild(controlText);

			// Setup the click event listeners
			//controlUI.addEventListener('click', customFunction);
			
			return controlDiv
		},
		
		initializeMap() {
			var testDiv = document.createElement('div')
			var newContent = document.getElementById('gmapFilter');
			
			var searchControlDiv = document.createElement('div')
			var searchControl = this.customControl(searchControlDiv, "Recherche", null)
			newContent = searchControl
			
			
			//this.GMAP.addCustomControl(dom);
			testDiv.appendChild(newContent)
			this.MAP.controls[this.google.maps.ControlPosition.TOP_LEFT].push(testDiv);
			this.zoomAndCenter()			
		},
		
		centerClicked() {
			this.zoomAndCenter()
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
</style>
