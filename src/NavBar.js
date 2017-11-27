import React, { Component } from "react";
import SmoothCollapse from "react-smooth-collapse";

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

    let newArray = i.target.src.split("/");
    const icon = "./" + newArray[newArray.length - 1];

    this.props.dropMarkerCircle(
      i.target.src.indexOf("circle") === -1,
      this.state.label,
      this.state.description,
      icon
    );
    document.getElementById("label").value = "";
    document.getElementById("description").value = "";
  };

  state: Object = {
    expanded: false
  };

  _toggle() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { expanded } = this.state;
    return (
      <div className="nav-bar">
        <form
          id="search-form"
          className="navbar-form navbar-right"
          role="search"
        >
          <div className="form-search search-only">
            <i className="search-icon glyphicon glyphicon-search" />
            <input type="text" className="form-control search-query" />
          </div>
        </form>
        <SmoothCollapse expanded={expanded}>
          <div className="slide">
            <button id="marker-icon">
              <img
                alt=""
                src="./circle-red.png"
                onClick={this.handleMarkerSubmit}
              />
            </button>
            <form
              id="icon-form"
              className="navbar-form navbar-right"
              role="search"
            >
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
                {/* <button>
              <img
                src="./avalanche1.png"
                alt="avalanche"
                onClick={this.handleSubmit}
              />
            </button> */}
              </div>
            </form>
            <div id="marker-buttons">
              <button id="marker-icon">
                <img
                  alt=""
                  src="./skistation.png"
                  onClick={this.handleMarkerSubmit}
                />
              </button>
              <button id="marker-icon">
                <img
                  alt=""
                  src="./skilifting.png"
                  onClick={this.handleMarkerSubmit}
                />
              </button>
              <button id="marker-icon">
                <img
                  alt=""
                  src="./avalanche1.png"
                  onClick={this.handleSubmit}
                />
              </button>
              <button id="marker-icon">
                <img
                  alt=""
                  src="./fire.png"
                  onClick={this.handleMarkerSubmit}
                />
              </button>
              <button id="marker-icon">
                <img
                  alt=""
                  src="./blast.png"
                  onClick={this.handleMarkerSubmit}
                />
              </button>
              <button id="marker-icon">
                <img
                  alt=""
                  src="./construction.png"
                  onClick={this.handleMarkerSubmit}
                />
              </button>
              <button id="marker-icon">
                <img
                  alt=""
                  src="./nordicskiing.png"
                  onClick={this.handleMarkerSubmit}
                />
              </button>
            </div>
          </div>
        </SmoothCollapse>
        <div className="slap-logo">SLAP</div>
        <div>
          <input
            id="collapsebutton"
            type="image"
            alt=""
            src="white-hand.png"
            value={expanded ? "Hide" : "Show"}
            onClick={() => this._toggle()}
          />
        </div>
      </div>
    );
  }
}

export default NavBar;
