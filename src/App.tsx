//Importerar in css & components
import { useEffect, useState } from "react";
import "./App.css";
import Start from "./Components/Pages/Start";
import Booking from "./Components/Pages/Booking";
import FoodDrinks from "./Components/Pages/FoodDrinks";
import Contact from "./Components/Pages/Contact";
import NavBar from "./Components/NavBar";

function App() {
  //Variabel för att ha koll på vilken sida som visas
  const [page, setPage] = useState<string>("");

  useEffect(() => {
    let pageUrl = page;

    if (!pageUrl) {
      const queryParams = new URLSearchParams(window.location.search);
      const getUrl = queryParams.get("page");

      if (getUrl) {
        pageUrl = getUrl;
        setPage(getUrl);
      } else {
        //Om sidan man försöker komma åt inte finns skickas man till start-sidan
        pageUrl = "start";
      }
    }

    //Sätter URLen för sidan man är på
    window.history.pushState(null, "", "?page=" + pageUrl);
  }, [page]);

  return (
    <>
      <h1>Divine Relaxation Spa</h1>
      {/*visa navigeringskomponenten NavBar*/}
      <NavBar setPage={setPage} />

      {{
        //Sätter sidan till rätt sida med en switch
        start: <Start />,
        booking: <Booking />,
        fooddrinks: <FoodDrinks />,
        contact: <Contact />,
      }[page] || <Start />}
    </>
  );
}

export default App;
