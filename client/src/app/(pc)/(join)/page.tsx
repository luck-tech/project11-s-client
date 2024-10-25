"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { trialState } from "@/app/TrialState";

const API_URL = "http://localhost:8000";

async function createTrial(subject: string) {
  const res = await fetch(`${API_URL}/trial/create/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ subject: subject }),
  });

  if (!res.ok) {
    throw new Error(`failed create trial${res.status}`);
  }

  return await res.json();
}

const Top = () => {
  const [subject, setSubject] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const setTrial = useSetRecoilState(trialState);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const trial = await createTrial(subject);
      setTrial({ subject: trial.subject });
      router.push(`${trial.trial_id}/player`);
    } catch (error) {
      console.error("裁判の作成に失敗しました", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-14 py-8">
      <h1 className="text-6xl md:text-8xl leading-normal md:leading-normal font-bold text-center bg-clip-text text-transparent bg-gradient-to-tr from-[#2AF598] to-[#009EFD]">
        AI裁判官
      </h1>
      <p className="text-2xl md:text-4xl xl:text-5xl font-bold text-center leading-normal md:leading-normal xl:leading-normal">
        今回の議題内容を50文字以内で入力してください
      </p>
      <form
        className="flex flex-col w-full max-w-screen-xl gap-2 items-center"
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="subject"
          className="text-2xl md:text-4xl font-semibold self-start leading-normal md:leading-normal"
        >
          議題内容
        </label>
        <textarea
          name="subject"
          id="subject"
          rows={4}
          maxLength={50}
          placeholder="議題内容を入力してください"
          className="w-full max-w-screen-xl bg-neutral-800 bg-opacity-10 border-4 border-white rounded-lg p-4 text-3xl md:text-4xl leading-normal md:leading-normal resize-none focus:border-theme-green outline-none caret-theme-green placeholder:text-[#A7B5B0] placeholder:leading-normal placeholder:text-3xl md:placeholder:text-4xl md:placeholder:leading-normal"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <p className="text-end text-2xl md:text-3xl text-neutral-100 self-end">
          {subject.length} / 50
        </p>
        <button
          type="submit"
          className="px-10 py-5 rounded-full text-2xl md:text-4xl bg-theme-green enabled:hover:bg-opacity-80 mt-14 disabled:bg-[#79747E] disabled:opacity-70"
          disabled={!subject.length || isSubmitting}
        >
          裁判を開始する
        </button>
      </form>
    </div>
  );
};

export default Top;
