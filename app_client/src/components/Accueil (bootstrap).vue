<template lang="pug">
	div(id='cover')
		b-alert(
			:variant="alert.type",
			v-model='slide',
			dismissible,
			fade,
			:show="alert.show",
			@dismissed="alert.show=false"
			) {{ alert.text }}
		h1 This is the cover page
		div(id='carousel')
			b-carousel(
				v-if='activeCarousel',
				id="carousel-1",
				:interval="400000",
				controls,
				indicators,
				background='white',
				style="text-shadow: 1px 1px 2px #333;",
				img-width='16px',
				img-height='9px'
			)
				b-carousel-slide(
					img-src="https://picsum.photos/1200/675/?image=47",
					caption="CAPTION",
					text="TEXT"
				)
				b-carousel-slide(
					img-src="https://picsum.photos/1000/675/?image=2",
					caption="CAPTION",
					text="TEXT"
				)
			
		h1 This is the end




</template>

<script>

import { photoToImgData } from '../lib/common'
import { alertMixin } from './AlertMixin'

// TEST
const chance = require('chance').Chance()
const _ = require('lodash')

		
//function getImgSource(w,h,text) {
	////console.log("adding item " + k)	
	////const w = chance.integer({ min: 200, max: 800 })
	////const h = chance.integer({ min: 200, max: 800 })
	//return `http://via.placeholder.com/${w}x${h}?text=${text}`
//}

export default {
	
	components: {
	},
	
	mixins: [alertMixin],

	//mounted () {this.getLatestPhotos()},
	
	data() {
		return {
			items: [
				{id:0, caption:'caption0', text:'text0', src:`http://via.placeholder.com/100x100?text=start`},
				{id:1, caption:'caption1', text:'text1', src:`http://via.placeholder.com/100x100?text=1`},
			],
			activeCarousel: true,
			slide: 1,
		}
	},
	
	methods: {
		
		check(payload) {
			console.log(JSON.stringify(payload) + "  " + this.items.length)
			if (payload.currentSlide >= (this.items.length - 2)) {
				this.items.push(this.counter)
				this.counter + this.counter + 1
				console.log("new lenght " + this.items.length)
			}
		},
		
		getLatestPhotos() {
			var vm = this
			vm.items = [
				{id:0, caption:'caption0', text:'text0', src:`http://via.placeholder.com/400x400?text=start`},
				{id:1, caption:'caption1', text:'text1', src:`http://via.placeholder.com/400x400?text=1`},
			]
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
	padding-left: 8%;
	padding-right: 8%;
}

</style>
