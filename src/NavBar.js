import React, { Component } from "react";

class NavBar extends Component {
  constructor(props) {
    super();

    this.handleDescriptionInput = this.handleDescriptionInput.bind(this);
    this.handleLabelInput = this.handleLabelInput.bind(this);
    this.handleMarkerSubmit = this.handleMarkerSubmit.bind(this);
  }
  componentDidMount() {
    this.setState({
      label: "",
      description: "",
      icons: ["./fire.png", "./avalanche1.png"]
    });
  }
  handleLabelInput = i => {
    this.setState({ label: i.target.value });
  };
  handleDescriptionInput = i => {
    this.setState({ description: i.target.value });
  };
  handleMarkerSubmit = i => {
    if (this.state.label && this.state.value) {
      alert("label and description must be filled out");
      return; // check to make sure they are not empty
    }
    this.props.dropMarkerCircle(
      i.target.id.indexOf("circle") === -1,
      this.state.label,
      this.state.description,
      i.target.id
    );
    document.getElementById("label").value = "";
    document.getElementById("description").value = "";
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
              id="label"
              type="text"
              className="form-control search-query"
              placeholder="label"
              onChange={this.handleLabelInput}
            />
          </div>
          <div className="form-search search-only">
            <i className="search-icon glyphicon glyphicon-search" />
            <input
              id="description"
              type="text"
              className="form-control search-query"
              placeholder="Description"
              onChange={this.handleDescriptionInput}
            />
          </div>
        </form>
        <button id="marker-icon">
          <img
            id={"./avalanche1.png"}
            src="./avalanche1.png"
            alt=""
            onClick={this.handleMarkerSubmit}
          />
        </button>
        <button id="marker-icon">
          <img
            id={"./fire.png"}
            alt=""
            src="./fire.png"
            onClick={this.handleMarkerSubmit}
          />
        </button>
        <button id="circle-icon">
          <img
            id={"./circle-red.png"}
            alt=""
            src="./circle-red.png"
            onClick={this.handleMarkerSubmit}
          />
        </button>
      </div>
    );
  }
}

export default NavBar;
