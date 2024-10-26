const Timer = ({
  time,
  timeLimit,
}: {
  time: { min: number; sec: number };
  timeLimit: { min: number; sec: number };
}) => {
  const newTime = Array.isArray(time) ? time : Object.values(time);
  const radius = 70; // 半径を縮小
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference *
    (1 - (newTime[0] * 60 + newTime[1]) / (timeLimit.min * 60 + timeLimit.sec));

  return (
    <div>
      <div className="relative w-60 h-60 flex items-center justify-center">
        <svg className="transform -rotate-90 w-full h-full">
          {/* 背景の円 */}
          <circle
            cx="120" // 半径に合わせて中心位置を調整
            cy="120"
            r={radius}
            className="stroke-white opacity-30"
            strokeWidth="10" // 線の太さを調整
            fill="none"
          />
          {/* プログレス円 */}
          <circle
            cx="120"
            cy="120"
            r={radius}
            className="stroke-white"
            strokeWidth="10"
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
            <p className="text-lg text-center pb-1">残り</p>
            <div className="text-4xl font-bold tracking-wide pb-4">
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
