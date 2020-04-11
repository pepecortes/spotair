<script>
import VueSelect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
	extends: VueSelect,
	
	props: {
		
    /**
     * Equivalent to the `placeholder` attribute on a `<select>` input.
     * @default 'Select option'
     * @type {String}
     */
    placeholder: {
      type: String,
      default: "Sélectionnez une option"
    },
    
    selectLabel: {
      type: String,
      default: "appuyez sur entrée pour sélectionner"
    },
    
    selectedLabel: {
      type: String,
      default: "sélectionné"
    },
    
    deselectLabel: {
      type: String,
      default: "appuyez sur entrée pour désélectionner"
    },
    
	}
}
</script>

<style lang="scss">
@import '../styles/colors.scss';

.multiselect {
	padding-top: 0px;
	min-height: unset;
	border: 1px solid $gray-400;
	border-radius: 0.25rem;
}

.multiselect__select {
	height: 2.0rem;
}

.multiselect__option {
	font-size: 1.1rem;
	padding: 0.8rem;
	min-height: 2.5rem;
	line-height: 1rem;
}

.multiselect__input,
.multiselect__single {
  font-size: 1.0rem;
  margin-bottom: 0px;
  padding-top: 0.25rem;
}

.multiselect__tags {
  font-size: 1.0rem;
  padding-top: 0.3rem;
  padding-bottom: 0.4rem;
  min-height: unset;
}

.multiselect__placeholder {
	margin-bottom: 0px;
	padding-top: 0px;
	color: $gray-600;
}

.multiselect__tag-icon:after {
  font-size: 1.0rem;
}

.multiselect__option:after {
  font-size: 1.0rem;
}

</style>
