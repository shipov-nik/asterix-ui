import { createDate } from "./createDate";

export const getWeekDaysNames = (firstWeekDay: number, locale: string) => {
  const weekDaysNames: {
    day: ReturnType<typeof createDate>["day"];
    dayShort: ReturnType<typeof createDate>["dayShort"];
  }[] = Array.from({ length: 7 });

  const date = new Date();

  weekDaysNames.forEach((_, i) => {
    const { day, dayNumberInWeek, dayShort } = createDate({
      locale,
      date: new Date(date.getFullYear(), date.getMonth(), date.getDate() + i),
    });

    weekDaysNames[dayNumberInWeek] = { day, dayShort };
  });

  return [...weekDaysNames.slice(firstWeekDay), ...weekDaysNames.slice(0, firstWeekDay)];
};
