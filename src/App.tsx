import "./App.css";
import Home from "./components/home";
import { CalenderProvider } from "./context/calender-context";
import { EventsProvider } from "./context/events-context";

function App() {
  return (
    <CalenderProvider>
      <EventsProvider>
        <Home />
      </EventsProvider>
    </CalenderProvider>
  );
}

export default App;
