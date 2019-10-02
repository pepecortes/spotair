<template lang="pug">
	div
		b-alert(
			:variant="alert.type",
			dismissible,
			fade,
			:show="alert.show",
			@dismissed="alert.show=false",
		) {{ alert.text }}
		
		expo-collection(
			v-if='!adminSearch',
			:collection='photos'
		)
		admin-expo-collection(
			v-if='adminSearch',
			:collection='photos',
			v-on:update='refresh',
		)
</template>

<script>

import { alertMixin } from './AlertMixin'
import BaseExpoCollection from './BaseExpoCollection.vue'
import AdminExpoCollection from './AdminExpoCollection.vue'
import { SearchType } from '../../../app_lib/constants'

export default {
	
	components: {
		'expo-collection': BaseExpoCollection,
		'admin-expo-collection': AdminExpoCollection,
	},
	
	props: {
		adminSearch: {type: Boolean, default: false},
		searchType: {type: Number, default: SearchType.FTS},
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
			this.refresh()
    },
	},
	
	mounted() {
		//this.searchString = this.$route.query.searchString
		//console.log("Search.vue. SearchType: " + JSON.stringify(SearchType))
		//console.log("Search.vue. this.searchType: " + this.searchType)
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
  
  methods: {
		
		refresh() {
			this.resetAlert()
			this.$loading(true)
			this.searchCall().then(response => {
				this.photos = JSON.parse(JSON.stringify(response.data))
				if (this.photos.length == 0) this.showAlert("Aucun résultat")
				this.$loading(false)
			})
			.catch(err => {this.showAxiosAlert(err); this.$loading(false)})	
		},
		
		searchCall() {
			switch(this.searchType) {
				case SearchType.RECENT_MODIFIED:
					return this.axios.get(`photos/recentModified/`)
					break;
				
				case SearchType.ID:
					const id = parseInt(this.searchString)
					return this.axios.get(`photos/${id}`)
					break;
				
				default:
					const query = this.searchString.replace('%', '')
					const apiCall = `search/fts/idsOnly?q=${query}`
					return this.axios.get(apiCall)
						.then(response => {
							const searchResults = response.data
							const data = {ids: searchResults.slice(0,process.env.LIMIT_SEARCH_RESULTS)}
							return this.axios.post("photos/byIds", data)
						})
			}
		},
		
	},
	
}
</script>

<style lang="scss">

</style>
