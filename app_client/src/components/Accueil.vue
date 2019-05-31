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
		carousel(v-if='activeCarousel', v-on:slide='check')
			slide(v-for="(item, indx) in items", :key="indx", :index="indx")
				img(:draggable="false", :src='getImgSource(item)')
</template>

<script>

import { Hooper, Slide } from 'hooper'
import 'hooper/dist/hooper.css'

import { photoToImgData } from '../lib/common'
import { alertMixin } from './AlertMixin'

// TEST
const chance = require('chance').Chance()
const _ = require('lodash')

export default {
	
	components: {
		'carousel': Hooper,
		'slide': Slide
	},
	
	mixins: [alertMixin],

	mounted () {this.getLatestPhotos()},
	
	data() {
		return {
			items: [],
			activeCarousel: false,
		}
	},
	
	methods: {
		
		check(payload) {
			console.log(JSON.stringify(payload) + "  " + this.items.length)
			if (payload.currentSlide >= (this.items.length - 2)) {
				this.items.push(2)
				console.log("new lenght " + this.items.length)
			}
		},
		
		getImgSource(k) {			
			const w = chance.integer({ min: 200, max: 800 })
			const h = chance.integer({ min: 200, max: 800 })
			return `http://via.placeholder.com/${w}x${h}`
		},
		
		getLatestPhotos() {
			var vm = this
			vm.items = [0,8,5,15]
			vm.activeCarousel = true
			//this.axios.get('/photos/recent')
				//.then(response =>  vm.items = response.data.map(photoToImgData))
				//.catch(err => vm.showAxiosAlert(err))
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
