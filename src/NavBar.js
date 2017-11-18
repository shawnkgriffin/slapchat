import React, { Component } from "react";

class NavBar extends Component {
  render() {
    return (
      <div className="nav-bar">
        <form className="navbar-form navbar-right" role="search">
          <div className="form-search search-only">
            <i className="search-icon glyphicon glyphicon-search" />
            <input type="text" className="form-control search-query" />
          </div>
        </form>
      </div>
    );
  }
}

export default NavBar;
