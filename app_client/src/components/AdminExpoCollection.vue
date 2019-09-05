<template lang="pug">
	extends BaseExpoCollection.pug
	
	block admin
		h1 THIS IS ADMIN: {{ photoSelected.id }}
		photo-data-edit(v-model='photoSelected')
		
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
