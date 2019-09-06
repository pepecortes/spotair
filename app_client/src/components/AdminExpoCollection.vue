<template lang="pug">
	extends BaseExpoCollection.pug
	
	block admin
		p currentPhoto properties {{ Object.keys(currentPhoto) }}
		photo-data-edit(v-model='currentPhotox')
		
		
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
