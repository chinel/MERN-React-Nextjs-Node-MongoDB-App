export const captializeName = (name) => {
  const firstLetter = name.charAt(0);

  const firstLetterCap = firstLetter.toUpperCase();

  const remainingLetters = name.slice(1);

  return firstLetterCap + remainingLetters;
};
