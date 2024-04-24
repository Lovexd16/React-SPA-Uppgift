import React, { useState } from "react";

interface BookingFormProps {
  selectedDate: Date;
  onClose: () => void;
}

// interface Booking {
//   time: string;
//   temperature: string;
// }

function BookingForm({ selectedDate, onClose }: BookingFormProps) {
  //State för att hålla koll på steg i bokningsprocessen, då jag valde att göra den steg för steg
  const [step, setStep] = useState(0);
  //State för kundens namn
  const [name, setName] = useState("");
  //State för bokningens valda tid
  const [time, setTime] = useState("");
  //State för bokningens valda temperatur
  const [temperature, setTemperature] = useState("");
  //State för att visa/dölja bekräftelse
  const [showConfirmation, setShowConfirmation] = useState(false);

  //Funktion för ändring av namn
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  //Funktion för ändring av tid val
  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  //Funktion för ändring av temperatur val
  const handleTemperatureChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTemperature(event.target.value);
  };

  //Funktion för nästa knappen i formuläret
  const handleNextStep = () => {
    //Då required inte fungerade för namnet så gjorde jag en if sats som leder till en alert om man lämnar namn-fältet tomt och försöker på vidare
    if (name.trim() === "") {
      alert("Du måste ange ett namn");
      return;
    }
    //Går vidare till nästa steg av bokningen om ett namn angets
    setStep((prevStep) => prevStep + 1);
  };

  //Funktion för tillbaka knappen i formuläret
  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  //Funktion för att stänga både bokningsbekräftelse och formulär när en bokning har gjorts
  const handleConfirmationClosing = () => {
    setShowConfirmation(false);
    onClose();
  };

  //Funktion för bokning
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // //Hämtar eventuella bokningar som redan har skett för ett valt datum
    // const existingBookingsRes = await fetch(
    //   `http://localhost:3000/bookings?date=${selectedDate.toISOString()}`
    // );
    // const existingBookings: Booking[] = await existingBookingsRes.json();

    // //Kontrollerar om en tid & temperatur redan är bokade
    // const isBookingExisting = existingBookings.some(
    //   (booking) => booking.time === time && booking.temperature === temperature
    // );

    // //Om en bokning för den tiden & temperaturen redan finns sparad i db.json får man en alert om att det är upptagen då
    // if (isBookingExisting) {
    //   alert(
    //     "Den valda tiden och temperaturen är upptagen. Vänligen välj annan tid eller temperatur."
    //   );
    //   return;
    // }

    //Skapar datan som skickas till servern när en bokning är gjord
    const bookingData = {
      date: selectedDate,
      time: time,
      temperature: temperature,
      name: name,
    };

    await fetch("http://localhost:8080/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    setShowConfirmation(true);
  };

  //   //Skickar datan till db.json och sparar den där
  //   await fetch("http://localhost:3000/bookings", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(bookingData),
  //   });

  //   //Bekräftelse-fönstret visas
  //   setShowConfirmation(true);
  // };

  //Hela bokningsformuläret. Step börjar på 0 och räknar uppåt vid varje "nästa"-klick, nedåt vid "tillbaka"-klick. Varje step innehåller ett val
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

      {/*Visa bekräftelsefönstret. Här ser man alla sina val*/}
      {showConfirmation && (
        <div className="confirmationPopup">
          <div className="popupContent">
            <h3>
              <span>Din bokning är bekräftad:</span>
            </h3>
            <p>
              <span>Namn:</span> {name}
            </p>
            <p>
              <span>Datum:</span> {selectedDate.toDateString()}
            </p>
            <p>
              <span>Tid:</span> {time}
            </p>
            <p>
              <span>Temperatur:</span> {temperature}
            </p>
            <button onClick={handleConfirmationClosing}>Stäng</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingForm;
