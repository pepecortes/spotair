<template lang="pug">
	div(id='home')
		b-navbar(id="header", toggleable="lg", type="dark", variant="color-primary-1")
			b-container
			
				b-navbar-brand(id='logo', to="/")
					img(:src='logoUrl', alt="logo")
				
				b-navbar-toggle(target="nav-collapse")
				
				b-collapse(id="nav-collapse", is-nav)
				
					b-navbar-nav
						b-nav-item(href="https://www.facebook.com/spotair.org/", target="_blank")
							fa-icon.social(icon="facebook-square")
						b-nav-item(href="https://www.instagram.com/spotair.officiel/", target="_blank")
							fa-icon.social(icon="instagram")
						b-nav-item(to="/map") CARTE
						b-nav-item(to="/galeries") GALERIES
						b-nav-item-dropdown(v-if='loggedIn')
							template(slot="button-content") MES PHOTOS
							b-dropdown-item(to="/pictadd") PICTADD
							b-dropdown-item(:to="`/myPendingPictures/${user.id}`") EN ATTENTE
							b-dropdown-item(:to="`/myValidatedPictures/${user.id}`") PUBLIÉES
							b-dropdown-item(:to="`/myRejectedPictures/${user.id}`") NON PUBLIÉES
						b-nav-item(v-show='isAdmin || isScreener', href="/admin") ADMIN
						
					b-navbar-nav(class="ml-auto")
						b-nav-form(@submit.stop.prevent="submitSearch")
							b-collapse(id="collapseSearchField", v-on:shown='$refs.searchInput.focus()')
								b-form-input(ref="searchInput", v-model='searchString', size="sm", class="mr-sm-2", placeholder="Recherche")
							b-button(size="sm", variant="primary", v-b-toggle.collapseSearchField)
								fa-icon(icon="search")
						b-nav-item(v-show='silent', v-on:click="toggleSilent", v-b-tooltip.hover.v-yellow.ds1000, title="site complet")
							fa-icon(icon="bell-o")
						b-nav-item(v-show='!silent', v-on:click="toggleSilent", v-b-tooltip.hover.v-yellow.ds1000, title="au calme")
							fa-icon(icon="bell-slash-o")
						b-nav-item-dropdown(right)
							template(slot="button-content")
								fa-icon(icon="user")
							b-dropdown-item(v-if='!loggedIn', href="/login") Login
							b-dropdown-item(v-if='loggedIn', to="/profileForm") Profile
							b-dropdown-item(v-if='loggedIn', href="/logout") Logout

		router-view(:silent='silent')
		
</template>

<script>
import { credentialsMixin } from '../mixins/Credentials'
import 'font-awesome/css/font-awesome.min.css'
import VueFontawesome from 'vue-fontawesome-icon/VueFontawesome.vue'

export default {
	
  components: {
		'fa-icon': VueFontawesome,
  },
	
	mixins: [credentialsMixin],
	
	data () {
		return {
			searchString: null,
			logoUrl: `${process.env.ASSETS_URL}icons/spotair_logo.png`,
			silent: false,
		}
	},
	
	methods: {
		
		toggleSilent() {
			this.silent = !this.silent
		},
		
		submitSearch(evt) {
      const query = { searchString: this.searchString }
      this.searchString = ""
			this.$root.$emit('bv::toggle::collapse', 'collapseSearchField')
			this.$router.push({ path: '/search', query: query })
		},
	},
	
}
</script>

<style lang="scss">
@import '../styles/custom_variables.scss';

// Import Bootstrap and BootstrapVue source SCSS files
@import '~bootstrap/scss/bootstrap.scss';
@import '~bootstrap-vue/src/index.scss';

*, *::before, *::after {
	box-sizing: border-box;
}

.router-link-active {
	font-weight: bold;
}

.dropdown-menu {
	min-width: unset;
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

.social {	
	font-size: 1.5rem;
	color: $color-primary-0;
}

</style>
