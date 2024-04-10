import React, { useState } from "react";

interface BookingFormProps {
  selectedDate: Date;
  onClose: () => void;
}

function BookingForm({ selectedDate }: BookingFormProps) {
  const [time, setTime] = useState("");
  const [temperature, setTemperature] = useState("");
  const [name, setName] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const bookingData = {
      date: selectedDate,
      time: time,
      temperature: temperature,
      name: name,
    };

    const res = await fetch("http://localhost:3000/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    if (!res.ok) {
      throw new Error("Bokning misslyckades");
    }

    console.log("Bokning lyckades");
    setShowConfirmation(true);
  };

  return (
    <div>
      <form className="bookingForm" onSubmit={handleSubmit}>
        <p className="bookingText">Valt datum: {selectedDate.toDateString()}</p>
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
            value="Förmiddag"
            checked={time === "Förmiddag"}
            onChange={handleTimeChange}
            required
          ></input>
          <label>Förmiddag</label>

          <input
            type="radio"
            id="afternoon"
            name="time"
            value="Eftermiddag"
            checked={time === "Eftermiddag"}
            onChange={handleTimeChange}
          ></input>
          <label>Eftermiddag</label>

          <input
            type="radio"
            id="evening"
            name="time"
            value="Kväll"
            checked={time === "Kväll"}
            onChange={handleTimeChange}
            required
          ></input>
          <label>Kväll</label>
        </div>

        <div>
          <p className="bookingText">Vilken temperatur vill du ha?</p>
          <input
            type="radio"
            id="hot"
            name="temperature"
            value="Varmt"
            checked={temperature === "Varmt"}
            onChange={handleTemperatureChange}
            required
          ></input>
          <label>Varmt</label>

          <input
            type="radio"
            id="cold"
            name="temperature"
            value="Kallt"
            checked={temperature === "Kallt"}
            onChange={handleTemperatureChange}
            required
          ></input>
          <label>Kallt</label>
        </div>
        <button type="submit">Boka</button>
      </form>

      {showConfirmation && (
        <div className="confirmationPopup">
          <div className="popupContent">
            <p>Din bokning är bekräftad:</p>
            <p>Namn: {name}</p>
            <p>Datum: {selectedDate.toDateString()}</p>
            <p>Tid: {time}</p>
            <p>Temperatur: {temperature}</p>
            <button onClick={() => setShowConfirmation(false)}>Stäng</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingForm;
