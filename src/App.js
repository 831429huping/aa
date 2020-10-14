import React from "react";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import ShopPage from "./pages/ShopPage/ShopPage";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import SignInAndSignUpPage from "./pages/SignInAndSignUpPage/SignInAndSignUpPage";
import { firebaseAuth, addUserToFirestore } from "./firebase/firebaseUtil";

class App extends React.Component {
  constructor() {
    super();

    this.state = { currentUser: null };
  }

  unsubscribeFromAuth = null;
  componentDidMount() {
    this.unsubscribeFromAuth = firebaseAuth.onAuthStateChanged(
      async (userAuth) => {
        console.log("+++onAuthStateChanged function+++");
        if (userAuth != null) {
          const userRef = await addUserToFirestore(userAuth);

          userRef.onSnapshot((snapshot) => {
            console.log("+++onSnapShot+++");

            this.setState(
              {
                currentUser: {
                  id: snapshot.id,
                  ...snapshot.data(),
                },
              },
              () => {
                console.log("after calling onSnapshot function :");
                console.log(this.state);
              }
            );
          });
        } else {
          //set the user as null
          this.setState({ currentUser: userAuth }, () => {
            console.log("Current User is Null");
          });
        }
      }
    );
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
