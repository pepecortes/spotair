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

.multiselect,
.multiselect__input,
.multiselect__single {
  font-size: 0.95rem;
}

.multiselect__tags {
  font-size: 1.0rem;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  min-height: unset;
  border-color: $gray-400;
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
