<template lang="pug">
	div(id='home')
	
		b-navbar(toggleable="lg", type="dark", variant="primary")
			b-navbar-brand(id='logo', href="/")
				img(:src='logoUrl', alt="logo")
			
			b-navbar-toggle(target="nav-collapse")
			b-collapse(id="nav-collapse", is-nav)
			
				b-navbar-nav
					b-nav-item(to="/map") Carte
					b-nav-item(to="/galeries") Galeries
					b-nav-item-dropdown(v-if='loggedIn')
						template(slot="button-content")
							em Mes Photos
						b-dropdown-item(to="/pictadd") Pictadd
						b-dropdown-item(:to="`/myPendingPictures/${user.id}`") En attente
						b-dropdown-item(:to="`/myValidatedPictures/${user.id}`") Publiées
						b-dropdown-item(:to="`/myRejectedPictures/${user.id}`") Non publiées
					b-nav-item(v-if='isAdmin || isScreener', href="/admin") Admin
					
				b-navbar-nav(class="ml-auto")
					b-nav-form(@submit='submitSearch')
						b-form-input(v-model='searchString', size="sm", class="mr-sm-2", placeholder="Recherche")
						b-button(size="sm", class="my-2 my-sm-0", type="submit") Search
					b-nav-item-dropdown(right)
						template(slot="button-content")
							em User
						b-dropdown-item(v-if='!loggedIn', href="/login") Login
						b-dropdown-item(v-if='loggedIn', to="/profileForm") Profile
						b-dropdown-item(v-if='loggedIn', href="/logout") Logout

		router-view
		
</template>

<script>
import { credentialsMixin } from './components/CredentialsMixin'

export default {
	
	mixins: [credentialsMixin],
	
	data () {
		return {
			searchString: null,
			logoUrl: `${process.env.ASSETS_URL}icons/spotair_logo.png`,
		}
	},
	
	methods: {
		
		submitSearch(evt) {
      evt.preventDefault()
      const query = { searchString: this.searchString }
			this.$router.push({ path: '/search', query: query })
		},
	},
	
}
</script>

<style lang="scss">
@import './styles/custom.scss';

// Import Bootstrap and BootstrapVue source SCSS files
@import '~bootstrap/scss/bootstrap.scss';
@import '~bootstrap-vue/src/index.scss';

//@import './styles/variables.scss';
//@import './styles/common.scss';

*, *::before, *::after {
	box-sizing: border-box;
}

.router-link-active {
	font-weight: bold;
}

#home {
}

#logo {
	padding: 0px;
}

#logo img {
	height:50px;
}

</style>
