export function getDefaultDateFrom(): string {
  const today = new Date();
  const yesterday = today.setDate(today.getDate() - 1);

  const yesterdayDate = String(new Date(yesterday).getDate());
  const yesterdayMonth =
    new Date(yesterday).getMonth() + 1 < 10
      ? `0${new Date(yesterday).getMonth() + 1}`
      : String(new Date(yesterday).getMonth() + 1);
  const yesterdayYear = String(new Date(yesterday).getFullYear());

  const defaultDateFrom = `${yesterdayYear}-${yesterdayMonth}-${yesterdayDate}`;

  return defaultDateFrom;
}

export function getDefaultDateTo(): string {
  const today = new Date();

  const todayDate = String(today.getDate());
  const todayMonth =
    today.getMonth() + 1 < 10
      ? `0${today.getMonth() + 1}`
      : String(today.getMonth() + 1);
  const todayYear = String(today.getFullYear());

  const defaultDateTo = `${todayYear}-${todayMonth}-${todayDate}`;

  return defaultDateTo;
}
