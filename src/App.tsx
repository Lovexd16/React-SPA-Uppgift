import { useEffect, useState } from "react";
import "./App.css";
import Start from "./Components/Pages/Start";
import Booking from "./Components/Pages/Booking";
import FoodDrinks from "./Components/Pages/FoodDrinks";
import Contact from "./Components/Pages/Contact";
import NavBar from "./Components/NavBar";

function App() {
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
        pageUrl = "start";
      }
    }
  }, [page]);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Spa</h1>
      <NavBar setPage={setPage} />

      {{
        start: <Start />,
        booking: <Booking />,
        fooddrinks: <FoodDrinks />,
        contact: <Contact />,
      }[page] || <Start />}
    </>
  );
}

export default App;
