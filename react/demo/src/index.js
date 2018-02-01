import React, {Component} from "react"
import {render} from "react-dom"

import PriorityPlusNav from "../../src"
import "../../src/ppnav.scss";
import "./demo.scss";

class Demo extends Component {
  menuItems = [
    { uri: "/", label: "Home", isActive: true },
    { uri: "/away", label: "Away" },
    { uri: "/here", label: "Here" },
    { uri: "/there", label: "There" },
    { uri: "/what", label: "Everywhere" },
    { uri: "/bing", label: "Bing" },
    { uri: "/bong", label: "Bong" },
    { uri: "/boo", label: "Boo" },
  ];

  render() {
    return <div>
      <h1>React Priority Plus Nav Demo</h1>
      <PriorityPlusNav menuItems={this.menuItems} />
    </div>
  }
}

render(<Demo/>, document.querySelector("#demo"))
