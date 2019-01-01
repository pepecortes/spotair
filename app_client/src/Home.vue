<template>
	<div id='home'>
	
		<b-nav fill tabs>
			<b-nav-item to="/aerodromes">Aérodromes</b-nav-item>
			<b-nav-item to="/themes">Thèmes</b-nav-item>
			<b-nav-item to="/galeries">Galeries</b-nav-item>
		</b-nav>
			
		<router-view>
		</router-view>
		
	</div>
</template>

<script>

export default {
	
	components: {
		//axios,
	},
	
}

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
