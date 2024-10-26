const CalculateTime = (createdAt: string) => {
  const now = new Date();
  const createdTime = new Date(createdAt);
  const diffMs = now.getTime() - createdTime.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffMinutes < 60) {
    return `${diffMinutes}分`;
  } else if (diffMinutes < 1440) {
    return `${Math.floor(diffMinutes / 60)}時間`;
  } else {
    return `${Math.floor(diffMinutes / 1440)}日`;
  }
};

export default CalculateTime;
