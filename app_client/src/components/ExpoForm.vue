<template lang="pug">
	div(ref='expoform', class='expobox')
		div(v-for='photo in loadedPhotos', v-on:click='clicked(photo)')
			b-img-lazy(
				blank: true,
				blankColor: '#bbb',
				rounded,
				:src='photo.url',
				:height="imgHeight"
			)
</template>

<script>
	
export default {
	
	props: {
		
		value: {default: null},
		
		photos: {
			type: Array,
			default: () => []
		},
		
		imgHeight: {
			type: String,
			default: `${process.env.THUMBNAIL_HEIGHT_PX}px`
		},
		
	},
	
	data() {
		return {
			mutableValue: null,
			loadedPhotos: [],
			bufferPhotos: [],
		}
	},
	
	watch: {
		photos: function(newValue, oldValue) {
			this.initPhotos()
			document.body.scrollTop = document.documentElement.scrollTop = 0
		},
	},
	beforeMount() {this.initPhotos()},
	
	mounted() {
		// attach the scroll monitoring
		window.addEventListener('scroll', this.scrolling)
	},
	
	beforeDestroy() {
		window.removeEventListener('scroll', this.scrolling)
	},
	
	methods: {
		
		initPhotos() {
			this.loadedPhotos = []
			this.bufferPhotos = this.photos.map(photo => Object.assign({}, photo))
			// clone photos into bufferPhotos
			this.transfer([this.bufferPhotos, this.loadedPhotos, 50])
			document.body.scrollTop = document.documentElement.scrollTop = 0
		},
		
		clicked: function(photo) {
			this.mutableValue = photo
			this.$emit('input', photo)
		},

		transfer: function([input, output, count]) {
			// transfer pictures from the buffer into the visible pictures
			if (count <= 0 || input.length <= 0) return [input, output, count]
			output.push(input.shift())
			this.transfer([input, output, count-1])
		},
		
		scrolling: _.throttle(function() {
			// need to lodash.throttle to avoid firing the event too often
			let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom
			if (windowRelativeBottom > document.documentElement.clientHeight + 800) return
			this.transfer([this.bufferPhotos, this.loadedPhotos, 50])		
			}, 1000, {'trailing': false}),
		
	},
	
}
</script>

<style lang="scss">

	.expobox {
		display: flex;
		flex-flow: row wrap;
		align-items: flex-start;
		justify-content: flex-start;
	}
	
	.expobox img {
		margin-right: 0.4em;
		margin-bottom: 0.4em;
    cursor: pointer;
	}
	
</style>
