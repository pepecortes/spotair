<template lang="pug">
	div(id='pictadd')
		b-nav(fill, tabs)
			b-nav-item(href="/") Home
			b-nav-item(to="/pictadd/fileUpload") FileUpload
			b-nav-item(to="/pictadd/profile") Profile
			
		router-view
</template>

<script>

export default {
	name: 'Pictadd',
}
	
</script>

<style lang="scss">
@import './styles/variables.scss';

*, *::before, *::after {
	box-sizing: border-box;
}

#pictadd {
	max-width: 800px;
	margin: 0 auto;
	line-height: 1.4;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: $vue-blue;
}

</style>
