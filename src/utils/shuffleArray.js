export const shuffleArray = (array) => {
  const length = Math.min(6, array.length);
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array.slice(0, length);
};
