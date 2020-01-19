<template lang="pug">
	div(id='test')
		b-navbar(toggleable="lg", type="dark", variant="secondary")
			b-navbar-brand(href="/") Spotair: Test and design
			
			b-navbar-toggle(target="nav-collapse")
			b-collapse(id="nav-collapse", is-nav)
			
				b-navbar-nav
					b-nav-item-dropdown
						template(slot="button-content")
							em Design
						b-dropdown-item(to="/test/colors") Site colors
			
				b-navbar-nav
					b-nav-item-dropdown
						template(slot="button-content")
							em Tests
						b-dropdown-item(to="/test") Test 1
						
				b-navbar-nav(class="ml-auto")
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
	
}

</script>

<style lang="scss">
@import './styles/custom_variables.scss';

// Import Bootstrap and BootstrapVue source SCSS files
@import '~bootstrap/scss/bootstrap.scss';
@import '~bootstrap-vue/src/index.scss';

</style>
