<template lang="pug">
	div(id='admin')
	
		b-navbar(toggleable="lg", type="dark", variant="danger")
			b-navbar-brand(href="/") Spotair
			
			b-navbar-toggle(target="nav-collapse")
			b-collapse(id="nav-collapse", is-nav)
			
				b-navbar-nav
					b-nav-item-dropdown
						template(slot="button-content")
							em Photos
						b-dropdown-item(to="/admin/validatePhotos") En attente
						b-dropdown-item(v-if='isAdmin', to="/admin/recentlyModified") Récemment modifiées
					b-nav-item-dropdown(v-if='isAdmin')
						template(slot="button-content")
							em Appareils
						b-dropdown-item(to="/admin/appareils") Appareils
						b-dropdown-item(to="/admin/avions") Avions
						b-dropdown-item(to="/admin/modeles") Modèles
						b-dropdown-item(to="/admin/constructeurs") Constructeurs
						b-dropdown-item(to="/admin/compagnies") Compagnies
					b-nav-item-dropdown(v-if='isAdmin')
						template(slot="button-content")
							em Galeries
						b-dropdown-item(to="/admin/galeries") Galeries
						b-dropdown-item(to="/admin/themes") Thèmes
						b-dropdown-item(to="/admin/annees") Années
						b-dropdown-item(to="/admin/aerodromes") Aérodromes
					b-nav-item-dropdown(v-if='isAdmin')
						template(slot="button-content")
							em Photographes
						b-dropdown-item(to="/admin/photographes") Photographes
						b-dropdown-item(to="/admin/users") Utilisateurs du site
						
				b-navbar-nav(class="ml-auto")
					b-nav-form(v-if='isAdmin', @submit='submitSearch')
						b-form-input(v-model='searchString', size="sm", class="mr-sm-2", placeholder="Search")
						b-button(size="sm", class="my-2 my-sm-0", type="submit") Search
					b-nav-item(v-if='isAdmin', href="/doc") Docs
					b-nav-item-dropdown(right)
						template(slot="button-content")
							em User
						b-dropdown-item(v-if='loggedIn', to="/admin/profileForm") Profile
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
		}
	},
	
	methods: {
		
		submitSearch(evt) {
      evt.preventDefault()
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

#admin {

}

</style>
