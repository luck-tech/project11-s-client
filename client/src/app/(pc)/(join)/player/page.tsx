const JoinPlayer = () => {
  return (
    <div className="text-white text-center flex flex-col justify-center items-center min-h-screen gap-10 md:gap-36 py-8">
      <div className="bg-neutral-100 text-neutral-800 px-10 py-10 rounded-3xl">
        <h1 className="text-4xl lg:text-5xl font-bold lg:leading-snug leading-snug">
          今回の裁判内容 今回の裁判内容 今回の裁判内容 今回の裁判内容
          今回の裁判内容 今回の裁判内容 今回の裁判内容
        </h1>
      </div>
      <div className="flex flex-col md:flex-row gap-10 md:gap-0 items-center justify-evenly w-full">
        <div>
          <div className="text-4xl lg:text-5xl font-bold text-[#A71AAD] space-y-3 bg-neutral-100 px-10 py-5 rounded-[50px] mb-10">
            <p>Player A</p>
            <p>原告はこちら</p>
          </div>
          <div className="aspect-square max-w-[450px] lg:w-[450px] bg-neutral-100 rounded-lg"></div>
        </div>
        <div>
          <div className="text-4xl lg:text-5xl font-bold text-theme-blue space-y-3 bg-neutral-100 px-10 py-5 rounded-[50px] mb-10">
            <p>Player B</p>
            <p>被告はこちら</p>
          </div>
          <div className="aspect-square max-w-[450px] lg:w-[450px] bg-neutral-100 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default JoinPlayer;
