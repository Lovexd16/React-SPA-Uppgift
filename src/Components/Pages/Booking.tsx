import { useState } from "react";
import Calendar from "../Calendar";
import BookingForm from "../BookingForm";

function Booking() {
  //State för att hålla koll på klickat datum
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  //State för att visa/dölja bokningsformuläret
  const [showForm, setShowForm] = useState(false);

  //Funktion för hantering av valt datum
  const handleDateSelection = (date: Date) => {
    setSelectedDate(date);
    //Visa bokningsformuläret när ett datum valts
    setShowForm(true);
  };

  //En funktion för att stänga bokningsformuläret, används via en knapp när bokning är gjort och man får en bekräftelse
  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div>
      <div>
        <h2>Boka tid!</h2>
        <p className="pageText">Vi har öppet alla dagar förutom måndagar!</p>
      </div>

      {/*När ett datum valts, och showForm = true, så visas BookingForm*/}
      {selectedDate && showForm && (
        <div>
          <BookingForm selectedDate={selectedDate} onClose={handleCloseForm} />
        </div>
      )}
      <Calendar onDateSelection={handleDateSelection} />
    </div>
  );
}

export default Booking;
