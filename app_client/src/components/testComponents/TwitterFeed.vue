<template lang="pug">

	div(id='test')
		
		b-container(class='text-center')
			h2 TwitterFeed Test
			b-link(href="https://www.npmjs.com/package/vue-tweet-embed") vue-tweet-embed
			b-row
				div Note: Firefox tracking protection prevents feed display (the browser needs to load Twitter JS and cookies)
			b-row
				b-col
				b-col
					timeline(id="jcortesocana", sourceType="profile", :options="{ tweetLimit: '3' }")
				b-col

</template>

<script>
import { Tweet, Moment, Timeline } from 'vue-tweet-embed'

export default {
	
	components: {
		'timeline': Timeline,
	},
	
	data() {
		return {
		}
	},
	
	methods: {
			
	},
	
}

</script>

<style lang="scss">
@import '../../styles/custom_variables.scss';


</style>
