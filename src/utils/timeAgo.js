export const timeAgo = (date) => {
  const newDate = new Date(date);
  const seconds = Math.floor((new Date() - newDate) / 1000);
  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + " yr ago";
  }

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }

  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }

  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hr ago";
  }

  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " min ago";
  }

  if (seconds < 10) return "just now";

  return Math.floor(seconds) + " sec ago";
};
export const timeInSeconds = (date) => {
  //console.log(date);
  const newDate = new Date(date);
  const seconds = Math.floor((new Date() - newDate) / 1000);
  return seconds;
};
