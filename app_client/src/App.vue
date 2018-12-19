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
	</div>
</template>

<script>
import TodoList from './components/TodoList.vue'
import VueSingleSelect from './components/VueSingleSelect.vue'
import axios from 'axios';

export default {	
	components: { TodoList, VueSingleSelect},
	
	data () {
		return {
				aerodromes: [],
				aerodrome: null
		}
	},

	created: function() {this.getAerodromes()},

	methods: {
		getAerodromes: function() {
			var vm = this;
			axios.get(process.env.API_URL + 'aerodromes')
				.then(function(response){vm.aerodromes = response.data})
				.catch(function(err) {console.log(err)})
		}
	},
	
	watch: {
		aerodrome: function(aerodrome) {console.log(JSON.stringify(aerodrome))}
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
