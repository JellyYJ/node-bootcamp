const fs = require("fs");
const http = require("http");
const url = require("url");

const slugify = require("slugify");

// import the module we initialised in replaceTemplate.js
// '.' points to the current location of the current modules file
const replaceTemplate = require("./modules/replaceTemplate");

// const hello = "Hello!";
// console.log(hello);

////////////////////////////////////////////////////////////////////////////
// Sync vs. Async

// // Synchronous way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `this is what we know about the avocado: ${textIn}. \n Created on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File written :D");

// // Asynchronous way
// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//   fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data1) => {
//     console.log(data1);
//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data2) => {
//       console.log(data2);

//       fs.writeFile("./txt/final.txt", `${data1}\n${data2}`, "utf-8", (err) => {
//         console.log("Your file has been read :p");
//       });
//     });
//   });
// });
// console.log("Will read file!");

////////////////////////////////////////////////////////////////////////////
// Server
// only gets executed once at the beginning, so it won't cause blocking (top-level code)
// fs.readFile("./dev-data/data.json");
// always better to use variable to refer a directory
// __dirname where the current file is located
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data); // parse json to javascript

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template_overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template_card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template_product.html`,
  "utf-8"
);

// looping data objects and create a new array based on that
const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

// try out slugify
console.log(slugify("Fresh Acocados", { lower: true }));

const server = http.createServer((req, res) => {
  // console.log(req.url); // shows the url of the web in the console
  // const pathName = req.url;

  // console.log(url.parse(req.url, true));
  const { query, pathname } = url.parse(req.url, true);

  //overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    // the el holds the data
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");

    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    // console.log(cardsHtml); // testing
    res.end(output);

    // product page
  } else if (pathname === "/product") {
    // console.log(query); // testing
    res.writeHead(200, { "Content-type": "text/html" });

    const product = dataObj[query.id]; // retreiving an element based on a query string
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // api page
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);

    // not found
  } else {
    // inform the browser what is happening
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("Page Not Found :(");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000...");
});
