import { format } from "date-fns";
import { useState, useEffect } from "react";

interface PrayerTime {
  name: string;
  time: string;
  isCurrent: boolean;
}

const prayerTimes: PrayerTime[] = [
  { name: "Fajr", time: "6:36", isCurrent: false },
  { name: "Zuhr", time: "12:15", isCurrent: false },
  { name: "Asr", time: "14:30", isCurrent: true },
  { name: "Maghrib", time: "16:18", isCurrent: false },
  { name: "Esha", time: "17:38", isCurrent: false },
];

const futurePrayerTimes: PrayerTime[] = [
  { name: "Fajr", time: "6:36", isCurrent: false },
  { name: "Zuhr", time: "12:15", isCurrent: false },
  { name: "Asr", time: "14:30", isCurrent: false },
  { name: "Maghrib", time: "16:18", isCurrent: false },
  { name: "Esha", time: "17:38", isCurrent: false },
];

const calculateTimeUntilMaghrib = (): string => {
  const now = new Date();
  const maghribTime = prayerTimes.find((prayer) => prayer.name === "Maghrib")?.time;

  if (!maghribTime) return "Time not available";

  const [hours, minutes] = maghribTime.split(":").map(Number);
  const maghrib = new Date();
  maghrib.setHours(hours, minutes, 0);

  const diff = maghrib.getTime() - now.getTime();
  
  if (diff <= 0) {
    const absDiff = Math.abs(diff);
    const hoursLeft = Math.floor(absDiff / (1000 * 60 * 60));
    const minutesLeft = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));
    const secondsLeft = Math.floor((absDiff % (1000 * 60)) / 1000);
    return `-${hoursLeft.toString().padStart(2, "0")}:${minutesLeft.toString().padStart(2, "0")}:${secondsLeft.toString().padStart(2, "0")}`;
  }

  const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
  const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secondsLeft = Math.floor((diff % (1000 * 60)) / 1000);

  return `${hoursLeft.toString().padStart(2, "0")}:${minutesLeft.toString().padStart(2, "0")}:${secondsLeft.toString().padStart(2, "0")}`;
};

const Home = () => {
  const [currentDate] = useState(new Date());
  const [timeUntilMaghrib, setTimeUntilMaghrib] = useState(calculateTimeUntilMaghrib);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeUntilMaghrib(calculateTimeUntilMaghrib());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-full bg-gray-50 overflow-y-auto">
      <div className="bg-mosque-primary text-white py-3 shadow-md">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-col items-center">
            <h1 className="text-base font-light inline-flex items-center gap-2">
              Maghrib will begin in
              <span className="bg-yellow-400 text-black px-3 py-1 rounded-lg font-mono text-base">
                {timeUntilMaghrib}
              </span>
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-4 pb-28">
        <div className="space-y-4">
          <div className="bg-white/95 backdrop-blur-lg shadow-sm border border-gray-100 rounded-lg">
            <div className="p-4">
              <h2 className="text-mosque-primary text-center text-sm font-medium mb-4">
                PRAYER TIMES TODAY
              </h2>
              <h3 className="text-xl font-bold text-center mb-1">
                {format(currentDate, "EEEE, d MMMM yyyy")}
              </h3>
              <p className="text-gray-600 text-sm text-center mb-6">
                28 Rabi'ul Awal, 1445 H
              </p>

              <div className="space-y-0">
                {prayerTimes.map((prayer, index) => (
                  <div key={prayer.name}>
                    <div
                      className={`flex justify-between items-center py-3 px-4 rounded-lg ${
                        prayer.isCurrent
                          ? "bg-green-50 text-mosque-primary"
                          : "text-gray-800"
                      }`}
                    >
                      <span className="text-lg">{prayer.name}</span>
                      <span className="text-lg">{prayer.time}</span>
                    </div>
                    {index < prayerTimes.length - 1 && (
                      <hr className="border-t border-gray-200" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-lg shadow-sm border border-gray-100 rounded-lg">
            <div className="p-4">
              <h2 className="text-mosque-primary text-center text-sm font-medium mb-4">
                TOMORROW'S PRAYER TIMES
              </h2>
              <h3 className="text-xl font-bold text-center mb-1">
                Monday, 6 January 2025
              </h3>
              <p className="text-gray-600 text-sm text-center mb-6">
                26 Rabi'ul Awal, 1445 H
              </p>

              <div className="space-y-0">
                {futurePrayerTimes.map((prayer, index) => (
                  <div key={prayer.name}>
                    <div className="flex justify-between items-center py-3 px-4 rounded-lg text-gray-800">
                      <span className="text-lg">{prayer.name}</span>
                      <span className="text-lg">{prayer.time}</span>
                    </div>
                    {index < futurePrayerTimes.length - 1 && (
                      <hr className="border-t border-gray-200" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
