import { ym } from "@artginzburg/next-ym";

const YANDEX_COUNTER_ID = Number(process.env.NEXT_PUBLIC_YM_COUNTER_ID);
const dev = process.env.NODE_ENV == "development";

export const yandexGoals = ["phone_click", "messanger_click", "booking_submit"] as const;

export const reachGoal = (goal: (typeof yandexGoals)[number]) => {
  dev && console.log("Reach Goal:", goal);

  if (ym != undefined) {
    ym(YANDEX_COUNTER_ID, "reachGoal", goal);
  }
};
