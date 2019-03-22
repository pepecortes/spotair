<template lang="pug">
	div(id='cover')
		b-alert(
			:variant="alert.type",
			dismissible,
			fade,
			:show="alert.show",
			@dismissed="alert.show=false"
			) {{ alert.text }}
		h1 This is the cover page
		vue-picture-swipe(:items="items")
</template>

<script>

import VuePictureSwipe from 'vue-picture-swipe'
import { photoToImgData } from '../lib/common'
import { alertMixin } from './AlertMixin'

export default {
	
	components: {
		'vue-picture-swipe': VuePictureSwipe
	},
	
	mixins: [alertMixin],

	mounted () {this.getLatestPhotos()},
	
	data() {
		return {
			items: [],
		}
	},
	
	methods: {
		
		getLatestPhotos() {
			var vm = this
			this.axios.get('/photos/recent')
				.then(response =>  vm.items = response.data.map(photoToImgData))
				.catch(err => vm.showAxiosAlert(err))
		},
		
	},
	
}

</script>

<style lang="scss">

</style>
