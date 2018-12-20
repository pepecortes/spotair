<template>
	<div id="app">
		<h1>My Todo App!</h1>
		<TodoList/>
		<h2>Test Selectizer</h2>
		<vue-single-select
				v-model=aerodrome
		    v-bind:options=aerodromes
		    optionLabel='text'
        :required=true
    ></vue-single-select>
    
    <div id="fields" v-if="aerodromeIsSelected">
			<input v-model="aerodromeX.nom" type="text" placeholder="nom"></input>
			<input v-model="aerodromeX.lieu" type="text" placeholder="lieu"></input>
			<button id='reset' v-on:click='reset'>Reset</button>
			<button>Update</button>
    </div>
	</div>
</template>

<script>
import TodoList from './components/TodoList.vue'
import VueSingleSelect from './components/VueSingleSelect.vue'
import axios from 'axios';

export default {	
	components: {TodoList, VueSingleSelect},
	
	data () {
		return {
				aerodromes: null,
				aerodrome: null,
				aerodromeX: {}
		}
	},
	
	computed: {
		aerodromeIsSelected: function() {return (this.aerodrome != null)}
	}, 

	created: function() {this.getAerodromes()},

	methods: {
		
		getAerodromes: function() {
			var vm = this;
			axios.get(process.env.API_URL + 'aerodromes')
				.then(function(response){vm.aerodromes = response.data})
				.catch(function(err) {console.log(err)})
		},
		
		reset: function() {this.aerodromeX = JSON.parse(JSON.stringify(this.aerodrome))}
	},
	
	watch: {
		//aerodrome: function(aerodrome) {this.aerodromeX = JSON.parse(JSON.stringify(aerodrome))}
		aerodrome: function() {this.reset()}
	}
}

</script>

<style lang="scss">
@import './variables.scss';

*, *::before, *::after {
	box-sizing: border-box;
}

#app {
	max-width: 400px;
	margin: 0 auto;
	line-height: 1.4;
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: $vue-blue;
}

h1 {
	text-align: center;
}
</style>
