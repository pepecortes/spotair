<template>

<div id="galerieForm">
	<base-form xx="yy" model-name="aerodromes"></base-form>
</div>

</template>

<script>
import BaseForm from './BaseForm.vue'

export default {
	
	components: {
		'base-form': BaseForm
	},
	
}
</script>

<style lang="scss">

.formButtons {
	display: inline-flex;
}
</style>
