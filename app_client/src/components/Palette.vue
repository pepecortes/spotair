<template lang="pug">
	div(id='palette')
		
		h2 Color palette
		
		hr
		
		b-button-group
			b-button(variant="color-primary-1") color-primary-1
			b-button(variant="color-primary-2") color-primary-2
			b-button(variant="color-primary-0") color-primary-0
			b-button(variant="color-primary-3") color-primary-3
			b-button(variant="color-primary-4") color-primary-4
		br
		b-button-group
			b-button(variant="color-secondary-1-1") color-secondary-1-1
			b-button(variant="color-secondary-1-2") color-secondary-1-2
			b-button(variant="color-secondary-1-0") color-secondary-1-0
			b-button(variant="color-secondary-1-3") color-secondary-1-3
			b-button(variant="color-secondary-1-4") color-secondary-1-4
		br
		b-button-group
			b-button(variant="color-secondary-2-1") color-secondary-2-1
			b-button(variant="color-secondary-2-2") color-secondary-2-2
			b-button(variant="color-secondary-2-0") color-secondary-2-0
			b-button(variant="color-secondary-2-3") color-secondary-2-3
			b-button(variant="color-secondary-2-4") color-secondary-2-4
		
		hr
		
		b-button-group
			b-button(variant="primary") primary
			b-button(variant="secondary") secondary
			b-button(variant="success") success
			b-button(variant="info") info
			b-button(variant="warning") warning
			b-button(variant="danger") danger
			b-button(variant="light") light
			b-button(variant="dark") dark
		br
		b-button-group
			b-button(variant="blue") blue
			b-button(variant="indigo") indigo
			b-button(variant="purple") purple
			b-button(variant="pink") pink
			b-button(variant="red") red
			b-button(variant="orange") orange
			b-button(variant="yellow") yellow
			b-button(variant="green") green		
			b-button(variant="teal") teal
			b-button(variant="cyan") cyan
		br
		b-button-group
			b-button(variant="white") white
			b-button(variant="gray-100") gray-100
			b-button(variant="gray-200") gray-200
			b-button(variant="gray-300") gray-300
			b-button(variant="gray-400") gray-400
			b-button(variant="gray-500") gray-500
			b-button(variant="gray-600") gray-600
			b-button(variant="gray-700") gray-700
			b-button(variant="gray-800") gray-800
			b-button(variant="gray-900") gray-900
			b-button(variant="black") black
  
</template>

<script>

export default {
	
}

</script>

<style lang="scss">
@import '../styles/custom.scss';

// Import Bootstrap and BootstrapVue source SCSS files
@import '~bootstrap/scss/bootstrap.scss';
@import '~bootstrap-vue/src/index.scss';

</style>
