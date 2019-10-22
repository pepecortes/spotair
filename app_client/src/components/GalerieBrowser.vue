<template lang="pug">
	div
		h3 galerie browser
		b-form-input(v-model='id', placeholder="Galerie id")
</template>

<script>
export default {
	
	data () {
		return {
			id: '1984',
		}
	},
	
	mounted() {
		//this.getAnneeOptions()
	},
	
	methods: {
		
		//getAnneeOptions() {
			//var vm = this
			//vm.axios.get('annees/')
				//.then(response => vm.anneeOptions = response.data)
				//.catch(err => vm.showAxiosAlert(err))
		//},

	}
	
}
</script>
