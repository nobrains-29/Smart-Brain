import React, { useState } from "react";
import Particles from "react-particles-js";
import Navigation from "./Components/Navigation/Navigation";
import Signin from "./Components/Signin/Signin";
import Register from "./Components/Register/Register";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import Rank from "./Components/Rank/Rank";
import Footer from "./Components/Footer/Footer";
import "./App.css";

const particleOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 1000,
      },
    },
  },
};

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [route, setRoute] = useState("signin");
  const [input, setInput] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [box, setBox] = useState({});
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: "",
    joined: "",
  });

  const calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  const displayFaceBox = (box) => {
    setBox(box);
  };

  const loadUser = (data) => {
    setUser({
      id: data._id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onButtonSubmit = () => {
    setImgURL(input);
    fetch("http://localhost:3000/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: imgURL,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("http://localhost:3000/image", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user: user,
            }),
          })
            .then((response) => response.json())
            .then((ent) => {
              if (ent) {
                user.entries++;
              }
            })
            .catch(console.log);
        }
        displayFaceBox(calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));
  };

  const onRouteChange = (newRoute) => {
    if (newRoute === "signout") {
      setIsSignedIn(false);
      setImgURL("");
    } else if (newRoute === "home") {
      setIsSignedIn(true);
    }
    setRoute(newRoute);
  };

  return (
    <div className="App">
      <Particles className="particles" params={particleOptions} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {route === "home" ? (
        <div>
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition box={box} imgURL={imgURL} />
        </div>
      ) : route === "signin" ? (
        <div>
          <Signin onRouteChange={onRouteChange} loadUser={loadUser} />
          <Footer />
        </div>
      ) : (
        <div>
          <Register onRouteChange={onRouteChange} loadUser={loadUser} />
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
