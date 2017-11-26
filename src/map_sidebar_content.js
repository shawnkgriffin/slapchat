import React, { Component } from "react";
import {
  Drawer,
  DrawerHeader,
  DrawerContent,
  Navigation,
  DrawerHeaderContent
} from "react-mdc-web/lib";

class SideBarContent extends Component {
  render() {
    return (
      <Drawer>
        <DrawerHeader>
          <DrawerHeaderContent>Stuff</DrawerHeaderContent>
        </DrawerHeader>
        <DrawerContent>
          <Navigation>
            <a>logout</a>
            <a>settings</a>
          </Navigation>
        </DrawerContent>
      </Drawer>
    );
  }
}

export default SideBarContent;
