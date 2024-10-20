const JoinObserver = () => {
  return (
    <div className="text-white text-center flex flex-col justify-center items-center min-h-screen gap-10 md:gap-24 py-8">
      <div className="bg-neutral-100 text-neutral-800 px-10 py-10 rounded-3xl">
        <h1 className="text-4xl lg:text-5xl font-bold lg:leading-snug leading-snug">
          今回の裁判内容 今回の裁判内容 今回の裁判内容 今回の裁判内容
          今回の裁判内容 今回の裁判内容 今回の裁判内容
        </h1>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-4xl lg:text-5xl font-bold text-neutral-800 bg-neutral-100 px-10 py-10 rounded-[50px] mb-10">
          <p>傍聴人のQRコード</p>
        </div>
        <div className="aspect-square max-w-[450px] w-full lg:w-[450px] bg-neutral-100 rounded-lg"></div>
      </div>
    </div>
  );
};

export default JoinObserver;
