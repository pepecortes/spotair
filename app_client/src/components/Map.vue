<template lang="pug">
	div
		b-alert(
			:variant="alert.type",
			dismissible,
			fade,
			:show="alert.show",
			@dismissed="alert.show=false",
		) {{ alert.text }}
		
		h4 Map tests
		
		label
			gmap-autocomplete(@place_changed='setPlace')
			button(@click='addMarker') Add
		
		br
		
		gmap-map(:center='center', :options='options')
			gmap-marker(:key="index", v-for="(m, index) in markers", :position="m.position", @click="center=m.position")
		
</template>

<script>

import { alertMixin } from './AlertMixin'
import {gmapApi} from 'vue2-google-maps'

export default {
	
	components: {
		//'expo-form': ExpoForm,
	},
	
	mixins: [alertMixin],
	
	data() {
		return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null,
      options:  {zoom: 12, style: "width:100%; height: 400px;"},
      //center: new this.google.maps.LatLng(40, 20),
    }
	},
	
	computed: {
		google: gmapApi,
		//showCarousel() {return !this.showGalerie},
		//galerieAvailable() {return !_.isEmpty(this.galerie)},
		//carouselAvailable() {
			//return (this.galerieAvailable && !_.isEmpty(this.selected))
		//},
	},
		
	beforeMount() {
		//this.galerieId = this.$route.params.id
		//this.buildGalerie(this.galerieId)
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
