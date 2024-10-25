const Timer = ({
  time,
  timeLimit,
}: {
  time: { min: number; sec: number };
  timeLimit: { min: number; sec: number };
}) => {
  const newTime = Array.isArray(time) ? time : Object.values(time);
  const radius = 110;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference *
    (1 - (newTime[0] * 60 + newTime[1]) / (timeLimit.min * 60 + timeLimit.sec));

  return (
    <div>
      <div className="relative w-80 h-80 flex items-center justify-center">
        <svg className="transform -rotate-90 w-full h-full">
          {/* 背景の円 */}
          <circle
            cx="160"
            cy="160"
            r={radius}
            className="stroke-white opacity-30"
            strokeWidth="14"
            fill="none"
          />
          {/* プログレス円 */}
          <circle
            cx="160"
            cy="160"
            r={radius}
            className="stroke-white"
            strokeWidth="14"
            fill="none"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
              transition: "stroke-dashoffset 1s linear",
            }}
          />
        </svg>

        {/* 中央のタイマー表示 */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div>
            <p className="text-2xl text-center pb-1">残り</p>
            <div className="text-5xl font-bold tracking-wide pb-4">
              {newTime.map((n, i, array) => (
                <span key={i}>
                  <span>{String(n).padStart(2, "0")}</span>
                  {i !== array.length - 1 && (
                    <span className="inline pb-4">:</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
