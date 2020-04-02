<template lang="pug">
	div(id='admin')
	
		b-navbar(id="header", toggleable="lg", type="dark", variant="danger")
			b-container
			
				b-navbar-brand(id='logo', href="/")
					img(:src='logoUrl', alt="logo")
				
				b-navbar-toggle(target="nav-collapse")
				b-collapse(id="nav-collapse", is-nav)
				
					b-navbar-nav
						b-nav-item-dropdown
							template(slot="button-content") PHOTOS
							b-dropdown-item(to="/admin/validatePhotos") En attente
							b-dropdown-item(v-if='isAdmin', to="/admin/recentlyModified") Récemment modifiées
						b-nav-item-dropdown(v-if='isAdmin')
							template(slot="button-content") APPAREILS
							b-dropdown-item(to="/admin/appareils") Appareils
							b-dropdown-item(to="/admin/avions") Avions
							b-dropdown-item(to="/admin/modeles") Modèles
							b-dropdown-item(to="/admin/constructeurs") Constructeurs
							b-dropdown-item(to="/admin/compagnies") Compagnies
						b-nav-item-dropdown(v-if='isAdmin')
							template(slot="button-content") GALERIES
							b-dropdown-item(to="/admin/galeries") Galeries
							b-dropdown-item(to="/admin/themes") Thèmes
							b-dropdown-item(to="/admin/annees") Années
							b-dropdown-item(to="/admin/aerodromes") Aérodromes
						b-nav-item-dropdown(v-if='isAdmin')
							template(slot="button-content") PHOTOGRAPHES
							b-dropdown-item(to="/admin/photographes") Photographes
							b-dropdown-item(to="/admin/users") Utilisateurs du site
							
					b-navbar-nav(class="ml-auto")
						b-nav-form(v-if='isAdmin', @submit.stop.prevent="submitSearch")
							b-collapse(id="collapseSearchField", v-on:shown='$refs.searchInput.focus()')
								b-form-input(ref='searchInput', v-model='searchString', size="sm", class="mr-sm-2", placeholder="Recherche")
							b-button(size="sm", variant="light", v-b-toggle.collapseSearchField)
								b-icon(icon="search")
						b-nav-item(v-if='isAdmin', href="/doc")
							b-icon(icon="file-text")
						b-nav-item-dropdown(right)
							template(slot="button-content")
								b-icon(icon="person")
							b-dropdown-item(v-if='loggedIn', to="/admin/profileForm") Profile
							b-dropdown-item(v-if='loggedIn', href="/logout") Logout

		router-view
</template>

<script>
import { credentialsMixin } from './components/CredentialsMixin'
import { BIcon, BIconSearch, BIconPerson, BIconFileText } from 'bootstrap-vue'

export default {
	
  components: {
		BIcon,
    BIconSearch,
    BIconPerson,
    BIconFileText,
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
      // If the searchString is "id:54360" the user is looking for the
      // photo of the given id: capture the pattern with regexp
      var regex = /id: *(\d{1,6})/
      const match = regex.exec(this.searchString)
      if (match != null) this.$router.push({ path: `/admin/editPhoto/${match[1]}`})
			else {
				const query = { searchString: this.searchString }
				this.$router.push({ path: '/admin/search', query: query })
			}
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
