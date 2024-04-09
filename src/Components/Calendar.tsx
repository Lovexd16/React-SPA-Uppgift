import React from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function Calendar() {
  return (
    <div>
      <ReactCalendar
        minDate={new Date()}
        className="CALENDAR"
        view="month"
        onClickDay={(date) => console.log(date)}
      />
    </div>
  );
}

export default Calendar;
