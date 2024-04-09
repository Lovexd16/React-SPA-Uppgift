import Calendar from "../Calendar";

function Booking() {
  return (
    <>
      <div className="pageContent">
        <h2>Boka tid!</h2>
      </div>
      <form>
        <input type="text" placeholder="Skriv ditt namn"></input>
        <button>Boka</button>
      </form>

      <Calendar />
    </>
  );
}

export default Booking;
