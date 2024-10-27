"use client";
import BgImage from "@/app/components/BgImage";
import { Download, Link } from "@mui/icons-material";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import PDFDom from "@/app/components/PDFDom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const ReactConfetti = dynamic(() => import("react-confetti"), {
  ssr: false,
});

const TrialEnd = () => {
  const [windowSize, setWindowSize] = useState<{
    width: undefined | number;
    height: undefined | number;
  }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // クライアントサイドでのみwindowサイズを設定
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // 初期設定
    handleResize();

    // リサイズイベントのリスナーを追加
    window.addEventListener("resize", handleResize);

    // クリーンアップ
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pdhDownloadHandler = () => {
    // PDFファイルに変換したいコンポーネントのidを検索してDOM要素を取得する
    const target = document.getElementById("pdf-id");
    if (target === null) return;

    html2canvas(target, { scale: 2.5 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png", 1.0);

      // A4横向きのPDFサイズ (単位: mm)
      const slideWidth = 320; // スライドの幅
      const slideHeight = 180; // スライドの高さ

      // コンポーネント画像がA4ページに収まるようにスケーリング
      let pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [slideWidth, slideHeight],
      });

      // A4ページ全体に収まるように、画像をページ全体にリサイズ
      pdf.addImage(imgData, "PNG", 0, 0, slideWidth, slideHeight);

      // PDFを保存
      pdf.save(`test.pdf`);
    });
  };

  return (
    <>
      <BgImage color="green" />
      {windowSize.width && windowSize.height && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={true}
        />
      )}
      <div className="flex flex-col justify-center items-center min-h-screen gap-10 py-8 text-center">
        <h1 className="text-6xl md:text-8xl leading-normal md:leading-normal font-bold text-center bg-clip-text text-transparent bg-gradient-to-tr from-[#2AF598] to-[#009EFD]">
          裁判終了
        </h1>
        <button
          type="button"
          onClick={pdhDownloadHandler}
          className="text-4xl md:text-5xl border-b-2 font-semibold"
        >
          PDFダウンロード
          <Download className="w-10 h-10 md:w-16 md:h-16" />
        </button>
        {/* <a href="" className="text-4xl md:text-5xl border-b-2 font-semibold">
          SNSでシェア
          <Link className="w-10 h-10 md:w-16 md:h-16" />
          </a> */}
        <div className="-z-50 opacity-0 absolute">
          <PDFDom />
        </div>
      </div>
    </>
  );
};

export default TrialEnd;
