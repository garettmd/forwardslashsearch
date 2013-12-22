(function(window) {

	//window parameter, because we might want to workaround some iframe magic sometime
	function getInput(window) {
		var searchField = window.document.querySelector('input[type="search"]');
		var textField = window.document.querySelector('input[type="text"]');

		return searchField || textField	
	}

	window.addEventListener('keyup', function(e) {
		var input;
		var KEY_CODE_FORWARD_SLASH = 191;

		if (e.which === KEY_CODE_FORWARD_SLASH) {
			input = getInput(window);
			input && input.focus();
		}
	});
})(window);
