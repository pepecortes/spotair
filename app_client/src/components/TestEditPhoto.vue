<template lang="pug">

	div(id="TestEditPhoto")
	
		b-alert(
			:variant="alert.type",
			dismissible,
			fade,
			:show="alert.show",
			@dismissed="alert.show=false",
		) {{ alert.text }}
		
		single-photo-edit(id='id')
		
</template>

<script>
import { alertMixin } from './AlertMixin'
import SinglePhotoEdit from './SinglePhotoEdit.vue'


export default {
	
	beforeMount() {
		this.id = this.$route.params.id
	},
	
	components: {
		'single-photo-edit': SinglePhotoEdit,
	},	
	
	data() {
		return {
			id: null,
		}
	},
	
	mixins: [alertMixin],
	
	methods: {},
	
}

</script>

<style lang="scss">

.formButtons {
	display: inline-flex;
}
</style>
