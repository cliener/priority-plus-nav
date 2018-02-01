import expect from "expect";
import React from "react";
import {render, unmountComponentAtNode} from "react-dom";

import PriorityPlusNav from "src/PriorityPlusNav"

describe("PriorityPlusNav", () => {
  let node;

  beforeEach(() => {
    node = document.createElement("div")
  });

  afterEach(() => {
    unmountComponentAtNode(node)
  });

  it("Renders", () => {
    render(<PriorityPlusNav menuItems={[]}/>, node, () => {
      expect(node.innerHTML).toContain(`<nav class="cdl-ppnav "><ul class="cdl-ppnav__hiddenNav" aria-hidden="true"></ul><ul><li class="cdl-ppnav__indicator" aria-hidden="true"><a href="#all-nav" class="cdl-ppnav__button cdl-ppnav__button--compact">Menu</a><ul class="cdl-ppnav__list" aria-hidden="true"></ul></li></ul></nav>`)
    });
  });

  it("Renders with menu", () => {
    render(<PriorityPlusNav menuItems={[{uri: "/", label: "Home" }]}/>, node, () => {
      expect(node.innerHTML).toContain(`<ul><li class=""><a href="/">Home</a></li>`)
    });
  });

  it("Renders with active menu", () => {
    render(<PriorityPlusNav menuItems={[{uri: "/", label: "Home", isActive: true }]}/>, node, () => {
      expect(node.innerHTML).toContain(`<ul><li class="cdl-ppnav__item--active"><a href="/">Home</a></li>`)
    });
  });


  it("Renders custom class", () => {
    render(<PriorityPlusNav menuItems={[]} className="tst-ppnav"/>, node, () => {
      expect(node.innerHTML).toContain(`<nav class="cdl-ppnav tst-ppnav">`)
    });
  });
});
