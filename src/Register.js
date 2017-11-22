import React, { Component } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import App from "./App.js";

const customStyles = {
  content: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    color: "rgba(255, 255, 255, 1)"
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)"
  }
};
const buttonStyle = {
  color: "black"
};
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      diplay_name: "",
      avatar: ""
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleDisplayNameChange = this.handleDisplayNameChange.bind(this);
    this.handleAvatarChange = this.handleAvatarChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onRegister = this.onRegister.bind(this);
  }
  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    this.subtitle.style.color = "#black";
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleEmailChange(event) {
    let value = event.target.value.trim();
    this.setState({ email: value });
  }

  handlePasswordChange(event) {
    let value = event.target.value.trim();
    this.setState({ password: value });
  }
  handleFirstNameChange(event) {
    let value = event.target.value.trim();
    this.setState({ first_name: value });
  }

  handleLastNameChange(event) {
    let value = event.target.value.trim();
    this.setState({ last_name: value });
  }
  handleDisplayNameChange(event) {
    let value = event.target.value.trim();
    this.setState({ display_name: value });
  }

  handleAvatarChange(event) {
    let value = event.target.value.trim();
    this.setState({ avatar: value });
  }

  handleSubmit(event) {
    this.onRegister();
  }

  onRegister() {
    let newRegister = {
      email: this.state.email,
      password: this.state.password,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      diplay_name: this.state.display_name,
      avatar: this.state.avatar
    };
    this.props.sendNewRegister(newRegister);
    this.closeModal();
  }

  render() {
    return (
      <div>
        <button onClick={this.openModal}>Register</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Register"
        >
          <h2 ref={subtitle => (this.subtitle = subtitle)}>Register</h2>
          <form>
            <ul>
              <br />
              <input
                id="email"
                placeholder="email"
                value={this.state.value}
                onChange={this.handleEmailChange}
              />
              <br />
              <br />
              <input
                id="password"
                placeholder="password"
                value={this.state.value}
                onChange={this.handlePasswordChange}
              />
              <br />
              <br />
              <input
                id="first name"
                placeholder="first name"
                value={this.state.value}
                onChange={this.handleFirstNameChange}
              />
              <br />
              <br />
              <input
                id="last name"
                placeholder="last name"
                value={this.state.value}
                onChange={this.handleLastNameChange}
              />
              <br />
              <br />
              <input
                id="display name"
                placeholder="username"
                value={this.state.value}
                onChange={this.handleDisplayNameChange}
              />
              <br />
              <br />
              <input
                id="avatar"
                placeholder="avatar url"
                value={this.state.value}
                onChange={this.handleAvatarChange}
              />
              <br />
            </ul>
            <button style={buttonStyle} onClick={this.handleSubmit}>
              Submit
            </button>
          </form>
        </Modal>
      </div>
    );
  }
}

export default Register;
