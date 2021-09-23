import React from "react";
import Logo from "../Logo/Logo";

const Navigation = (props) => {
  if (props.isSignedIn) {
    return (
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Logo />
        <p
          onClick={() => props.onRouteChange("signout")}
          className="f3 link dim black pa3 pointer"
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Logo />
        <div style={{ display: "flex" }}>
          <p
            onClick={() => props.onRouteChange("signin")}
            className="f3 link dim black pa3 pointer"
          >
            Sign In
          </p>
          <p
            onClick={() => props.onRouteChange("register")}
            className="f3 link dim black pa3 pointer"
          >
            Register
          </p>
        </div>
      </nav>
    );
  }
};

export default Navigation;
