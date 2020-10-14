import React from "react";

import SignIn from "../../components/SignIn/SignIn";
import SignUp from "../../components/SignUp/SignUp";

import "./SignInAndSignUpStyle.scss";

const SignInAndSignUpPage = () => (
  <div className="sign-in-and-sign-up">
    <h1>Sign In</h1>
    <SignIn />
    <SignUp />
  </div>
);

export default SignInAndSignUpPage;
