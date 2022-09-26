import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changeUser } from "../store/slices/user.slice";
import { useDispatch } from "react-redux";
import image from "../img/charmanderGif.gif";
import img2 from "../img/PokedexLogo.png";

const UserInput = () => {
  const [userName, setUserName] = useState("");

  //implement of useNavigate: When the user input the name and click on the button, then will be redirected to the pokedex main page

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getName = () => {
    dispatch(changeUser(userName));
    navigate("/pokedex");
  };

  return (
    <div className="user-input">
      <h1>Hello trainer!</h1>
      <div className="banner">
        <img
          src={image}
          /* src="https://www.kindpng.com/picc/m/173-1737326_professor-oak-png-transparent-png.png" */
          alt="trainer"
        />
      </div>
      <p>Now, what did you say your name was?</p>
      <form action="" className="send-info">
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              getName();
            }
          }}
        />
        <button onClick={getName}>
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </form>
      <img src={img2} alt="" />
    </div>
  );
};

export default UserInput;
