<template lang="pug">
	div
		b-alert(
			:variant="alert.type",
			dismissible,
			fade,
			:show="alert.show",
			@dismissed="alert.show=false",
		) {{ alert.text }}
		
		b-container
		
			div(class="title text-center")
				h4(v-if='title') {{ title }}
				p(v-if='subtitle') {{ subtitle }}
			
			expo-collection(
				v-if='!adminSearch',
				:collection='photos',
				:thumbnailLocation='thumbnailLocation',
				:photoLocation='photoLocation',
			)
			
			admin-expo-collection(
				v-if='adminSearch',
				:collection='photos',
				v-on:update='refresh',
				:thumbnailLocation='thumbnailLocation',
				:photoLocation='photoLocation',
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
		
		adminSearch: {
			type: Boolean,
			default: false
		},
		
		searchType: {
			type: Number,
			default: SearchType.FTS
		},
		
		thumbnailLocation: {
			type: String,
			default: process.env.STORAGE_URL + process.env.THUMBNAIL_LOCATION
		},
		
		photoLocation: {
			type: String,
			default: process.env.STORAGE_URL + process.env.PICTURE_LOCATION
		},
		
		title: {
			type: String,
			default: null,
		},
		
		subtitle: {
			type: String,
			default: null,
		},
		
	},
	
	mixins: [alertMixin],
	
	data() {
		return {
			searchString: null,
			id: null,
			photos: [],
		}
	},
	
	watch: {
    $route: function() {this.refresh()},
	},
	
	mounted() {
		this.refresh()
	},
  
  methods: {
		
		refresh() {
			this.searchString = this.$route.query.searchString
			this.id = this.$route.params.id			
			this.resetAlert()
			this.$loading(true)
			this.searchCall().then(array => {
				this.photos = JSON.parse(JSON.stringify(array))
				if (this.photos.length == 0) this.showAlert("Aucun résultat")
				this.$loading(false)
			})
			.catch(err => {this.showAxiosAlert(err); this.$loading(false)})	
		},
		
		searchCall() {
			switch(this.searchType) {
				case SearchType.RECENT_MODIFIED:
					return this.axios.get(`photos/recentModified/`)
						.then(response => response.data)
					break;
				case SearchType.ID:
					return this.axios.get(`photos/${this.id}`)
						.then(response => [response.data])
					break;
				case SearchType.BY_USER_VALIDATED:
					return this.axios.get(`photos/byUserValidated/${this.id}`)
						.then(response => response.data)
					break;
					break;
				case SearchType.BY_USER_PENDING:
					return this.axios.get(`photouploads/pending/byUser/${this.id}`)
						.then(response => response.data)
					break;
				case SearchType.BY_USER_REJECTED:
					return this.axios.get(`photouploads/rejected/byUser/${this.id}`)
						.then(response => response.data)
					break;
				default:
					const query = this.searchString.replace('%', '')
					const apiCall = `search/fts/idsOnly?q=${query}`
					return this.axios.get(apiCall)
						.then(response => {
							const searchResults = response.data
							const data = {ids: searchResults.slice(0,process.env.LIMIT_SEARCH_RESULTS)}
							return this.axios.post("photos/byIds", data)
								.then(response => response.data)
						})
			}
		},
		
	},
	
}
</script>

<style lang="scss">
@import '../styles/custom_variables.scss';

.title {
	color: $primary;
}

.title > p {
	color: $gray-600;
	font-size: 1.1em;
	font-style: italic;
}

</style>
