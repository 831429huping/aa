import React from "react";
import FormInput from "../FormInput/FormInput";
import CustomButton from "../CustomButton/CustomButton";
import "./SignInStyle.scss";
import { firebaseAuth, provider } from "../../firebase/firebaseUtil";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ email: "", password: "" });
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  handleClick = (event) => {
    firebaseAuth.signInWithPopup(provider).catch(function (error) {
      console.log(error);
    });
  };

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            handleChange={this.handleChange}
            value={this.state.email}
            label="email"
            required
          />
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
            label="password"
            required
          />
          <div className="buttons">
            <CustomButton type="submit">Sign in</CustomButton>
            <CustomButton onClick={this.handleClick} isGoogleSignIn={true}>
              Sign In With Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
