<template lang="pug">
	div
		b-button(v-on:click='test') TEST
		b-button(v-on:click='test2') TEST2
		div(class='testelement')
			editor-input(
				ref='photographeInput',
				title="Photographe",
				apiCall="photographes",
				v-model="mutablePhoto.photographe",
				:adminForm='admin.photographe',
				:state='!$v.mutablePhoto.photographe.$invalid',
			)
			editor-input(
				ref='compagnieInput',
				title="Compagnie",
				apiCall="compagnies",
				v-model="mutablePhoto.compagnie",
				:adminForm='admin.compagnie',
				:state='!$v.mutablePhoto.compagnie.$invalid',
			)
			editor-input(
				ref='appareilInput',
				title="Appareil",
				apiCall="appareils",
				v-model='mutablePhoto.appareil',
				:adminForm='admin.appareil',
				:state='!$v.mutablePhoto.appareil.$invalid',
			)
			editor-input(
				ref='galerieInput',
				title="Galerie",
				apiCall="galeries",
				v-model="mutablePhoto.galerie",
				:adminForm='admin.galerie',
				:state='!$v.mutablePhoto.galerie.$invalid',
			)
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

import EditorInput from './components/EditorInput.vue'
import AppareilForm from './components/AppareilForm.vue'
import GalerieForm from './components/GalerieForm.vue'
import CompagnieForm from './components/CompagnieForm.vue'
import PhotographeForm from './components/PhotographeForm.vue'

export default {
	
	components: {
		'editor-input': EditorInput,
	},
		
	beforeMount() {},
	
	mounted () {},
	
	data() {
		return {
			photo: {},
			mutablePhoto: {},
			admin: {appareil: AppareilForm, galerie: GalerieForm, compagnie: CompagnieForm, photographe: PhotographeForm},
		}
	},
	
	watch: {
    photo() {
			this.mutablePhoto = this.photo
			this.$refs.photographeInput.setInitialValue(this.photo.photographe, true)
			this.$refs.compagnieInput.setInitialValue(this.photo.compagnie, true)
			this.$refs.appareilInput.setInitialValue(this.photo.appareil, true)
			this.$refs.galerieInput.setInitialValue(this.photo.galerie, true)
			},
	},
	
	computed: {
	},
	
	mixins: [validationMixin],
	
	methods: {
		
		test() {
			this.axios.get("/photos/12")
				.then(response => this.photo = response.data)
				.catch(err => console.error(err))
		},
		
		test2() {
			console.log("NEW CONTENT: " + JSON.stringify(this.mutablePhoto.photographe))
		},
		
	}, 
	
	validations() {
		return {mutablePhoto: 
			{
				photographe: {required},
				compagnie: {required},
				appareil: {required},
				galerie: {required},
			}
		}
	},
	
}

</script>

<style lang="scss">

.testelement {
	width: 500px;
	background-color: blanchedalmond;
}

</style>
