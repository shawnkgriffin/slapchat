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
  constructor(props) {
    super();
    this.setState({ label: "", description: "" });
    this.handleDescriptionInput = this.handleDescriptionInput.bind(this);
    this.handleLabelInput = this.handleLabelInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleLabelInput = i => {
    this.setState({ label: i.target.value });
  };
  handleDescriptionInput = i => {
    this.setState({ description: i.target.value });
  };
  handleSubmit = i => {
    console.log(
      "handleSubmit",
      this.state.label,
      this.state.description,
      i.target.id
    );
    if (this.state.label && this.state.value) {
      alert("label and description must be filled out");
      return; // check to make sure they are not empty
    }
    this.props.dropMarker(
      this.state.label,
      this.state.description,
      i.target.id
    );
  };

  render() {
    return (
      <div className="nav-bar">
        <form className="navbar-form navbar-right" role="search">
          <div className="form-search search-only">
            <i className="search-icon glyphicon glyphicon-search" />
            <input type="text" className="form-control search-query" />
          </div>
        </form>
        <form className="navbar-form navbar-right" role="search">
          <div className="form-search search-only">
            <i className="search-icon glyphicon glyphicon-search" />
            <input
              type="text"
              className="form-control search-query"
              placeholder="label"
              onChange={this.handleLabelInput}
            />
          </div>
          <div className="form-search search-only">
            <i className="search-icon glyphicon glyphicon-search" />
            <input
              type="text"
              className="form-control search-query"
              placeholder="Description"
              onChange={this.handleDescriptionInput}
            />
            {/* <button>
              <img
                src="./avalanche1.png"
                alt="avalanche"
                onClick={this.handleSubmit}
              />
            </button> */}
          </div>
        </form>
        <button id="marker-icon">
          <img
            id={"./avalanche1.png"}
            src="./avalanche1.png"
            alt=""
            onClick={this.handleSubmit}
          />
        </button>
        <button id="marker-icon">
          <img
            id={"./fire.png"}
            alt=""
            src="./fire.png"
            onClick={this.handleSubmit}
          />
        </button>
      </div>
    );
  }
}

export default NavBar;
