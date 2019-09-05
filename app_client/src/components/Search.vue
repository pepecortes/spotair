<template lang="pug">
	div
		b-alert(
			:variant="alert.type",
			dismissible,
			fade,
			:show="alert.show",
			@dismissed="alert.show=false",
		) {{ alert.text }}
		
		expo-collection(v-if='!adminSearch', :collection='photos')
		admin-expo-collection(v-if='adminSearch', :collection='photos')
</template>

<script>

import { alertMixin } from './AlertMixin'
import BaseExpoCollection from './BaseExpoCollection.vue'
import AdminExpoCollection from './AdminExpoCollection.vue'

export default {
	
	components: {
		'expo-collection': BaseExpoCollection,
		'admin-expo-collection': AdminExpoCollection,
	},
	
	props: {
		adminSearch: {type: Boolean, default: false},
	},
	
	mixins: [alertMixin],
	
	data() {
		return {
			searchString: null,
			photos: [],
		}
	},
	
	watch: {
		searchString: function(newValue, oldValue) {
      const vm = this
			vm.resetAlert()
      newValue = newValue.replace('%', '')
      const apiCall = `search/fts/idsOnly?q=${newValue}`
			vm.$loading(true)
      vm.axios.get(apiCall)
				.then(response => {
					const searchResults = response.data
					const data = {ids: searchResults.slice(0,process.env.LIMIT_SEARCH_RESULTS)}
					return vm.axios.post("photos/byIds", data)
				})
				.then(response => {
					vm.photos = response.data
					if (vm.photos.length == 0) vm.showAlert("Aucun résultat")
					vm.$loading(false)
				})
				.catch(err => {vm.showAxiosAlert(err); this.$loading(false)})	
    },
	},
	
	mounted() {
		this.searchString = this.$route.query.searchString
	},
	
	beforeRouteUpdate (to, from, next) {
		this.searchString = to.query.searchString
    // called when the route that renders this component has changed,
    // but this component is reused in the new route.
    // For example, for a route with dynamic params `/foo/:id`, when we
    // navigate between `/foo/1` and `/foo/2`, the same `Foo` component instance
    // will be reused, and this hook will be called when that happens.
    // has access to `this` component instance.
    next()
  },
	
}
</script>

<style lang="scss">

</style>
