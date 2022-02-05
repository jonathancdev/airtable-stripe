export async function handleFormSubmission(obj) {
  const response = await fetch("/api/create-checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => {
      if (res.ok) return res.json();
      // If there is an error then make sure we catch that
      return res.json().then((e) => Promise.reject(e));
    })
    .then(({ url }) => {
      // On success redirect the customer to the returned URL
      console.log(url);
      window.location = url;
    })
    .catch((e) => {
      console.error(e.error);
    });
}
