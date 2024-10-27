import Image from "next/image";

const BgImage = ({
  color,
  balance,
}: {
  color: "blue" | "pink" | "green";
  balance?: boolean;
}) => {
  let hammerColor;
  if (color === "blue") {
    hammerColor = "#156277";
  } else if (color === "pink") {
    hammerColor = "#59205B";
  } else if (color === "green") {
    hammerColor = "#255A4A";
  }

  return (
    <>
      <Image
        src={`/bg-${color}.jpg`}
        alt="bg"
        fill
        className="fixed inset-0 -z-40"
      />
      {balance && (
        <div className="fixed inset-0 -z-40">
          {/* 天秤↓ */}
          <svg
            width="1080"
            height="1080"
            viewBox="0 0 1080 1080"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto w-full h-full"
          >
            <g filter="url(#filter0_f_131_4976)">
              <path
                d="M585 352.35C623.25 338.85 653.85 308.25 667.35 270H810L675 585C675 659.7 745.65 720 832.5 720C919.35 720 990 659.7 990 585L855 270H945V180H667.35C648.9 127.35 598.95 90 540 90C481.05 90 431.1 127.35 412.65 180H135V270H225L90 585C90 659.7 160.65 720 247.5 720C334.35 720 405 659.7 405 585L270 270H412.65C426.15 308.25 456.75 338.85 495 352.35V855H90V945H990V855H585V352.35ZM916.65 585H748.35L832.5 388.8L916.65 585ZM331.65 585H163.35L247.5 388.8L331.65 585ZM540 270C515.25 270 495 249.75 495 225C495 200.25 515.25 180 540 180C564.75 180 585 200.25 585 225C585 249.75 564.75 270 540 270Z"
                fill={hammerColor}
              />
            </g>
            <defs>
              <filter
                id="filter0_f_131_4976"
                x="75"
                y="75"
                width="930"
                height="885"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="7.5"
                  result="effect1_foregroundBlur_131_4976"
                />
              </filter>
            </defs>
          </svg>
        </div>
      )}
    </>
  );
};

export default BgImage;
