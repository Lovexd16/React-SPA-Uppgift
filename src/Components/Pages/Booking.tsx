import { useState } from "react";
import Calendar from "../Calendar";
import BookingForm from "../BookingForm";

function Booking() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleDateSelection = (date: Date) => {
    setSelectedDate(date);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <>
      <div className="pageContent"></div>

      <h2>Boka tid!</h2>
      <Calendar onDateSelection={handleDateSelection} />

      {selectedDate && showForm && (
        <BookingForm selectedDate={selectedDate} onClose={handleCloseForm} />
      )}
    </>
  );
}

export default Booking;
