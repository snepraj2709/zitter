import { timeInSeconds } from "./timeAgo";

export function sortPosts(postData, filterType) {
  const sortedByTime = postData.sort(
    (a, b) => timeInSeconds(a.createdAt) - timeInSeconds(b.createdAt)
  );
  switch (filterType) {
    case "latest":
      return sortedByTime;
      break;
    case "oldest":
      return sortedByTime.reverse();
      break;
    case "trending":
      return postData.sort((a, b) => b.likes.likeCount - a.likes.likeCount);
      break;
    default:
      return postData;
  }
}
