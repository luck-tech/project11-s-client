import BgImage from "./BgImage";
import Timer from "./Timer";

const ClaimJudgmentLayout = ({
  user,
  title,
  content,
  time,
}: {
  user: string;
  title: string;
  content: string;
  time?: { min: number; sec: number };
}) => {
  let color: "pink" | "blue" | "green";
  if (user === "plaintiff") {
    color = "pink";
  } else if (user === "defendant") {
    color = "blue";
  } else {
    color = "green";
  }
  return (
    <>
      <BgImage color={color} balance />
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
            <Timer time={time} />
          </div>
        )}
      </div>
    </>
  );
};

export default ClaimJudgmentLayout;
