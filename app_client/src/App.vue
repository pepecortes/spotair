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
        @model-updated="onValidated"
				@validated="onValidated"
    ></vue-single-select>
    
    <!--
    <div id="fields" v-if="aerodromeIsSelected">
			<input v-model="aerodromeX.nom" type="text" placeholder="nom"></input>
			<input v-model="aerodromeX.lieu" type="text" placeholder="lieu"></input>
			<button id='reset' v-on:click='reset'>Reset</button>
			<button>Update</button>
    </div>
    -->

		<h1>Form</h1>
		<vue-form-generator
			tag="div"
      :schema="schema"
      :model="aerodromeX"
      :options="formOptions"
    />
    <h1>Result</h1>
    {{aerodromeX}}
    
	</div>
	
</template>

<script>
import axios from 'axios'
import TodoList from './components/TodoList.vue'
import VueSingleSelect from './components/VueSingleSelect.vue'
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg.css'

const validators = VueFormGenerator.validators

const myformOptions = {
	validateAfterLoad: false,
	validateAsync: false,
	validateAfterChanged: true,
	validationErrorClass: "error",
	validationSuccessClass: ""
}

const myformSchema = {
  fields: [{
    type: "input",
    inputType: "text",
    label: "Nom",
    model: "nom",
    placeholder: "Nom",
    featured: true,
    required: true,
    
  }, {
    type: "input",
    inputType: "text",
    label: "Lieu",
    model: "lieu",
    placeholder: "Lieu",
    required: true,
    hint: "At least 3 characters.",
    min: 3,
    validator: ["string"]
  }, {
		type: "input",
		inputType: "text",
		label: "Location",
		model: "address.geo",
		buttons: [
				{
						classes: "btn-location",
						label: "Current location",
						onclick: function(model) {
							//return this.$parent.sayHello(model)
								//if (navigator.geolocation) {
										//navigator.geolocation.getCurrentPosition(function(pos) {
											//model.address.geo = {
												//lat: pos.coords.latitude.toFixed(5),
												//lng: pos.coords.longitude.toFixed(5)
											//};
										//});
								//} else {
										//alert("Geolocation is not supported by this browser.");
								//}
						}
				},
				{
						classes: "btn-clear",
						label: "Clear",
						type: "reset",
						onclick: function(model, field) {console.log("CLICK")}
				}
		]
	}],
  
  groups: [{
		styleClasses: "formButtons",
		fields: [{
			type: "submit",
			label: "reset",
			styleClasses: "reset",
			buttonText: "Reset",
			onSubmit: function(model, e) {
				console.log('check' + JSON.stringify(model));
				console.log('check' + JSON.stringify(e));
			},
		}, {
			type: "submit",
			label: "update",
			styleClasses: "submit",
			buttonText: "Update",
		}]
	}]
}

export default {	
	components: {
		TodoList,
		VueSingleSelect,
		"vue-form-generator": VueFormGenerator.component
	},
	
	data () {
		return {
				aerodromes: null,
				aerodrome: null,
				aerodromeX: {},
				schema: myformSchema,
				formOptions: {
					validateAfterLoad: false,
					validateAsync: false,
					validateAfterChanged: true,
					validationErrorClass: "error",
					validationSuccessClass: ""
				}
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
		
		reset: function() {this.aerodromeX = JSON.parse(JSON.stringify(this.aerodrome))},
		
		sayHello: function(model) {
			console.log("SAY HELLO");
		},
		
		onValidated: function(res, errors) {
			console.log("onValidated VFG validated:", arguments, res, errors);
		},
		
	},
	
	watch: {
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

.formButtons {
	display: inline-flex;
}
</style>
