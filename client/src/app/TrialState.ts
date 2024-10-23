import { atom } from "recoil";

export const trialState = atom({
  key: "trialState",
  default: { subject: "" },
});
