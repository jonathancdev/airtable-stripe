// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method

const Airtable = require("airtable");

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.REACT_APP_AIRTABLE_KEY,
});

const handler = async (event) => {
  const base = Airtable.base(process.env.REACT_APP_AIRTABLE_BASE_ID);
  const table = base(process.env.REACT_APP_AIRTABLE_TABLE_NAME);
  try {
    const records = await table.select().firstPage();
    return {
      statusCode: 200,
      body: JSON.stringify(records),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
