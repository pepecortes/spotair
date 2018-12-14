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
				.then(function(response){console.log(response.data);vm.aerodromes = response.data})
				.catch(function(err) {console.log(err)})
		}
	},
	
})
