// DateHotelDropdown.js
import React, { useEffect } from "react";

function DateHotelDropdown({
  year,
  setYear,
  month,
  setMonth,
  hotel,
  setHotel,
  showYearDropdown,
  setShowYearDropdown,
  showMonthDropdown,
  setShowMonthDropdown,
  showHotelDropdown,
  setShowHotelDropdown,
}) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 12 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const hotels = [
    "호텔A",
    "호텔B",
    "호텔C",
    "호텔D",
    "호텔E",
    "호텔F",
    "호텔G",
    "호텔H",
    "호텔I",
  ];

  useEffect(() => {
    console.log("YEAR", year);
    console.log("MONTH", month);
    console.log("HOTEL", hotel);
  }, [year, month, hotel]);

  return (
    <div>
      <button onClick={() => setShowYearDropdown(!showYearDropdown)}>
        {year || "년도 선택"}
      </button>
      {showYearDropdown && (
        <div>
          {years.map((y) => {
            return (
              <button
                key={y}
                onClick={() => {
                  setYear(y);
                  setShowYearDropdown(false);
                  console.log(y);
                }}
              >
                {y}년
              </button>
            );
          })}
        </div>
      )}

      <button onClick={() => setShowMonthDropdown(!showMonthDropdown)}>
        {month ? `${month}월` : "월 선택"}
      </button>
      {showMonthDropdown && (
        <div>
          {months.map((m) => (
            <button
              key={m}
              onClick={() => {
                setMonth(m);
                setShowMonthDropdown(false);
                console.log(m);
              }}
            >
              {m}월
            </button>
          ))}
        </div>
      )}

      <button onClick={() => setShowHotelDropdown(!showHotelDropdown)}>
        {hotel || "호텔 선택"}
      </button>
      {showHotelDropdown && (
        <div>
          {hotels.map((h) => (
            <button
              key={h}
              onClick={() => {
                setHotel(h);
                setShowHotelDropdown(false);
                console.log(h);
              }}
            >
              {h}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default DateHotelDropdown;
