import React from "react";
import "./SignUpStyle.scss";
import FormInput from "../FormInput/FormInput";
import CustomButton from "../CustomButton/CustomButton";
import { firebaseAuth, addUserToFirestore } from "../../firebase/firebaseUtil";
class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: "",
      email: "",
      password: "",
      comfirmPassword: "",
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { displayName, email, password, comfirmPassword } = this.state;
    let addtionalData = { displayName };
    //checking if password and comfirm password matches
    if (password === comfirmPassword) {
      try {
        //create new account with Email and password
        console.log("creating an new account!");
        const { user } = await firebaseAuth.createUserWithEmailAndPassword(
          email,
          password
        );
        await addUserToFirestore(user, addtionalData);
      } catch (error) {
        console.log("user creating failure" + error);
      }
      //clear input value
      this.setState({
        displayName: "",
        email: "",
        password: "",
        comfirmPassword: "",
      });
    } else {
      alert("comfirm password does not match, please check.");
    }
  };

  render() {
    const { displayName, email, password, comfirmPassword } = this.state;
    return (
      <div className="sign-up">
        <h1 className="title">I do not have an account</h1>
        <h2>Create an account with Email and password</h2>
        <form onSubmit={this.handleSubmit} className="sign-up-form">
          <FormInput
            name="displayName"
            handleChange={this.handleChange}
            label="Display Name"
            type="text"
            value={displayName}
            required
          ></FormInput>
          <FormInput
            name="email"
            handleChange={this.handleChange}
            label="Email"
            type="email"
            value={email}
            required
          ></FormInput>
          <FormInput
            name="password"
            handleChange={this.handleChange}
            label="password"
            type="password"
            value={password}
            required
          ></FormInput>
          <FormInput
            name="comfirmPassword"
            handleChange={this.handleChange}
            label="comfirmPassword"
            type="password"
            value={comfirmPassword}
            required
          ></FormInput>
          <CustomButton>SIGN UP</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;
