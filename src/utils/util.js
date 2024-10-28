export const isDateCrossed = (date) => {
  const givenDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return givenDate < today;
};
