import { useState } from "react";
import Calendar from "../Calendar";

function Booking() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateSelection = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <div className="pageContent">
        <h2>Boka tid!</h2>
        {selectedDate && <p>Valt datum: {selectedDate.toDateString()}</p>}
      </div>
      <form>
        <input type="text" placeholder="Skriv ditt namn"></input>
        <button>Boka</button>
      </form>

      <Calendar onDateSelection={handleDateSelection} />
    </>
  );
}

export default Booking;
