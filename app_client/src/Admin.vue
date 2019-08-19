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
						b-dropdown-item(to="/admin/validatePhoto") Validate
					b-nav-item-dropdown
						template(slot="button-content")
							em Appareils
						b-dropdown-item(to="/admin/appareils") Appareils
						b-dropdown-item(to="/admin/avions") Avions
						b-dropdown-item(to="/admin/modeles") Modèles
						b-dropdown-item(to="/admin/constructeurs") Constructeurs
						b-dropdown-item(to="/admin/compagnies") Compagnies
					b-nav-item-dropdown
						template(slot="button-content")
							em Galeries
						b-dropdown-item(to="/admin/galeries") Galeries
						b-dropdown-item(to="/admin/themes") Thèmes
						b-dropdown-item(to="/admin/annees") Années
						b-dropdown-item(to="/admin/aerodromes") Aérodromes
					b-nav-item-dropdown
						template(slot="button-content")
							em Photographes
						b-dropdown-item(to="/admin/photographes") Photographes
						b-dropdown-item(to="/admin/users") Utilisateurs du site
						
				b-navbar-nav(class="ml-auto")
					b-nav-form(@submit='submitSearch')
						b-form-input(v-model='searchString', size="sm", class="mr-sm-2", placeholder="Search")
						b-button(size="sm", class="my-2 my-sm-0", type="submit") Search
					b-nav-item(href="/doc") Docs
					b-nav-item-dropdown(right)
						template(slot="button-content")
							em User
						b-dropdown-item(v-if='loggedIn', to="/admin/profileForm") Profile
						b-dropdown-item(v-if='loggedIn', href="/logout") Logout

		router-view
</template>

<script>
export default {	
	
	data () {
		return {
			user: null,
			searchString: null,
		}
	},
	
	computed: {
		loggedIn() {return this.user && this.user.id},
		isAdmin() {return this.user && this.user.isAdmin},
	},
	
	beforeMount() {this.getCurrentUser()},
	
	methods: {
		
		submitSearch(evt) {
      evt.preventDefault()
      const query = { searchString: this.searchString }
			this.$router.push({ path: '/admin/search', query: query })
		},
		
		getCurrentUser() {
			var vm = this
			vm.axios.get(process.env.WEB_URL + 'profile') 
				// note that the call is NOT an API call
				.then(response => vm.user = response.data)
				.catch(err => vm.showAxiosAlert(err, "danger"))
		},
	}
	
}

</script>

<style lang="scss">
@import './styles/variables.scss';
@import './styles/common.scss';

*, *::before, *::after {
	box-sizing: border-box;
}

#admin {

}

</style>
