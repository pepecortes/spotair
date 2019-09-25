<template lang="pug">
	extends BaseExpoCollection.pug
	
	block admin
		photo-data-validate(
			:id='currentPhoto.id',
			v-on:photo-rejected="$emit('update', currentPhoto.id)",
			v-on:photo-validated='raiseHand',
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
	
	data() {
		return {
			thumbnailLocation: process.env.STORAGE_URL + process.env.UPLOAD_LOCATION,
			photoLocation: process.env.STORAGE_URL + process.env.UPLOAD_LOCATION,
		}
	},
	
	methods: {
		raiseHand() {
			console.log("RAISE HAND")
			this.$emit('update', this.id)
		}
	},
	
}
</script>

<style lang="scss">

</style>
