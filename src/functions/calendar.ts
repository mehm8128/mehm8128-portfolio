export interface Post {
  title: string;
  description?: string;
  publishedDate: Date;
  url: string;
}

export interface CalendarDay {
  day: number;
  isCurrentMonth: boolean;
  post?: Post;
  isAdventDay?: boolean;
}

export interface CalendarWeek {
  days: CalendarDay[];
}

export const generateAdventCalendar = (
  posts: Post[],
  year: number,
  endDate = 24 // 25の場合があるので指定できるようにしている
): CalendarWeek[] => {
  const calendarDays: CalendarDay[] = [];

  // その月の1日と最終日を取得
  const firstDay = new Date(year, 11, 1);
  const lastDay = new Date(year, 12, 0);
  const daysInMonth = lastDay.getDate();

  const firstDayOfWeek = firstDay.getDay();

  // 前月の最終日を取得
  const prevMonth = new Date(year, 10, 0);
  const daysInPrevMonth = prevMonth.getDate();

  // 前月の日々を追加
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    calendarDays.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
    });
  }

  // 当月の日々を追加
  for (let day = 1; day <= daysInMonth; day++) {
    const post = posts.find(
      (p) =>
        p.publishedDate.getFullYear() === year &&
        p.publishedDate.getMonth() === 11 &&
        p.publishedDate.getDate() === day
    );

    calendarDays.push({
      day,
      isCurrentMonth: true,
      post,
      isAdventDay: day <= endDate,
    });
  }

  // 週ごとに分割
  const weeks: CalendarWeek[] = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push({
      days: calendarDays.slice(i, i + 7),
    });
  }

  return weeks;
};

export const weekdayNames = ["日", "月", "火", "水", "木", "金", "土"] as const;
