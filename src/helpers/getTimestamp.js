export const getTimeStamp = (time) => {
  const difference_ms = Date.now() - time;
  let difference_seconds = difference_ms / 1000;
  let difference_minutes = difference_seconds / 60;
  let difference_hours = difference_minutes / 60;
  if (difference_hours.toFixed(0) === 0) {
    if (difference_minutes.toFixed(0) === 0) {
      return Math.round(difference_seconds) + " seconds ago";
    }
    return Math.round(difference_minutes) + " minutes ago";
  }
  return Math.round(difference_hours) >= 24
    ? Math.floor(Math.round(difference_hours) / 24) + " day ago"
    : Math.round(difference_hours) + " hours ago";
};
