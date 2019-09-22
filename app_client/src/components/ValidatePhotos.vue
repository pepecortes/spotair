<template lang="pug">

	div(id="validatePhotos")
	
		b-alert(
			:variant="alert.type",
			dismissible,
			fade,
			:show="alert.show",
			@dismissed="alert.show=false",
		) {{ alert.text }}
		
		validate-expo-collection(:collection='photos')
		
</template>

<script>
import { alertMixin } from './AlertMixin'
import ValidateExpoCollection from './ValidateExpoCollection.vue'

export default {
	
	beforeMount() {
		const url = `/photouploads/pending`
		this.axios.get(url)
			.then(response => this.photos = response.data)
			.then(() => {if (this.photos.length == 0) this.showAlert("Aucune photo en attente de validation")})
			.catch(err => this.showAxiosAlert(err, "danger"))
	},
	
	components: {
		'validate-expo-collection': ValidateExpoCollection,
	},	
	
	data() {
		return {
			photos: [],
		}
	},
	
	mixins: [alertMixin],
	
}

</script>

<style lang="scss">

.formButtons {
	display: inline-flex;
}
</style>
