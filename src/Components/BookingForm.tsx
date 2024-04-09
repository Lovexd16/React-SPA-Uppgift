import React, { useState } from "react";

interface BookingFormPopupProps {
  selectedDate: Date;
  onClose: () => void;
}

function BookingFormPopup({ selectedDate, onClose }: BookingFormPopupProps) {
  const [time, setTime] = useState("");
  const [temperature, setTemperature] = useState("");
  const [name, setName] = useState("");

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  const handleTemperatureChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTemperature(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Bokning:", {
      date: selectedDate,
      time: time,
      temperature: temperature,
      name: name,
    });
    setTime("");
    setTemperature("");
    setName("");
    onClose();
  };

  return (
    <div className="bookingFormPopup">
      <p className="pageText">Valt datum: {selectedDate.toDateString()}</p>
      <form className="bookingForm" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Skriv ditt namn"
          name="name"
          value={name}
          onChange={handleNameChange}
          required
        ></input>
        <div>
          <p className="bookingText">Vilken tid vill du komma?</p>
          <input
            type="radio"
            id="morning"
            name="time"
            value="morning"
            checked={time === "morning"}
            onChange={handleTimeChange}
            required
          ></input>
          <label htmlFor="morning">Förmiddag</label>

          <input
            type="radio"
            id="afternoon"
            name="time"
            value="afternoon"
            checked={time === "afternoon"}
            onChange={handleTimeChange}
          ></input>
          <label htmlFor="afternoon">Eftermiddag</label>

          <input
            type="radio"
            id="evening"
            name="time"
            value="evening"
            checked={time === "evening"}
            onChange={handleTimeChange}
            required
          ></input>
          <label htmlFor="evening">Kväll</label>
        </div>

        <div>
          <p className="bookingText">Vilken temperatur vill du ha?</p>
          <input
            type="radio"
            id="hot"
            name="temperature"
            value="hot"
            checked={temperature === "hot"}
            onChange={handleTemperatureChange}
            required
          ></input>
          <label htmlFor="hot">Varmt</label>

          <input
            type="radio"
            id="cold"
            name="temperature"
            value="cold"
            checked={temperature === "cold"}
            onChange={handleTemperatureChange}
            required
          ></input>
          <label htmlFor="cold">Kallt</label>
        </div>
        <button type="submit">Boka</button>
      </form>
    </div>
  );
}

export default BookingFormPopup;
