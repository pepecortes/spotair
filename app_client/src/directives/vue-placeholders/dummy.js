module.exports = {
  // When the bound element is inserted into the DOM...
  //inserted: function (el) {
    //// Focus the element
    //el.focus()
		////console.log("IN DIRECTIVE " + binding.value)
  //},
  
  bind: function(el, binding, vnode) {
		console.log("IN DIRECTIVE " + binding.value)
		
    var val      = binding.value
		//el       = this.el,
		var numSentences,	numParagraphs, p_match, s_match

    p_match = val.match( /(\d+)p/ )
    s_match = val.match( /(\d+)s/ )

    if ( p_match !== null) {
      numParagraphs = parseInt( p_match[1], 10 )
    } else {
      numParagraphs = false;
    }

    if ( s_match !== null ) {
      numSentences = parseInt( s_match[1], 10 )
    } else {
      numSentences = false;
		}
		
	},
	
}
