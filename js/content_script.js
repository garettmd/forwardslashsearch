(function (window) {

  /**
   * @param {Node} element
   * @returns {boolean}
   */
  function isElementVisible(element) {
    return element.offsetHeight > 0 && element.offsetWidth > 0;
  }

  /**
   *
   * @param {Node} element
   * @returns {boolean}
   */
  function isElementEditable(element) {

    return element.tagName.toLowerCase() == 'input'
    || element.type == 'textarea'
    || element.isContentEditable
  }

  /**
   * @param {Window} window
   * @returns {Node}|null
   */
  function getSearchInput(window) {
    // retrieve inputs ordered by relevance (native search  inputs first)
    var inputCandidates = window.document.querySelectorAll('input[type="search"], input[type="text"], input:not([type])');

    // return first visible input
    for (var i = 0; i < inputCandidates.length; i++) {
      if (isElementVisible(inputCandidates[i])) {
        return inputCandidates[i];
      }
    }

    return null;
  }

  
  window.addEventListener('keyup', function (e) {
    var input;
    var KEY_CODE_FORWARD_SLASH = 191;

    // is the target element is editable, do nothing, because the user's probably already typing inside an input
    // so no need to focus again
    if (isElementEditable(e.target)) {
      return;
    }

    if (e.which === KEY_CODE_FORWARD_SLASH) {
      input = getSearchInput(window);
      if (input) {
        input.focus();
      }
    }
  });
})(window);
