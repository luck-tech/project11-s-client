import BgImage from "../components/bgImage";

const Top = () => {
  return (
    <>
      <BgImage color="green" />
      <div className="flex flex-col justify-center items-center h-screen gap-14 text-white">
        <h1 className="text-6xl md:text-8xl xl:text-9xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-tr from-[#2AF598] to-[#009EFD]">
          AI裁判官
        </h1>
        <p className="text-2xl md:text-4xl xl:text-5xl font-bold text-center">
          今回の議題内容を100文字以内で入力してください
        </p>
        <form className="flex flex-col w-full gap-2">
          <label htmlFor="agenda" className="text-4xl">
            議題内容
          </label>
          <textarea
            name="agenda"
            id="agenda"
            rows={4}
            maxLength={50}
            placeholder="議題を入力してください"
            className="w-full bg-inherit border border-white rounded-lg p-4 text-3xl"
          ></textarea>
          <p className="text-end text-3xl">0 / 50</p>
          <button
            type="submit"
            className="px-5 py-3 rounded-lg w-60 bg-neutral-500 self-end mt-4"
          >
            送信する
          </button>
        </form>
      </div>
    </>
  );
};

export default Top;
