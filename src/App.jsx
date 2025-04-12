import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Hero } from "./components/dashboard/Hero";
import { Navbar } from "./components/common/Navbar";

import { LoadScript } from "@react-google-maps/api";
const GOOGLE_MAPS_API_KEY = "AIzaSyD71vUXnxhniEodZmfGxfbEIiDTexyKCjc";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
    <Navbar />
    <Hero />
    </LoadScript>
    </>
  );
}

export default App;
