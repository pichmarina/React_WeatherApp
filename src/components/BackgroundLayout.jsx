import React, { useState, useEffect } from "react";
import { useStateContext } from "../Context";

import Clear from "../assets/images/Clear.jpg";
import Cloudy from "../assets/images/Cloudy.jpg";
import Fog from "../assets/images/Fog.png";
import Rainy from "../assets/images/Rainy.jpg";
import Snow from "../assets/images/Snow.jpg";
import Stormy from "../assets/images/Stormy.jpg";
import Sunny from "../assets/images/Sunny.jpg";

const BackgroundLayout = () => {
  const { weather } = useStateContext();
  const [image, setImage] = useState(Clear);

  useEffect(() => {
    if (weather.condition) {
      let imageString = weather.condition.text;

      if (imageString.toLowerCase().includes("clear")) {
        setImage(Clear);
      } else if (imageString.toLowerCase().includes("cloud")) {
        setImage(Cloudy);
      } else if (imageString.toLowerCase().includes("fog")) {
        setImage(Fog);
      } else if (
        imageString.toLowerCase().includes("rain") ||
        imageString.toLowerCase().includes("shower")
      ) {
        setImage(Rainy);
      } else if (imageString.toLowerCase().includes("snow")) {
        setImage(Snow);
      } else if (imageString.toLowerCase().includes("sun")) {
        setImage(Sunny);
      } else if (
        imageString.toLowerCase().includes("storm") ||
        imageString.toLowerCase().includes("thunder")
      ) {
        setImage(Stormy);
      }
    }
  }, [weather]);

  return (
    <img
      src={image}
      alt="weather_image"
      className="h-screen w-full fixed left-0 top-0 -z-[10] brightness-50"
    />
  );
};

export default BackgroundLayout;
