"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = "/";

async function createTrial(subject: string) {
  const res = await fetch(`${API_URL}/trial/create/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ trial_subject: subject }),
  });

  if (!res) {
    throw new Error("failed create trial");
  }

  return await res.json();
}

const Top = () => {
  const [subject, setSubject] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const trial = await createTrial(subject);
      router.push(`${trial.trial_id}/player`);
    } catch (error) {
      console.error("裁判の作成に失敗しました", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-14 py-8">
      <h1 className="text-6xl md:text-8xl xl:text-9xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-tr from-[#2AF598] to-[#009EFD]">
        AI裁判官
      </h1>
      <p className="text-2xl md:text-4xl xl:text-5xl font-bold text-center">
        今回の議題内容を50文字以内で入力してください
      </p>
      <form
        className="flex flex-col w-full max-w-screen-xl gap-2 items-center"
        onSubmit={handleSubmit}
      >
        <label htmlFor="subject" className="text-4xl font-bold self-start">
          議題内容
        </label>
        <textarea
          name="subject"
          id="subject"
          rows={4}
          maxLength={50}
          placeholder="議題を入力してください"
          className="w-full max-w-screen-xl bg-neutral-800 bg-opacity-10 border border-white rounded-lg p-4 text-3xl leading-normal resize-none outline-theme-green"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <p className="text-end text-3xl text-neutral-100 self-end">
          {subject.length} / 50
        </p>
        <button
          type="submit"
          className="px-20 py-4 rounded-lg text-4xl bg-[#79747E] enabled:hover:bg-opacity-80 mt-20 disabled:opacity-50"
          disabled={!subject.length || isSubmitting}
        >
          送信する
        </button>
      </form>
    </div>
  );
};

export default Top;
