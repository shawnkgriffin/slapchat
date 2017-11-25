import React, { Component } from "react";

// </form>
// <button>Create Circle</button>
// <button>Create Marker</button>
// <button>Place Marker</button>
// <form>
//   <input
//     type="text"
//     placeholder="label"
//     className="form-control search-query"
//   />
//   <input
//     type="text"
//     placeholder="description"
//     className="form-control search-query"
//   />
//   <button>
//     <img
//       src="/avalanche1.png"
//       alt="my image"
//       onClick={this.myfunction}
//     />
//     <img src="/blast.png" alt="my image" onClick={this.myfunction} />
//     <img
//       src="/construction.png"
//       alt="my image"
//       onClick={this.myfunction}
//     />
//     <img src="/fire.png" alt="my image" onClick={this.myfunction} />
//   </button>
// </form>

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
