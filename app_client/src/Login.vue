<template lang="pug">
	div(id='login')
		b-navbar(id="header", toggleable="lg", type="dark", variant="white")
			b-container
				b-navbar-brand(id='logo', href="/")
					img(:src='logoUrl', alt="logo")
					
		h3 MESSAGE MISSING
			form(action="/login", method="POST")
				p username:
				input(type="email", name="username", placeholder="email")
				p password (required):
				input(type="password", name="password", placeholder="password")
				br
				br
				button(type="submit") Login
		
</template>

<script>

export default {
	
	data () {
		return {
			logoUrl: `${process.env.ASSETS_URL}icons/spotair_logo.png`,
		}
	},
	
}
</script>

<style lang="scss">
@import './styles/custom_variables.scss';

// Import Bootstrap and BootstrapVue source SCSS files
@import '~bootstrap/scss/bootstrap.scss';
@import '~bootstrap-vue/src/index.scss';

*, *::before, *::after {
	box-sizing: border-box;
}

.router-link-active {
	font-weight: bold;
}

#header {
	margin-bottom: 1em;
}

#logo {
	padding: 0px;
}

#logo img {
	height:50px;
}

</style>
