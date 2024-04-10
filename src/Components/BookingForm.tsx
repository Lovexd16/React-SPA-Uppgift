import React, { useState } from "react";

interface BookingFormProps {
  selectedDate: Date;
  onClose: () => void;
}

function BookingForm({ selectedDate, onClose }: BookingFormProps) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [temperature, setTemperature] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  const handleTemperatureChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTemperature(event.target.value);
  };

  const handleNextStep = () => {
    if (name.trim() === "") {
      alert("Du måste ange ett namn");
      return;
    }
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleConfirmationClosing = () => {
    setShowConfirmation(false);
    onClose();
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
      console.log("Bokning misslyckades");
    }

    console.log("Bokning lyckades");
    setShowConfirmation(true);
  };

  return (
    <div>
      <form className="bookingForm" onSubmit={handleSubmit}>
        {step === 0 && (
          <>
            <p className="bookingText">
              Valt datum: {selectedDate.toDateString()}
            </p>
            <input
              type="text"
              placeholder="Skriv ditt namn"
              name="name"
              value={name}
              onChange={handleNameChange}
              required
            />
            <button type="button" onClick={handleNextStep}>
              Nästa
            </button>
          </>
        )}

        {step === 1 && (
          <>
            <div>
              <p className="bookingText">Vilken tid vill du komma?</p>
              <button type="button" onClick={handlePreviousStep}>
                Tillbaka
              </button>
              <input
                type="radio"
                id="morning"
                name="time"
                value="Förmiddag"
                checked={time === "Förmiddag"}
                onChange={handleTimeChange}
                required
              ></input>
              <label className="bookingText">Förmiddag</label>

              <input
                type="radio"
                id="afternoon"
                name="time"
                value="Eftermiddag"
                checked={time === "Eftermiddag"}
                onChange={handleTimeChange}
              ></input>
              <label className="bookingText">Eftermiddag</label>

              <input
                type="radio"
                id="evening"
                name="time"
                value="Kväll"
                checked={time === "Kväll"}
                onChange={handleTimeChange}
                required
              ></input>
              <label className="bookingText">Kväll</label>

              <button type="button" onClick={handleNextStep}>
                Nästa
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <p className="bookingText">Vilken temperatur vill du ha?</p>
              <button type="button" onClick={handlePreviousStep}>
                Tillbaka
              </button>
              <input
                type="radio"
                id="hot"
                name="temperature"
                value="Varmt"
                checked={temperature === "Varmt"}
                onChange={handleTemperatureChange}
                required
              ></input>
              <label className="bookingText">Varmt</label>

              <input
                type="radio"
                id="cold"
                name="temperature"
                value="Kallt"
                checked={temperature === "Kallt"}
                onChange={handleTemperatureChange}
                required
              ></input>
              <label className="bookingText">Kallt</label>
              <button type="submit">Boka</button>
            </div>
          </>
        )}
      </form>

      {showConfirmation && (
        <div className="confirmationPopup">
          <div className="popupContent">
            <p>Din bokning är bekräftad:</p>
            <p>Namn: {name}</p>
            <p>Datum: {selectedDate.toDateString()}</p>
            <p>Tid: {time}</p>
            <p>Temperatur: {temperature}</p>
            <button onClick={handleConfirmationClosing}>Stäng</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingForm;
