//Importerar in ReactCalendar, samt en standard css för kalendern
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface CalendarProps {
  onDateSelection: (date: Date) => void;
}

function Calendar({ onDateSelection }: CalendarProps) {
  //Kolla om dagen är Måndag(1)
  const monday = (date: Date): boolean => {
    return date.getDay() === 1;
  };

  //Funktion för att stänga på måndagar
  const closeMondays = ({
    date,
    view,
  }: {
    date: Date;
    view: string;
  }): boolean => {
    if (view === "month") {
      return monday(date);
    }
    return false;
  };

  return (
    <div>
      <ReactCalendar
        //Sätter minsta datumet till dagens datum för att förhindra bokningar i det förflutna
        minDate={new Date()}
        //Visa kalendern i månad
        view="month"
        //Använda onDateSelection-metoden när en dag klickas
        onClickDay={onDateSelection}
        //Använda closeMondays funktionen för att göra måndagar oklickbara
        tileDisabled={closeMondays}
      />
    </div>
  );
}

export default Calendar;
