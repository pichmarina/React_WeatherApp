import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const StateContext = createContext();

export const StateContentProvider = ({ children }) => {
  const [weather, setWeather] = useState({});
  const [values, setValues] = useState([]);
  const [place, setPlace] = useState("Phnom Penh");
  const [thisLocation, setLocation] = useState("");

  // Fetch API
  async function fetchWeather(place) {
    const options = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/current.json",
      params: {
        q: place,
      },
      headers: {
        "x-RapidApi-Key": import.meta.env.VITE_API_KEY,
        "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log("response data", response.data);

      const thisData = response.data.current;
      setValues(thisData);
      setWeather(thisData);
      setLocation(response.data.location);
    } catch (error) {
      console.error(error);
      alert("This place does not exist");
    }
  }

  useEffect(() => {
    fetchWeather(place);
  }, [place]);

  useEffect(() => {
    console.log(values);
  }, [values]);

  return (
    <StateContext.Provider
      value={{
        weather,
        setPlace,
        values,
        thisLocation,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
