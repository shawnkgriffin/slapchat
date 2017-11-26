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
    this.handleSubmit2 = this.handleSubmit2.bind(this);
  }
  handleLabelInput = i => {
    console.log("handleLabelInput =", i, i.target.value);
    this.setState({ label: i.target.value });
  };
  handleDescriptionInput = i => {
    console.log("handleDescriptionInput =", i, i.target.value);
    this.setState({ description: i.target.value });
  };
  handleSubmit = i => {
    console.log("handleSubmit", i, this.state.label, this.state.description);
    this.props.dropMarker(
      this.state.label,
      this.state.description,
      "./avalanche.png"
    );
  };
  handleSubmit2 = i => {
    console.log("handleSubmit2", i, this.state.label, this.state.description);
    this.props.dropMarker(
      this.state.label,
      this.state.description,
      "./fire.png"
    );
  };
  render() {
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
        <div>
          <button id="marker-icon">
            <img src="./circle-red.png" onClick={this.handleSubmit2} />
          </button>
        </div>
        <form id="icon-form" className="navbar-form navbar-right" role="search">
          <div className="form-search search-only">
            <i className="search-icon glyphicon glyphicon-search" />
            <input
              id="marker-input"
              type="text"
              className="form-control search-query"
              placeholder="label"
              onChange={this.handleLabelInput}
            />
          </div>
          <div className="form-search search-only">
            <i className="search-icon glyphicon glyphicon-search" />
            <input
              id="marker-input"
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
            <img src="./skistation.png" onClick={this.handleSubmit2} />
          </button>
          <button id="marker-icon">
            <img src="./skilifting.png" onClick={this.handleSubmit2} />
          </button>
          <button id="marker-icon">
            <img src="./avalanche1.png" onClick={this.handleSubmit} />
          </button>
          <button id="marker-icon">
            <img src="./fire.png" onClick={this.handleSubmit2} />
          </button>
          <button id="marker-icon">
            <img src="./blast.png" onClick={this.handleSubmit2} />
          </button>
          <button id="marker-icon">
            <img src="./construction.png" onClick={this.handleSubmit2} />
          </button>
          <button id="marker-icon">
            <img src="./nordicskiing.png" onClick={this.handleSubmit2} />
          </button>
        </div>
      </div>
    );
  }
}

export default NavBar;
