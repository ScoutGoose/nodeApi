export default function getFilteredDestinations(destinations, url) {
  const splitted = url.split("/");
  const searchParam = splitted.pop();
  const endpoint = splitted.pop();
  return destinations.filter(
    (destination) =>
      destination[endpoint].toLowerCase() === searchParam.toLowerCase()
  );
}
