import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface CalendarProps {
  onDateSelection: (date: Date) => void;
}

function Calendar({ onDateSelection }: CalendarProps) {
  const monday = (date: Date): boolean => {
    return date.getDay() === 1;
  };

  const tileDisabled = ({
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
        minDate={new Date()}
        className="CALENDAR"
        view="month"
        onClickDay={onDateSelection}
        tileDisabled={tileDisabled}
      />
    </div>
  );
}

export default Calendar;
