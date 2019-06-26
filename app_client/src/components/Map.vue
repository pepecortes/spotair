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
		
		gmap-map(
			ref='mapRef',
			:center="center",
			:zoom="7",
			map-type-id="terrain",
			style="width: 500px; height: 300px"
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
      center: {lat:0, lng:0},
      markers: [],
      places: [],
      currentPlace: null,
      options:  {zoom: 12, style: "width:100%; height: 400px;"},
    }
	},
	
	computed: {
		google: gmapApi,
    //center() {return (this.google)? (new this.google.maps.LatLng(45.508, -73.587)) : {lat:0, lng:0}},
	},
		
	beforeMount() {
	},
	
	mounted() {
		this.mapAvailable = true
		var vm = this
		this.$refs.mapRef.$mapPromise.then(map => {
			vm.center = new vm.google.maps.LatLng(45.508, -73.587)
			const m1 = new vm.google.maps.Marker({position: vm.center})
			vm.markers.push(m1)
		}
			
		)
	},

	methods: {
		
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
