// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import Home from "./components/home";
import { CalenderProvider } from "./context/calender-context";

function App() {
  return (
    <CalenderProvider>
      <Home />
    </CalenderProvider>
  );
}

export default App;
