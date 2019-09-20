<template lang="pug">
	extends BaseExpoCollection.pug
	
	block admin
		photo-data-validate(:id='currentPhoto.id')
		
</template>

<script>
import BaseExpoCollection from './BaseExpoCollection.vue'
import PhotoDataValidate from './PhotoDataValidate.vue'

export default {
	
	extends: BaseExpoCollection,
	
	components: {
		'photo-data-validate': PhotoDataValidate,
	},
	
}
</script>

<style lang="scss">

</style>
