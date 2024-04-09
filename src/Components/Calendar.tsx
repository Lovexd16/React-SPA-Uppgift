import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface CalendarProps {
  onDateSelection: (date: Date) => void;
}

function Calendar({ onDateSelection }: CalendarProps) {
  return (
    <div>
      <ReactCalendar
        minDate={new Date()}
        className="CALENDAR"
        view="month"
        onClickDay={onDateSelection}
      />
    </div>
  );
}

export default Calendar;
