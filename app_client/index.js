

//import dotenv from '../dotenv'
//console.log("env check: " + process.env.DB_DATABASE)
console.log(process.env.VUE_APP_SOMEKEY)

var welcome = new Vue({ 
    el: '#welcome',
    data: {
        message: 'Tests API aerodromes'
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
			axios.get('http://localhost:3000/api/aerodromes')
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
			axios.get('http://localhost:3000/api/aerodromes/' + id)
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
			axios.put('http://localhost:3000/api/aerodromes/' + vm.aerodrome.id, record)
				.then(function(response){vm.aerodrome = response.data})
				.catch(function(err) {console.log(err)})						
		},
		
	},
	
})
