<template lang="pug">
	extends BaseExpoCollection.pug
	
	block admin
		photo-data-edit(
			:id='currentPhoto.id',
			v-on:photo-deleted="$emit('update', currentPhoto.id)",
			v-on:photo-updated="$emit('update', currentPhoto.id)",
		)
		
</template>

<script>
import BaseExpoCollection from './BaseExpoCollection.vue'
import PhotoDataEdit from './PhotoDataEdit.vue'

export default {
	
	extends: BaseExpoCollection,
	
	components: {
		'photo-data-edit': PhotoDataEdit,
	},
	
}
</script>

<style lang="scss">

</style>
