<template lang="pug">
	extends ExpoCollectionBase.pug
	
	block admin
		photo-data-validate(
			:id='currentPhoto.id',
			v-on:photo-rejected="$emit('update', currentPhoto.id)",
			v-on:photo-validated="$emit('update', currentPhoto.id)",
		)
		
</template>

<script>
import ExpoCollectionBase from './ExpoCollectionBase.vue'
import PhotoDataValidate from './PhotoDataValidate.vue'

export default {
	
	extends: ExpoCollectionBase,
	
	components: {
		'photo-data-validate': PhotoDataValidate,
	},
	
	data() {
		return {
			blockAdmin: true,
		}
	},
	
	props: {
		
		thumbnailLocation: {
			type: String,
			default: process.env.STORAGE_URL + process.env.UPLOAD_LOCATION,
		},
		
		photoLocation: {
			type: String,
			default: process.env.STORAGE_URL + process.env.UPLOAD_LOCATION,
		},
		
	},
	
}
</script>

<style lang="scss">

</style>
