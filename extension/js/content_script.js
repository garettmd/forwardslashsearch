(function(window) {
  var keyPressed = false;

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
    return (
      element.tagName.toLowerCase() == "input" ||
      element.type == "textarea" ||
      element.isContentEditable
    );
  }

  /**
   * @param {Window} window
   * @returns {Node}|null
   */
  function getSearchInput(window) {
    // retrieve inputs ordered by relevance (native search  inputs first)
    var inputCandidates = window.document.querySelectorAll(
      'input[type="search"], input[type="text"], input:not([type])'
    );

    // return first visible input
    for (var i = 0; i < inputCandidates.length; i++) {
      if (isElementVisible(inputCandidates[i])) {
        return inputCandidates[i];
      }
    }

    return null;
  }

  function wasSlashTyped(event) {
    var KEY_CODE_FORWARD_SLASH = 191;
    var KEY_CODE_SEVEN = 55;

    return (
      (event.which === KEY_CODE_FORWARD_SLASH && !event.shiftKey) ||
      (event.which === KEY_CODE_SEVEN && event.shiftKey)
    );
  }

  window.addEventListener("keydown", function(e) {
    var input;

    // is the target element is editable, do nothing, because the user's probably already typing inside an input
    // so no need to focus again
    if (isElementEditable(e.target) && keyPressed) {
      return;
    }

    keyPressed = true;

    if (wasSlashTyped(e)) {
      input = getSearchInput(window);
      if (input) {
        input.focus();
        e.preventDefault();
      }
    }
  });
})(window);
