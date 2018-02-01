# react-priority-plus-nav

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coverage Status](https://coveralls.io/repos/github/cliener/create-react-app/badge.svg?branch=master)](https://coveralls.io/github/cliener/create-react-app?branch=master)

React version of `priority-plus-nav` - an ARIA compliant priority plus menu.

## Parameters

### menuItems

Array of menu item objects. If you override `renderMenuItem` below, you can set apply any custom properties in here.

```
{
  uri: "", // path
  label: "", // menu item label
  isActive: true, // indicates the current menu item is active i.e. we're on this page
}
```

### menuText [optional]

String label for the collapsed menu. Override for localisation purposes.

### moreText [optional]

String label for the overflowed menu. Override for localisation purposes.

### className [optional]

Class to sit at the top level of the rendered `<nav>` element. Helpful if you want class overrides outside the default `cdl-ppnav` namespace.

### renderMenuItem [optional]

Override the default menu item render function. You'll want to do this if you're using [React Router](https://github.com/ReactTraining/react-router) or similar.

```
const defaultRenderMenuItem = props => {
  const { itemDetails, captureRef, clickHandler, activeClass } = props;
  const { uri, label, isActive } = itemDetails;

  console.log("rendering");

  return (
    <li className={isActive ? activeClass : ""} key={uri} ref={captureRef} onClick={clickHandler}>
      <a href={uri}>{label}</a>
    </li>
  );
};
```

[build-badge]: https://img.shields.io/travis/cliener/priority-plus-nav/master.png
[build]: https://travis-ci.org/cliener/priority-plus-nav

[npm-badge]: https://img.shields.io/npm/v/npm-package.png
[npm]: https://www.npmjs.org/package/react-priority-plus-nav
