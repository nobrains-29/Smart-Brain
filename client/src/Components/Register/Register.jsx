import React, { useState } from "react";

const Register = (props) => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setInput((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const onSubmitSignIn = () => {
    fetch("http://localhost:3000/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: input.name,
        email: input.email,
        password: input.password,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user._id) {
          props.loadUser(user);
          props.onRouteChange("home");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <article className="br3 ba b--black-10 mv4 w-90 w-50-m w-30-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <form onSubmit={(e) => e.preventDefault()} className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">
                Name*
              </label>
              <input
                onChange={onInputChange}
                className="pa2 b--black-60 input-reset ba bg-transparent hover-bg-black hover-white w-90"
                type="name"
                name="name"
                id="name"
                value={input.name}
                required
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email*
              </label>
              <input
                onChange={onInputChange}
                className="pa2 b--black-60 input-reset ba bg-transparent hover-bg-black hover-white w-90"
                type="email"
                name="email"
                id="email-address"
                value={input.email}
                required
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password*
              </label>
              <input
                onChange={onInputChange}
                className="b pa2 b--black-60 input-reset ba bg-transparent hover-bg-black hover-white w-90"
                type="password"
                name="password"
                id="password"
                value={input.password}
                required
              />
            </div>
          </fieldset>
          <div className="">
            <input
              onClick={onSubmitSignIn}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign Up"
            />
          </div>
        </form>
      </main>
    </article>
  );
};

export default Register;
