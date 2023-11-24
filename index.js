const ExcelJS = require("exceljs");

// Using filestream
// const fs = require("fs");
// const json = JSON.parse(fs.readFileSync("./data/json/rawjsondata.json"));
// const key1 = Object.keys(json)[0];
// const key2 = Object.keys(json[key1]);

const rawJson = require("./data/json/test.json");
const json = rawJson["29AAWCS3552Q1Z6"].result;

const reqId = json.requestId;
const gstin = json.gstin;

const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet("Sheet 1");

worksheet.columns = [
  { header: "Request ID", key: "requestId" },
  { header: "GSTIN", key: "gstin" },
  { header: "Month", key: "month" },
  { header: "Category ", key: "cat" },
  { header: "Message", key: "message" },
];

Object.keys(json)
  .filter((val) => val !== "gstin" && val !== "requestId")
  .map((a) => {
    let njson = json[a];
    Object.keys(njson).map((m) => {
      let innerJson = njson[m];
      // console.log(Object.keys(innerJson));
      Object.keys(innerJson).map((cat) => {
        worksheet.addRow({
          requestId: reqId,
          gstin: gstin,
          month: m,
          cat: cat,
          message: innerJson[cat].data.message
            ? innerJson[cat].data.message
            : "",
        });
        // console.log(cat, "\t", m, "\t", innerJson[cat].data.message ? "ok" : "not found");
      });
    });
  });

// Add a couple of Rows by key-value, after the last current row, using the column keys
// worksheet.addRow({ id: 1, name: "John Doe", dob: new Date(1970, 1, 1) });

// Write to files
// Writing to a XLSX File
workbook.xlsx
  .writeFile("data/excel/file1.xlsx")
  .then(() => console.log("Excel file created successfully!"))
  .catch((err) => console.error(err));

// Writing to a CSV File
workbook.csv
  .writeFile("data/csv/file1.csv")
  .then(() => console.log("CSV file created successfully!"))
  .catch((err) => console.error(err));
