import React from "react";

var Airtable = require("airtable");
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.REACT_APP_AIRTABLE_KEY,
});
var base = Airtable.base("appkQCrlI7641rSPO");

const table = base("products");

//get first page of records
const getRecords = async () => {
  const records = await table.select().firstPage();
  console.log(records);
};
//get certain number of records
const getLimitedRecords = async () => {
  const records = await table.select({ maxRecords: 2 }).firstPage();
  console.log(records);
};
//get record by airtable id
const getSpecificRecord = async (id) => {
  const record = await table.find(id);
  console.log(record);
};

//update record
const updateRecord = (id) => {
  table.update([
    {
      id: id,
      fields: {
        Name: "changed record name",
      },
    },
  ]);
};
//reduce inventory by one
const decrementInventory = async (id) => {
  //get inventory first
  const record = await table.find(id);
  const inventory = record.fields.inventory;

  table.update([
    {
      id: id,
      fields: {
        inventory: inventory - 1,
      },
    },
  ]);
};

export {
  getRecords,
  getLimitedRecords,
  getSpecificRecord,
  updateRecord,
  decrementInventory,
};
