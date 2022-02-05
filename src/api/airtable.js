const getProducts = fetch("/api/airtable")
  .then((response) => response.json())
  .then((data) => data)
  .catch((err) => console.error(err));

export { getProducts };
