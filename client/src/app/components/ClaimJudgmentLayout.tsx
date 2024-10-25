import BgImage from "./BgImage";
import Timer from "./Timer";

const ClaimJudgmentLayout = ({
  player,
  title,
  content,
  time,
}: {
  player: string;
  title: string;
  content: string;
  time?: {
    time: { min: number; sec: number };
    timeLimit: { min: number; sec: number };
  };
}) => {
  let color: "pink" | "blue" | "green";
  if (player === "plaintiff") {
    color = "pink";
  } else if (player === "defendant") {
    color = "blue";
  } else {
    color = "green";
  }
  return (
    <>
      <BgImage color={color} />
      <div className="container mx-auto min-h-screen flex flex-col justify-center items-center gap-8">
        <h1
          className={`text-6xl lg:text-[88px] text-center font-bold text-theme-${color}`}
        >
          {title}
        </h1>
        <p className="font-bold text-center leading-normal md:leading-normal lg:leading-normal text-4xl md:text-5xl lg:text-6xl p-10">
          {content}
        </p>
        {time && (
          <div className="absolute bottom-0 left-0 p-10">
            <Timer time={time.time} timeLimit={time.timeLimit} />
          </div>
        )}
      </div>
    </>
  );
};

export default ClaimJudgmentLayout;
