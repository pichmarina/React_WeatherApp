import React, { useState, useEffect } from "react";
import { useDate } from "../Utils/useDate";
import sun from "../assets/icons/sun.png";
import cloud from "../assets/icons/cloud.png";
import rain from "../assets/icons/rain.png";
import storm from "../assets/icons/storm.png";
import fog from "../assets/icons/fog.png";
import snow from "../assets/icons/snow.png";
import windy from "../assets/icons/windy.png";
import "../index.css";

const WeatherCard = ({
  temperature,
  windspeed,
  humidity,
  place,
  heatIndex,
  iconString,
  conditions,
  feelsLike,
  UV,
  pressure,
  gust,
  dewPoint,
}) => {
  const [icon, setIcon] = useState(sun);

  function getTime(date) {
    date = new Date(date);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;
    return hours + ":" + minutesStr + " " + ampm;
  }

  useEffect(() => {
    if (iconString) {
      const lowerIconString = iconString.toLowerCase();

      if (lowerIconString.includes("cloud")) {
        if (temperature < 0) {
          setIcon(snow);
        } else if (temperature > 0 && temperature <= 35) {
          setIcon(cloud);
        } else if (temperature > 35) {
          setIcon(sun);
        }
      } else if (lowerIconString.includes("rain")) {
        if (temperature < 0) {
          setIcon(snow);
        } else {
          setIcon(rain);
        }
      } else if (lowerIconString.includes("mist")) {
        if (temperature < 0) {
          setIcon(snow);
        } else if (temperature > 35) {
          setIcon(sun);
        } else {
          setIcon(fog);
        }
      } else if (lowerIconString.includes("clear")) {
        if (temperature < 0) {
          setIcon(snow);
        } else if (temperature > 0 && temperature <= 35) {
          setIcon(cloud);
        } else if (temperature > 35) {
          setIcon(sun);
        }
      } else if (lowerIconString.includes("sun")) {
        if (temperature < 0) {
          setIcon(snow);
        } else if (temperature > 0 && temperature <= 35) {
          setIcon(cloud);
        } else {
          setIcon(sun);
        }
      } else if (lowerIconString.includes("thunder")) {
        setIcon(storm);
      } else if (lowerIconString.includes("fog")) {
        setIcon(fog);
      } else if (lowerIconString.includes("snow")) {
        setIcon(snow);
      } else if (lowerIconString.includes("windy")) {
        setIcon(windy);
      }
    }
  }, [iconString, temperature]);

  return (
    <div className="w-[22rem] min-w-[22rem] h-[38rem] glassCard p-4">
      <div className="flex w-full justify-center items-center gap-4 mt-10 mb-0">
        <img src={icon} alt="weather_icon" />
        <div className="p-2 font-bold gap-2 space-x-2 mb-0">
          <span className="font-bold text-5xl flex justify-center items-center">
            {temperature} &deg;C
          </span>
          <span className="font-normal font-style: italic flex justify-end items-center gap-2 space-x-2">
            Feels like <span className="font-normal">{feelsLike}&deg;C</span>
          </span>
        </div>
      </div>

      <div className="font-bold text-center text-2xl mt-4">{place.name}</div>

      <div className="grid grid-cols-2 gap-0 items-center w-full mt-3">
        <div className="flex items-center justify-center p-4 gap-2 space-x-2">
          <span className="font-bold">Pressure</span>
          <span className="font-normal">{pressure}psi</span>
        </div>
        <div className="items-center flex justify-center p-4 gap-2 space-x-2">
          <span className="font-bold">UV</span>
          <span className="font-normal">{UV}mW/cm&sup2;</span>
        </div>
        <div className="col-span-1 flex items-center justify-center p-4 ">
          <span className="text-center">
            {new Date(place.localtime).toDateString()}
          </span>
        </div>
        <div className="col-span-1 flex items-center justify-center p-4 ">
          <span className="text-center">{getTime(place.localtime)}</span>
        </div>
      </div>

      <div className="w-full flex justify-between items-center mt-4 gap-4">
        <div className="flex-1 text-center p-2 font-bold bg-blue-600 shadow rounded-lg">
          WindSpeed
          <br />
          <span className="font-normal">{windspeed} km/h</span>
        </div>
        <div className="flex-1 text-center p-2 font-bold rounded-lg bg-green-600">
          Humidity
          <br />
          <span className="font-normal">{humidity} gm/m&#179;</span>
        </div>
      </div>
      <div className="w-full p-3 mt-4 flex justify-between items-center">
        <span className="font-semibold text-lg">Heat Index</span>
        <span className="text-lg">{heatIndex ? heatIndex : "N/A"}</span>
      </div>
      <hr className="bg-slate-600" />

      <div className="flex flex-col w-full items-center gap-4 ">
        <div className="w-full flex justify-center items-center text-xl font-semibold border-b-2 ">
          {conditions}
        </div>
        <div className="w-full flex flex-col ">
          <div className="flex p-2 font-normal">
            <span className="mr-2">Gust:</span>
            <span className="font-normal">{gust}km/h</span>
          </div>
          <div className="flex p-2 font-normal">
            <span className="mr-2">DewPoint:</span>
            <span className="font-normal">{dewPoint}&deg;C</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
