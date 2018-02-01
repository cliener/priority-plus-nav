"use strict";

exports.__esModule = true;

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var baseClassName = "cdl-ppnav";

var defaultRenderMenuItem = function defaultRenderMenuItem(props) {
  var itemDetails = props.itemDetails,
      captureRef = props.captureRef,
      clickHandler = props.clickHandler,
      activeClass = props.activeClass;
  var uri = itemDetails.uri,
      label = itemDetails.label,
      isActive = itemDetails.isActive;


  return _react2.default.createElement(
    "li",
    { className: isActive ? activeClass : "", key: uri, ref: captureRef, onClick: clickHandler },
    _react2.default.createElement(
      "a",
      { href: uri },
      label
    )
  );
};

defaultRenderMenuItem.propTypes = process.env.NODE_ENV !== "production" ? {
  itemDetails: _propTypes2.default.object,
  captureRef: _propTypes2.default.func,
  clickHandler: _propTypes2.default.func,
  activeClass: _propTypes2.default.string
} : {};

var PriorityPlusNav = function (_Component) {
  _inherits(PriorityPlusNav, _Component);

  function PriorityPlusNav() {
    var _temp, _this, _ret;

    _classCallCheck(this, PriorityPlusNav);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      items: [],
      itemRefs: [],
      activeItems: [],
      inactiveItems: [],
      overflowActive: false
    }, _this.parentNode = null, _this.overflowButton = null, _this.spaceTester = null, _this.itemRefs = [], _this.itemMargin = 0, _this.updateMenuItems = function (items) {
      var itemRefs = _this.state.itemRefs;

      if (items.length < 1) {
        return;
      }

      if (itemRefs.length < 1) {
        _this.setState({
          activeItems: items
        });

        return;
      }

      var totalWidth = 0;
      var parentWidth = _this.parentNode.offsetWidth;
      var overflowedIndex = items.findIndex(function (item, index) {
        totalWidth = totalWidth + itemRefs[index].offsetWidth + _this.itemMargin;

        return totalWidth > parentWidth;
      });

      var active = items.slice(0, overflowedIndex === -1 ? items.length : overflowedIndex);

      // If some elements are wrapped, make sure there's room for the overflow button
      if (active.length < items.length) {
        if (totalWidth + _this.itemMargin + _this.overflowButton.offsetWidth >= parentWidth) {
          active.pop();
        }
      }

      // If there's only one overflowed item, pop it's sibling
      // This ensures at least two elements are in the overflow.
      if (items.length - active.length === 1) {
        active.pop();
      }

      // set inactive elements
      var inactive = items.slice(active.length);

      _this.setState({
        activeItems: active,
        inactiveItems: inactive
      });
    }, _this.handleMenuItemClick = function () {
      if (_this.state.overflowActive) {
        _this.setState({
          overflowActive: false
        });
      }
    }, _this.toggleExtendedMenu = function () {
      _this.setState({
        overflowActive: !_this.state.overflowActive
      });
    }, _this.handleResize = function () {
      _this.updateMenuItems(_this.state.items);
    }, _this.handleOverflowMenuClick = function (event) {
      event.preventDefault();
      _this.toggleExtendedMenu();
      return false;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  PriorityPlusNav.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    var _props = this.props,
        menuItems = _props.menuItems,
        _props$renderMenuItem = _props.renderMenuItem,
        renderMenuItem = _props$renderMenuItem === undefined ? defaultRenderMenuItem : _props$renderMenuItem;


    var mappedMenuItems = menuItems.map(function (item, index) {
      return renderMenuItem({
        itemDetails: item,
        captureRef: function captureRef(li) {
          _this2.itemRefs[index] = li;
        },
        clickHandler: _this2.handleMenuItemClick,
        activeClass: baseClassName + "__item--active"
      });
    });

    this.setState({
      items: mappedMenuItems,
      itemRefs: this.itemRefs
    });

    this.updateMenuItems(mappedMenuItems);
  };

  PriorityPlusNav.prototype.componentDidMount = function componentDidMount() {
    this.setState({
      itemRefs: this.itemRefs
    });

    if (this.itemRefs.length > 1) {
      this.itemMargin = parseInt(window.getComputedStyle(this.itemRefs[1]).marginLeft);
    }

    this.updateMenuItems(this.state.items);

    window.addEventListener("resize", this.handleResize);
  };

  PriorityPlusNav.prototype.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  };

  PriorityPlusNav.prototype.render = function render() {
    var _this3 = this;

    var _props2 = this.props,
        _props2$MenuText = _props2.MenuText,
        MenuText = _props2$MenuText === undefined ? "Menu" : _props2$MenuText,
        _props2$MoreText = _props2.MoreText,
        MoreText = _props2$MoreText === undefined ? "More" : _props2$MoreText,
        className = _props2.className;
    var _state = this.state,
        activeItems = _state.activeItems,
        overflowActive = _state.overflowActive,
        inactiveItems = _state.inactiveItems;


    return _react2.default.createElement(
      "nav",
      {
        className: baseClassName + " " + (className ? className : ""),
        ref: function ref(nav) {
          return _this3.parentNode = nav;
        }
      },
      _react2.default.createElement(
        "ul",
        { className: baseClassName + "__hiddenNav", "aria-hidden": "true" },
        inactiveItems
      ),
      _react2.default.createElement(
        "ul",
        null,
        activeItems,
        _react2.default.createElement(
          "li",
          {
            className: baseClassName + "__indicator",
            "aria-hidden": inactiveItems.length < 1,
            ref: function ref(li) {
              return _this3.overflowButton = li;
            }
          },
          _react2.default.createElement(
            "a",
            {
              href: "#all-nav",
              className: baseClassName + "__button " + (activeItems.length > 0 ? "" : baseClassName + "__button--compact"),
              onClick: this.handleOverflowMenuClick
            },
            activeItems.length > 0 ? MoreText : MenuText
          ),
          _react2.default.createElement(
            "ul",
            { className: baseClassName + "__list", "aria-hidden": !overflowActive },
            inactiveItems
          )
        )
      )
    );
  };

  return PriorityPlusNav;
}(_react.Component);

PriorityPlusNav.propTypes = process.env.NODE_ENV !== "production" ? {
  renderMenuItem: _propTypes2.default.func,
  MenuText: _propTypes2.default.string,
  MoreText: _propTypes2.default.string,
  menuItems: _propTypes2.default.array,
  className: _propTypes2.default.string
} : {};

exports.default = PriorityPlusNav;
module.exports = exports["default"];