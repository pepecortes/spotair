<template lang="pug">
	div(id='home')
		b-navbar(id="header", toggleable="lg", type="dark", variant="color-primary-1")
			b-container
			
				b-navbar-brand(id='logo', href="/")
					img(:src='logoUrl', alt="logo")
				
				b-navbar-toggle(target="nav-collapse")
				b-collapse(id="nav-collapse", is-nav)
				
					b-navbar-nav
						b-nav-item(to="/map") CARTE
						b-nav-item(to="/galeries") GALERIES
						b-nav-item-dropdown(v-if='loggedIn')
							template(slot="button-content") MES PHOTOS
							b-dropdown-item(to="/pictadd") PICTADD
							b-dropdown-item(:to="`/myPendingPictures/${user.id}`") EN ATTENTE
							b-dropdown-item(:to="`/myValidatedPictures/${user.id}`") PUBLIÉES
							b-dropdown-item(:to="`/myRejectedPictures/${user.id}`") NON PUBLIÉES
						b-nav-item(v-if='isAdmin || isScreener', href="/admin") ADMIN
						
					b-navbar-nav(class="ml-auto")
						b-nav-form(@submit='submitSearch')
							b-form-input(v-model='searchString', size="sm", class="mr-sm-2", placeholder="Recherche")
							b-button(size="sm", type="submit", variant="primary")
								b-icon(icon="search")
						b-nav-item-dropdown(right)
							template(slot="button-content")
								b-icon(icon="person")
							b-dropdown-item(v-if='!loggedIn', href="/login") Login
							b-dropdown-item(v-if='loggedIn', to="/profileForm") Profile
							b-dropdown-item(v-if='loggedIn', href="/logout") Logout

		router-view
		
</template>

<script>
import { credentialsMixin } from './components/CredentialsMixin'
import { BIcon, BIconSearch, BIconPerson } from 'bootstrap-vue'

export default {
	
  components: {
		BIcon,
    BIconSearch,
    BIconPerson,
  },
	
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
