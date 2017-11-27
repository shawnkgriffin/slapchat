import React from "react";

const textStyle = {
  color: "black"
};
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  handleEmailChange(event) {
    let value = event.target.value.trim();
    this.setState({ email: value });
  }

  handlePasswordChange(event) {
    let value = event.target.value.trim();
    this.setState({ password: value });
  }

  handleSubmit(event) {
    this.onLogin();
  }

  onLogin() {
    let newLogin = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.sendNewLogin(newLogin);
  }

  render() {
    return (
      <div className="fixed-container login-page-container login-background">
        <section className="login-form-container">
          <h2>SlapChat</h2>
          <form className="sign-in-form">
            <input
              className="login-form-input form-control"
              style={textStyle}
              id="email"
              type="text"
              placeholder="email@address.com"
              value={this.state.value}
              onChange={this.handleEmailChange}
            />
            <input
              className="login-form-input form-control"
              style={textStyle}
              id="password"
              type="password"
              placeholder="password"
              value={this.state.value}
              onChange={this.handlePasswordChange}
            />
            <button
              className="btn btn-lg btn-primary btn-block"
              name="Submit"
              value="Login"
              type="Submit"
              onClick={this.handleSubmit}
            >
              Login
            </button>
          </form>
        </section>
      </div>
    );
  }
}

// ReactDOM.render(<Login />);
export default Login;
