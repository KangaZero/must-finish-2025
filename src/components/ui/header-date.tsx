"use client";
import "./header-date.css";
import { useState } from "react";

const HeaderDate = () => {
  const [isHovered, setIsHovered] = useState(false);
  const now = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = days[now.getDay()];
  const date = now.getDate();
  const month = months[now.getMonth()];

  return (
    <div
      className="link-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="fallback">
        {day} {month} {date}
      </div>

      <div className={`shape-wrapper ${isHovered ? "active" : ""}`}>
        <div className="shape cyan-fill jelly">
          <svg
            width="100%"
            height="35"
            viewBox="0 0 200 35"
            preserveAspectRatio="none"
          >
            <rect width="200" height="35" fill="#00FFFF" />
          </svg>
        </div>
        <div className="shape red-fill jelly">
          <svg
            width="100%"
            height="35"
            viewBox="0 0 200 35"
            preserveAspectRatio="none"
          >
            <rect width="200" height="35" fill="#FF0000" />
          </svg>
        </div>
      </div>

      <div className="img-wrapper">
        <div className={`p5DateBox ${isHovered ? "hover-active" : ""}`}>
          <div className="p5DateDay">
            <span className="p5Day">{day}</span>
            <span className="p5DateStar">O</span>
          </div>
          <div className="p5DateMonthDay">
            <span className="p5Month">{month}</span>
            <span className="p5DateMonthDaySeparator">/</span>
            <span className="p5Date">{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { HeaderDate };
