const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);
// needs "server"side inventory to get prices, should get airtable ID from item component and use that
//to search inventory for correct data
// const inventory = require('./data/products.json');
var Airtable = require("airtable");
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.REACT_APP_AIRTABLE_KEY,
});
var base = Airtable.base("appkQCrlI7641rSPO");
const table = base("products");

//get record by airtable id
const getSpecificRecord = async (id) => {
  const record = await table.find(id);
  return record;
};

exports.handler = async (event) => {
  //destructure data from product page on front end
  const { id, quantity } = JSON.parse(event.body);
  //use id to retrieve data from airtable
  const product = await getSpecificRecord(id);
  const { name, images, priceInCents } = product.fields;

  // to restrict quantity if needed
  //   const validatedQuantity = quantity > 0 && quantity < 11 ? quantity : 1;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    billing_address_collection: "auto",
    shipping_address_collection: {
      allowed_countries: ["US"],
    },
    success_url: process.env.REACT_APP_SUCCESS_URL,
    cancel_url: process.env.REACT_APP_CANCEL_URL,
    line_items: [
      {
        name: name,
        //description for checkout page, could concatenate strings with rel info (notes + medium + size)
        //description: product.description,
        //thumbnail image for checkout page
        images: [images[0].thumbnails.large.url],
        amount: priceInCents,
        currency: "usd",
        quantity: quantity,
      },
    ],
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      sessionId: session.id,
      publishableKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY,
      url: session.url,
    }),
  };
};
