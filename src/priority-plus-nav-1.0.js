/*
 * Overflow navigation
*/

function setVisibility(element, visible) {
  element.setAttribute("aria-hidden", !visible);
}

const overflowNav = (() => {
  /* Properties */
  let _nav;

  let _navElements;
  let _overflowList;
  let _overflowButton;
  let _spaceTester;
  let _menuLabel = "Menu";
  let _moreLabel = "More";

  /* Constructor Helpers */

  // First run setup
  function _setup() {
    // Copy any menu items that don't fit on the line into the overflow

    // Collection of wrapped elements
    const wrappedElements = [];

    // Show nav indicator
    // Need it here in the DOM so we can calculate it's width later
    document
      .querySelector(".overflow-nav__indicator")
      .classList.add("overflow-nav__indicator--active");

    //calculate the width of a space to determine the gap between menu elements
    _nav.appendChild(_spaceTester);
    const gapWidth = _spaceTester.offsetWidth;
    _nav.removeChild(_spaceTester);

    // Reverse loop through nav items
    // Reversing allows us to change behaviour if at at least one element is already wrapped
    for (
      let i = _navElements.length - 1,
        // Menu top position
        menuPosition = _navElements[0].offsetTop;
      i > -1;
      i--
    ) {
      const navElement = _navElements[i];

      // If element is on the second or subsequent line or
      // some elements are already wrapped and not enough room for both the element and overflow button
      if (
        navElement.offsetTop > menuPosition ||
        (wrappedElements.length > 0 &&
          navElement.offsetLeft +
            navElement.clientWidth +
            _overflowButton.offsetWidth +
            gapWidth >=
            _nav.clientWidth)
      ) {
        //add to the wrapped array
        wrappedElements.push(navElement);
      }
    }

    const indicator = document.querySelector(".overflow-nav__indicator");

    //if there are no wrapped elements
    if (wrappedElements.length === 0) {
      //hide nav indicator
      indicator.classList.remove("overflow-nav__indicator--active");

      //exit
      return;
    }

    // If there is only one wrapped element, select the immediate sibling too.
    // This ensures at least two elements are in the overflow.
    if (wrappedElements.length === 1) {
      wrappedElements.push(wrappedElements[0].previousElementSibling);
    }

    // Show the "more" menu when the nav elements don't fit.

    indicator.classList.remove("overflow-nav__indicator--compact");
    _overflowButton.classList.remove("overflow-nav__button--active");
    _overflowButton.textContent = _moreLabel;

    //if no menu items are left, change button to "Menu" and make it look like a button
    if (wrappedElements.length === _navElements.length) {
      indicator.classList.add("overflow-nav__indicator--compact");
      _overflowButton.classList.add("overflow-nav__button--active");
      _overflowButton.textContent = _menuLabel;
    }

    //restore order and iterate
    wrappedElements.reverse().forEach(el => {
      //append to overflow list
      _overflowList.appendChild(el.cloneNode(true));

      //hide wrapped elements
      setVisibility(el);
    });
  }

  // Event binding
  function _bind() {
    window.onresize = () => {
      _clean();
      _setup();
    };

    //menu hide/show click event
    _overflowButton.addEventListener("click", _menuToggler);
  }

  /* Event Listeners */

  function _menuToggler(event) {
    const indicator = document.querySelector(".overflow-nav__indicator");
    indicator.classList.toggle("overflow-nav__indicator--open");

    //set right position of overflow list
    // const list = indicator.querySelector(".overflow-nav__list");
    //list.style.right = `${_nav.clientWidth - indicator.offsetLeft - indicator.clientWidth}px`;

    this.blur();

    event.preventDefault();
    return false;
  }

  /* Private methods */

  //remove any state classes and overflowed elements
  function _clean() {
    //clear HTML
    _overflowList.innerHTML = "";

    //show all menu items
    for (let i = 0; i < _navElements.length; i++) {
      setVisibility(_navElements[i], true);
    }

    //clear classes
    document
      .querySelector(".overflow-nav__indicator")
      .classList.remove("overflow-nav__indicator--active");
    document
      .querySelector(".overflow-nav__button")
      .classList.remove("overflow-nav__button--active");
  }

  /* Public Methods */
  return {
    init(menu, more) {
      //if no overflow nav is found, go no further
      if (!document.querySelector(".overflow-nav")) {
        return;
      }

      _nav = document.querySelector(".overflow-nav");
      _navElements = document.querySelectorAll(
        ".overflow-nav > .overflow-nav__elements > li:not(:last-child)"
      );
      _overflowList = document.querySelector(".overflow-nav__list");
      _overflowButton = document.querySelector(".overflow-nav__button");

      //If there are no menu items, get out.
      if (!_navElements || _navElements.length === 0) {
        return;
      }

      //create space width test element for later use
      _spaceTester = document.createElement("span");
      _spaceTester.innerText = 0o240;

      //if override labels are provided, use them
      if (menu) {
        _menuLabel = menu;
      }

      if (more) {
        _moreLabel = more;
      }

      if (document.querySelector(".overflow-nav__indicator")) {
        _clean();
      }

      //first run
      _setup();
      _bind();
    },
    repaint() {
      _clean();
      _setup();
    },
  };
})();

export default overflowNav;
