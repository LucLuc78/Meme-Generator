import React, { useState, useEffect } from "react";
import "../Styles.css";

export default function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg"
  });
  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url
    }));
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value
    }));
  }
  return (
    <main>
      <div className="form">
        <input
          className="form-input"
          type="text"
          id="top-line"
          name="topText"
          onChange={handleChange}
          placeholder="Text Top"
          value={meme.topText}
        />
        <input
          className="form-input"
          type="text"
          id="btm-line"
          name="bottomText"
          onChange={handleChange}
          placeholder="Text Btm"
          value={meme.bottomText}
        />

        <button onClick={getMemeImage} className="form-button">
          Get New Image
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} className="meme-image" />
        <h2 className="meme-text top">{meme.topText}</h2>
        <h2 className="meme-text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
