<template lang="pug">
	div(id='home')
	
		b-nav(fill, tabs)
			b-nav-item(href="/admin") Admin
			b-nav-item(href="/login") Login
					
		router-view
		
</template>

<script>
export default {}
</script>

<style lang="scss">
@import './variables.scss';

*, *::before, *::after {
	box-sizing: border-box;
}

#home {
	max-width: 600px;
	margin: 0 auto;
	line-height: 1.4;
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: $vue-blue;
}
</style>
