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
		hooper()
			slide
				img(draggable="false", src='http://via.placeholder.com/500x500')
			slide
				img(draggable="false", src='http://via.placeholder.com/1000x500')
			slide
				img(draggable="false", src='http://via.placeholder.com/500x1000')
</template>

<script>

import { Hooper, Slide } from 'hooper'
import 'hooper/dist/hooper.css'

import { photoToImgData } from '../lib/common'
import { alertMixin } from './AlertMixin'

export default {
	
	components: {
		'hooper': Hooper,
		'slide': Slide
	},
	
	mixins: [alertMixin],

	//mounted () {this.getLatestPhotos()},
	
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
	img {
		height: 300px;
	}
	.hooper {
			height: 300px;
	}
  .hooper-slide {
    height: 300px;
    background-color: #62CAAA;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    border: 2px solid #fff;
    font-size: 30px;
    border-radius: 10px;
  }
  .is-clone,
  .hooper-clone { 
    background-color: rgb(71, 218, 127);
  }
</style>
