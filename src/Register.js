import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
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
              <li>
                <input
                  id="email"
                  placeholder="email"
                  value={this.state.value}
                  onChange={this.handleEmailChange}
                />
              </li>
              <li>
                <input
                  id="password"
                  placeholder="password"
                  value={this.state.value}
                  onChange={this.handlePasswordChange}
                />
              </li>
              <li>
                <input
                  id="first name"
                  placeholder="first name"
                  value={this.state.value}
                  onChange={this.handleFirstNameChange}
                />
              </li>
              <li>
                <input
                  id="last name"
                  placeholder="last name"
                  value={this.state.value}
                  onChange={this.handleLastNameChange}
                />
              </li>
              <li>
                <input
                  id="display name"
                  placeholder="username"
                  value={this.state.value}
                  onChange={this.handleDisplayNameChange}
                />
              </li>
              <li>
                <input
                  id="avatar"
                  placeholder="avatar url"
                  value={this.state.value}
                  onChange={this.handleAvatarChange}
                />
              </li>
            </ul>
            <button value={this.state} onClick={this.handleSubmit}>
              Submit
            </button>
          </form>
        </Modal>
      </div>
    );
  }
}

export default Register;
