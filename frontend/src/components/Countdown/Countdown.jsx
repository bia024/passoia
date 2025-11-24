// import { useState, useEffect } from "react";
// import "./Countdown.scss";

// export default function Countdown({ targetDate }) {
//   const calculateTimeLeft = () => {
//     const difference = +new Date(targetDate) - +new Date();
//     let timeLeft = {};

//     if (difference > 0) {
//       timeLeft = {
//         dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
//         horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
//         minutos: Math.floor((difference / 1000 / 60) % 60),
//         segundos: Math.floor((difference / 1000) % 60),
//       };
//     }
//     return timeLeft;
//   };

//   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setTimeLeft(calculateTimeLeft());
//     }, 1000);
//     return () => clearTimeout(timer);
//   });

//   return (
//     <div className="countdown">
//       {Object.entries(timeLeft).map(([interval, value]) => (
//         <div key={interval} className={`countdown-item ${interval}`}>
//           <span>{value}</span>
//           <span>{interval}</span>
//         </div>
//       ))}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import "./Countdown.scss";

export default function Countdown({
  targetDate,
  endMessage = "Promoção encerrada!",
}) {
  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = +new Date(targetDate) - +now;

    if (difference <= 0) return null;

    return {
      dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
      horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutos: Math.floor((difference / 1000 / 60) % 60),
      segundos: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return (
      <div className="countdown-ended">
        <span>📢 {endMessage}</span>
      </div>
    );
  }

  return (
    <div className="countdown">
      {Object.entries(timeLeft).map(([interval, value]) => (
        <div key={interval} className={`countdown-item ${interval}`}>
          <span className="value">{String(value).padStart(2, "0")}</span>
          <span className="label">{interval}</span>
        </div>
      ))}
    </div>
  );
}
