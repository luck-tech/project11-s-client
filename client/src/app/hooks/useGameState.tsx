import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { UseGameStateProps } from "@/app/types/mobile";

const useGameState = ({ trialId, player }: UseGameStateProps) => {
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.post(
          `https://project7.uni-bo.net/api/trial/game_state/`,
          {
            trial_id: trialId,
          }
        );

        if (response.data.state === "discussion") {
          clearInterval(interval);
          router.push(`/${trialId}/chat?player=${player}`);
        }
        if (response.data.state === "show_final_claim_and_judge") {
          clearInterval(interval);
          router.push(`/${trialId}/end`);
        }
      } catch (error) {
        console.error("Error fetching game state:", error);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [trialId, router]);
};

export default useGameState;
