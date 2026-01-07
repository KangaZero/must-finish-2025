//TODO refactor to Temporal API when widely available
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal
const timeDiffInMilliseconds = (dateUnlockedAt: Date): number => {
  return Math.abs(new Date(Date.now()).getTime() - dateUnlockedAt.getTime());
};

export { timeDiffInMilliseconds };
