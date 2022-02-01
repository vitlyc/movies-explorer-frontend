export default function getHoursAndMins(movie) {
  const hours = Math.floor(movie.duration / 60);
  const mins = movie.duration % 60;
  return hours + "ч " + mins + "м";
}
