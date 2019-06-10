<template lang="pug">
	div(id='home')
	
		b-nav(fill, tabs)
			b-nav-item(href="/cover") Accueil
			b-nav-item(href="/exposition") Exposition
			b-nav-item(href="/galeries") Galeries
			b-nav-item(href="/admin") Admin
			b-nav-item(href="/pictadd") Pictadd
			b-nav-item(href="/login") Login
			b-nav-item(href="/logout") Logout

		router-view
		
</template>

<script>
export default {}
</script>

<style lang="scss">
@import './styles/variables.scss';
@import './styles/common.scss';

*, *::before, *::after {
	box-sizing: border-box;
}

#home {
	max-width: 1200px;
	margin: 0 auto;
	line-height: 1.4;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: $vue-blue;
}
</style>
