const Timer = ({ time }: { time: { min: number; sec: number } }) => {
  const newTime = Array.isArray(time) ? time : Object.values(time);
  return (
    <div className="text-6xl tracking-wide">
      {newTime.map((n, i, array) => (
        <span key={i}>
          <span>{String(n).padStart(2, "0")}</span>
          {i !== array.length - 1 && ":"}
        </span>
      ))}
    </div>
  );
};

export default Timer;
