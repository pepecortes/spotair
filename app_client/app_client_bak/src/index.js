import Vue from 'vue'; 
// actually Vue is loaded in the browser and it looks a good idea (is quick and is loaded before displaying the html. perhaps you do not need import here?

import _ from 'lodash';
import axios from 'axios';

// FOR TESTING
//import VueSingleSelect from "vue-single-select";
//Vue.component('vue-single-select', VueSingleSelect);

var welcome = new Vue({ 
    el: '#welcome',
    data: {
        message: _.join(['Tests API', 'aerodromes'], ': ')
    }
})

var aerodromes = new Vue({
  el: '#aerodromes',
  
  data: {
		aerodromes: []
	},
	
	created: function() {this.getAerodromes()},
  
  methods: {
		getAerodromes: function() {
			var vm = this;
			axios.get(process.env.API_URL + 'aerodromes')
				.then(function(response){vm.aerodromes = response.data})
				.catch(function(err) {console.log(err)})
		},
		
		selectId: function(id) {
			updateAerodrome.loadMe(id)
		}
		

	},
	
})


var updateAerodrome = new Vue({
  el: '#update_aerodrome',
  
  data: {
		aerodrome: {}
	},
	
	created: function() {this.getAerodrome()},
  
  methods: {
		getAerodrome: function(id) {
			if (!id) return;
			var vm = this;
			axios.get(process.env.API_URL + 'aerodromes/' + id)
				.then(function(response){vm.aerodrome = response.data})
				.catch(function(err) {console.log(err)})
		},
		
		loadMe: function(id) {
			this.getAerodrome(id)
		},
		
		updateMe: function() {
			var vm = this;
			if (!vm.aerodrome.id) return
			const record = {nom: vm.aerodrome.nom, lieu: vm.aerodrome.lieu}
			axios.put(process.env.API_URL + 'aerodromes/' + vm.aerodrome.id, record)
				.then(function(response){vm.aerodrome = response.data})
				.catch(function(err) {console.log(err)})						
		},
		
	},
	
})


