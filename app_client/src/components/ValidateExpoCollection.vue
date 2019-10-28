<template lang="pug">
	extends BaseExpoCollection.pug
	
	block admin
		photo-data-validate(
			:id='currentPhoto.id',
			v-on:photo-rejected="$emit('update', currentPhoto.id)",
			v-on:photo-validated="$emit('update', currentPhoto.id)",
		)
		
</template>

<script>
import BaseExpoCollection from './BaseExpoCollection.vue'
import PhotoDataValidate from './PhotoDataValidate.vue'

export default {
	
	extends: BaseExpoCollection,
	
	components: {
		'photo-data-validate': PhotoDataValidate,
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
