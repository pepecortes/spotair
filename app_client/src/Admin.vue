<template lang="pug">
	div(id='admin')
		b-nav(fill, tabs)
			b-nav-item(href="/") Home
			b-nav-item(to="/admin/aerodromes") Aérodromes
			b-nav-item(to="/admin/themes") Thèmes
			b-nav-item(to="/admin/annees") Années
			b-nav-item(to="/admin/galeries") Galeries
			b-nav-item(to="/admin/compagnies") Compagnies
			b-nav-item(to="/admin/photographes") Photographes
			b-nav-item(to="/admin/constructeurs") Constructeurs
			b-nav-item(to="/admin/modeles") Modèles
			b-nav-item(to="/admin/avions") Avions
			b-nav-item(href="/doc") Documentation
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

#admin {
	max-width: 1000px;
	margin: 0 auto;
	line-height: 1.4;
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: $vue-blue;
}

</style>
