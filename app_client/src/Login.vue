<template lang="pug">
	div(id='login')
	
		b-navbar(id="header", toggleable="lg", type="dark", variant="color-secondary-2-1")
			b-container
				b-navbar-brand(id='logo', href="/")
					img(:src='logoUrl', alt="logo")
					
		b-container
			
			b-alert(
				:variant="alert.type",
				dismissible,
				fade,
				:show="alert.show",
				@dismissed="alert.show=false",
			) {{ alert.text }}
			
			b-card(align="center")
			
				template(v-slot:header)
					h4 Connectez-vous
					
				b-row
					b-col(md='6', offset-md='3')
						form(action="/login", method="POST")
							b-form-input(type="email", name="username", placeholder="adresse mail")
							br
							b-form-input(type="password", name="password", placeholder="mot de passe")
							br
							b-button(type="submit", variant="outline-primary") Se connecter
							
				template(v-slot:footer)
					b-link() Mot de passe oublié ?
				
</template>

<script>
import { alertMixin } from './components/AlertMixin'

export default {
	
	mixins: [alertMixin],
	
	data () {
		return {
			logoUrl: `${process.env.ASSETS_URL}icons/spotair_logo.png`,
		}
	},
	
	mounted() {
		if (flashMessage) this.showAlert(flashMessage, "danger")
		// Caution: flashMessage is a GLOBAL variable generated in route.js
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
