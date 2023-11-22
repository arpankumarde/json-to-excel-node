const ExcelJS = require("exceljs");

// const fs = require("fs");

// const json = JSON.parse(fs.readFileSync("./data/json/rawjsondata.json"));
// const key1 = Object.keys(json)[0];
// const key2 = Object.keys(json[key1]);

const rawJson = require("./data/json/rawjsondata.json");
const json = rawJson["29AAWCS3552Q1Z6"].result.gstr1;

const reqId = rawJson["29AAWCS3552Q1Z6"].result.requestId;
const gstin = rawJson["29AAWCS3552Q1Z6"].result.gstin;
console.log(
  Object.keys(rawJson["29AAWCS3552Q1Z6"].result).filter(
    (val) => val !== "gstin" && val !== "requestId"
  )
);
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet("Sheet 1");

worksheet.columns = [
  { header: "Request ID", key: "requestId" },
  { header: "GSTIN", key: "gstin" },
  { header: "Month", key: "month" },
  { header: "Category ", key: "cat" },
  { header: "Message", key: "message" },
];

// console.log(Object.keys(json["29AAWCS3552Q1Z6"].result.gstr1["022022"]));
// console.log(rawJson["29AAWCS3552Q1Z6"].result.gstr1["022022"]);
Object.keys(json).map((m) => {
  //   console.log("hi", json["29AAWCS3552Q1Z6"].result.gstr1[m]);
  let innerJson = json[m];
  // console.log(Object.keys(innerJson));
  Object.keys(innerJson).map((cat) => {
    worksheet.addRow({
      requestId: reqId,
      gstin: gstin,
      month: m,
      cat: cat,
      message: innerJson[cat].data.message ? innerJson[cat].data.message : "",
    });
    // console.log(cat, "\t", m, "\t", innerJson[cat].data.message ? "ok" : "not");
  });
});

// // Add a couple of Rows by key-value, after the last current row, using the column keys
// worksheet.addRow({ id: 1, name: "John Doe", dob: new Date(1970, 1, 1) });

// write to a file
// const workbook = createAndFillWorkbook();
workbook.xlsx
  .writeFile("data/excel/file.xlsx")
  .then(() => console.log("Excel file created successfully!"))
  .catch((err) => console.error(err));
workbook.csv
  .writeFile("data/csv/file.csv")
  .then(() => console.log("CSV file created successfully!"))
  .catch((err) => console.error(err));

// const writeFile = async () => {
//   await workbook.xlsx.writeFile("./data/obu4.xlsx");
//   await workbook.csv.writeFile("./data/obu4.csv");
//   console.log("Complete");
// };

// writeFile();

// try {
//   const workbook = new ExcelJS.Workbook();
//   const worksheet = workbook.addWorksheet("Sheet1");

//   worksheet.columns = Object.keys(json).map((key) => ({ header: key, key }));

//   worksheet.addRows(json);

//   workbook.xlsx
//     .writeFile("data/excel/file.xlsx")
//     .then(() => console.log("Excel file created successfully!"))
//     .catch((err) => console.error(err));
// } catch (error) {
//   console.log(error);
// }
