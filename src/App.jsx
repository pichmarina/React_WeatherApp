import { useState, useMemo } from "react";
import "./App.css";
import search from "./assets/icons/search.svg";
import { useStateContext } from "./Context";
import BackgroundLayout from "./components/BackgroundLayout";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [input, setInput] = useState("");
  const { weather, thisLocation, values, setPlace } = useStateContext();

  const valuesArray = useMemo(() => {
    return Array.isArray(values) ? [values] : [];
  }, [values]);

  const submitCity = () => {
    setPlace(input);
    setInput("");
  };

  return (
    <div className="w-full h-screen text-white px-8">
      <nav className="w-full p-3 flex justify-between items-center">
        <h1 className="font-bold tracking-wode text-3xl">Weather App</h1>
        <div className="bg-white w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2">
          <img src={search} alt="search" />
          <input
            onKeyUpCapture={(e) => {
              if (e.key === "Enter") {
                submitCity();
              }
            }}
            type="text"
            placeholder="Search city"
            className="focus:outline-none w-full text-[#212121] text-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </nav>

      <BackgroundLayout />
      <main className="w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center">
        <WeatherCard
          place={thisLocation}
          windspeed={weather.wind_kph}
          humidity={weather.humidity}
          temperature={weather.temp_c}
          heatIndex={weather.heatindex_c}
          iconString={weather.condition?.text}
          conditions={weather.condition?.text}
          feelsLike={weather.feelslike_c}
          UV={weather.uv}
          pressure={weather.pressure_in}
          gust={weather.gust_kph}
          dewPoint={weather.dewpoint_c}
        />
      </main>
    </div>
  );
}

export default App;
