<template lang="pug">

	div(id="validatePhotos")
	
		b-alert(
			:variant="alert.type",
			dismissible,
			fade,
			:show="alert.show",
			@dismissed="alert.show=false",
		) {{ alert.text }}
	
		h4.spotair-title.text-center Photos en attente de validation
		
		validate-expo-collection(:collection='photos', v-on:update='refresh')
		
</template>

<script>
import { alertMixin } from '../mixins/Alert'
import ExpoCollectionValidate from './ExpoCollectionValidate.vue'

export default {
	
	beforeMount() {
		this.refresh()
	},
	
	components: {
		'validate-expo-collection': ExpoCollectionValidate,
	},	
	
	data() {
		return {
			photos: [],
		}
	},
	
	methods: {
		
		refresh() {
			const url = `/photouploads/pending`
			this.axios.get(url)
				.then(response => this.photos = response.data)
				.then(() => {if (this.photos.length == 0) this.showAlert("Aucune photo en attente de validation")})
				.catch(err => this.showAxiosAlert(err, "danger"))
		},
		
	},
	
	mixins: [alertMixin],
	
}

</script>

<style lang="scss">

.spotair-title {
    margin-bottom: 2rem;
    margin-top: 2rem;
}

</style>
