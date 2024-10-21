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
        src={`/${color}-bg.png`}
        alt="bg"
        fill
        className="fixed inset-0 -z-50"
      />
      {balance && (
        <div className="fixed inset-0 -z-40">
          {/* 金槌↓ */}
          {/* <svg
            width="1080"
            height="1080"
            viewBox="0 0 1080 1080"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto"
          >
            <g filter="url(#filter0_f_68_987)">
              <path
                d="M839.565 299.565L775.935 235.935M616.815 522.315L254.07 948.69C247.384 955.378 239.446 960.683 230.709 964.302C221.973 967.921 212.609 969.784 203.152 969.784C193.696 969.784 184.332 967.921 175.595 964.302C166.859 960.683 158.921 955.378 152.235 948.69L126.81 923.22C113.317 909.719 105.738 891.412 105.738 872.325C105.738 853.238 113.317 834.931 126.81 821.43L553.185 458.64M712.26 617.76L871.38 458.64M457.74 363.24L616.815 204.12M387.72 242.28L495.9 134.1C502.651 127.354 511.804 123.564 521.347 123.564C530.891 123.564 540.044 127.354 546.795 134.1L941.4 528.66C948.146 535.411 951.936 544.564 951.936 554.108C951.936 563.651 948.146 572.804 941.4 579.555L833.175 687.78C826.424 694.526 817.271 698.316 807.727 698.316C798.184 698.316 789.031 694.526 782.28 687.78L387.72 293.175C380.987 286.426 377.207 277.283 377.207 267.75C377.207 258.217 380.987 249.074 387.72 242.325"
                stroke={hammerColor}
                strokeWidth="67.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <filter
                id="filter0_f_68_987"
                x="61.9883"
                y="79.8142"
                width="933.697"
                height="933.72"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="5"
                  result="effect1_foregroundBlur_68_987"
                />
              </filter>
            </defs>
          </svg> */}

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
