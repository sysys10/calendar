import "./App.css";
import React, { useState, useEffect } from "react";
import data from "./data/datafile"; // data를 별도의 파일로 분리했다고 가정
import { FaClock, FaInfoCircle, FaCalendarAlt } from "react-icons/fa";

function App() {
  const [date, setDate] = useState(new Date());
  const [selectDate, setSelectDate] = useState([]);
  useEffect(() => {
    fetchMonth();
  }, [date]);
  function fetchMonth() {
    const filtered = data.filter((v, i) => {
      return (
        (new Date(v.startDate).getMonth() | new Date(v.endDate).getMonth()) ===
        date.getMonth()
      );
    });

    setSelectDate(filtered);
  }
  const daysInMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  ).getDay();

  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  const getEventsForDate = (day) => {
    const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
    return data.filter((event) => {
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate);
      return currentDate >= startDate && currentDate <= endDate;
    });
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-cyan-100 to-blue-200 flex justify-center items-center p-8">
      <div className="max-w-6xl w-full flex gap-8">
        <div className="flex-grow w-full bg-white rounded-3xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={handlePrevMonth}
              className="bg-cyan-500 text-white px-4 py-2 rounded-full transition-colors duration-300 hover:bg-cyan-600"
            >
              이전 달
            </button>
            <h2 className="text-3xl font-bold text-cyan-800">
              {date.getFullYear()}년 {date.getMonth() + 1}월
            </h2>
            <button
              onClick={handleNextMonth}
              className="bg-cyan-500 text-white px-4 py-2 rounded-full transition-colors duration-300 hover:bg-cyan-600"
            >
              다음 달
            </button>
          </div>
          <div className="grid grid-cols-7 gap-4">
            {weekdays.map((day) => (
              <div key={day} className="text-center font-bold text-cyan-700">
                {day}
              </div>
            ))}
            {Array(firstDayOfMonth)
              .fill(null)
              .map((_, index) => (
                <div key={`empty-${index}`} className="h-24"></div>
              ))}
            {days.map((day) => (
              <div
                key={day}
                className="border border-cyan-200 rounded-lg p-2 h-24 overflow-y-auto transition-all duration-300 hover:shadow-md"
              >
                <div className="font-bold text-cyan-800">{day}</div>
                {getEventsForDate(day).map((event) => (
                  <div
                    key={event.id}
                    className="text-xs bg-cyan-100 p-1 mb-1 rounded text-cyan-700"
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="w-[700px] bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6">
            <h3 className="text-2xl font-bold text-white mb-2">일정</h3>
            <p className="text-cyan-100">
              {date.getFullYear()}년 {date.getMonth() + 1}월
            </p>
          </div>
          <div className="p-6 max-h-[600px] overflow-y-auto">
            {selectDate.map((v, i) => (
              <div
                key={v.id}
                className="mb-6 p-4 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg border-l-4 border-cyan-500"
              >
                <div className="font-bold text-lg text-cyan-800 mb-3">
                  {v.title}
                </div>
                <div className="flex items-center text-cyan-600 mb-2">
                  <FaCalendarAlt className="mr-2" />
                  <span>
                    {new Date(v.startDate).toLocaleDateString()} ~{" "}
                    {new Date(v.endDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center text-cyan-600 mb-3">
                  <FaClock className="mr-2" />
                  <span>{v.time}</span>
                </div>
                <div className="flex items-start text-gray-600 mt-2">
                  <FaInfoCircle className="mr-2 mt-1 flex-shrink-0" />
                  <p>{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
