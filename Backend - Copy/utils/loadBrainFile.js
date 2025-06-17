const fs = require("fs");
const path = require("path");

function loadBrainFile(fileName) {
  try {
    const filePath = path.join(__dirname, "brain", fileName); // loads from utils/brain/
    const data = fs.readFileSync(filePath, "utf-8");

    try {
      const parsedData = JSON.parse(data);
      return parsedData;
    } catch (parseErr) {
      console.error(`❌ JSON parsing error in file: ${fileName}`);
      console.error(parseErr.message);

      const lines = data.split("\n");
      lines.forEach((line, index) => {
        try {
          JSON.parse(line);
        } catch (err) {
          console.log(`--> Possible error at line ${index + 1}: ${line}`);
        }
      });

      throw new Error(`Invalid JSON in ${fileName}`);
    }
  } catch (err) {
    console.error(`❌ Error loading file ${fileName}:`, err.message);
    return null;
  }
}

module.exports = { loadBrainFile };
