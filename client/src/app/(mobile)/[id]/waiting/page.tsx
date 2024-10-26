"use client";
import { Player } from "@/app/components/Player";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";

const Waiting = () => {
  const router = useRouter();
  const { id }: { id: string } = useParams();
  const searchParams = useSearchParams();
  const player = searchParams.get("player");
  const API_URL = "http://localhost:8000/";

  if (!player) return null;

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.post(`${API_URL}/api/trial/game_state/`, {
          trial_id: id,
        });

        if (response.data.state === "discussion") {
          clearInterval(interval);
          router.push(`/${id}/chat?player=${player}`);
        }
      } catch (error) {
        console.error("Error fetching game state:", error);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [id, router]);

  return (
    <>
      <div className="p-[20px_36px] flex items-center text-[18px] leading-[32.4px]">
        <p className="text-theme-green">AI裁判官</p>
      </div>
      <div className="p-[36px_40px] flex flex-col gap-[36px] items-center justify-center flex-grow text-[16px] leading-[28.8px]">
        <p>
          <Player player={player} />
          として参加を受付ました
        </p>
        <p>プロジェクターをご覧ください</p>
      </div>
    </>
  );
};

export default Waiting;
