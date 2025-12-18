const timeDiffInMilliseconds = (dateUnlockedAt: Date): number => {
  return Math.abs(new Date(Date.now()).getTime() - dateUnlockedAt.getTime());
};
