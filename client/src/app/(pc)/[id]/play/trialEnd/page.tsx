import BgImage from "@/app/components/BgImage";
import { Download, Link } from "@mui/icons-material";

const TrialEnd = () => {
  return (
    <>
      <BgImage color="green" />
      <div className="flex flex-col justify-center items-center min-h-screen gap-10 py-8 text-center">
        <h1 className="text-6xl md:text-8xl leading-normal md:leading-normal font-bold text-center bg-clip-text text-transparent bg-gradient-to-tr from-[#2AF598] to-[#009EFD]">
          裁判終了
        </h1>
        <a href="" className="text-4xl md:text-5xl border-b-2 font-semibold">
          PDFダウンロード
          <Download className="w-10 h-10 md:w-16 md:h-16" />
        </a>
        <a href="" className="text-4xl md:text-5xl border-b-2 font-semibold">
          SNSでシェア
          <Link className="w-10 h-10 md:w-16 md:h-16" />
        </a>
      </div>
    </>
  );
};

export default TrialEnd;
