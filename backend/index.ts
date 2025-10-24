import { NodeCompiler } from "@myriaddreamin/typst-ts-node-compiler";
import * as fs from "fs/promises"; // Import the promises-based fs module
import * as path from "path"; // Import path module for resolving paths

const $typst = NodeCompiler.create(); // works with Bun 1.3.0
const templateFileName = "template.typ";
const templateFilePath = path.join(process.cwd(), templateFileName);
var mainFileContent: string;

try {
  const fileBuffer = await fs.readFile(templateFilePath);
  mainFileContent = fileBuffer.toString("utf8");
  console.log(`Successfully loaded content from ${templateFileName}`);
} catch (error) {
  console.error(`Error loading template file ${templateFileName}:`, error);
  process.exit(1);
}

/**
 * if sending a pdf over network,
 * send pdfBuffer directly to browser
 * Browser then can render it and display it.
 */
const pdfBuffer = $typst.pdf({ mainFileContent });
console.log(pdfBuffer);
const pdfName = "output.pdf";
const filePath = (f: string) => {
  return path.join(process.cwd(), f);
};

try {
  await fs.writeFile(filePath(pdfName), pdfBuffer);
  console.log(`PDF successfully saved to ${filePath(pdfName)}`);
} catch (error) {
  console.error("Error saving PDF:", error);
}

$typst.evictCache(10);
