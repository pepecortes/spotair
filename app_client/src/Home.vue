<template lang="pug">
	div(id='home')
	
		b-navbar(toggleable="lg", type="dark", variant="info")
			b-navbar-brand(to="/") Spotair
			
			b-navbar-toggle(target="nav-collapse")

			b-collapse(id="nav-collapse", is-nav)
				b-navbar-nav
					b-nav-item(to="/map") Carte
					b-nav-item(to="/galeries") Galeries
					b-nav-item(v-if='loggedIn', to="/pictadd") Pictadd
					b-nav-item(v-if='isAdmin', href="/admin") Admin
					
				b-navbar-nav(class="ml-auto")
					b-nav-form
						b-form-input(size="sm", class="mr-sm-2", placeholder="Search")
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
export default {	
	
	data () {
		return {
			user: null,
		}
	},
	
	computed: {
		loggedIn() {return this.user && this.user.id},
		isAdmin() {return this.user && this.user.isAdmin},
	},
	
	beforeMount() {this.getCurrentUser()},
	
	methods: {
		
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

#home {
	
}
</style>
