// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as fs from "fs";

export default async function handler(req, res) {
  let data = await fs.promises.readdir("docsDetails");
  data = data.slice(0, parseInt(req.query.count));
  let myfile;
  let allDocs = [];
  for (let index = 0; index < data.length; index++) {
    const item = data[index];
    myfile = await fs.promises.readFile("docsDetails/" + item, "utf-8");
    allDocs.push(JSON.parse(myfile));
  }
  res.status(200).json(allDocs);
}