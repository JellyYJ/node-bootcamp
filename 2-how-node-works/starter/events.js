const EventEmitter = require("events");

const http = require("http");

// // const myEmitter = new EventEmitter();

// // better to create a class that inherits from EventEmitter
// class Sales extends EventEmitter {
//   constructor() {
//     super();
//   }
// }
// const myEmitter = new Sales();

// // EventEmitter allows multiple lisenters
// myEmitter.on("newSale", () => {
//   console.log("There was a new sale.");
// });

// myEmitter.on("newSale", () => {
//   console.log("Costumer name: James");
// });

// myEmitter.on("newSale", (stock) => {
//   console.log(`${stock} items left in stock`);
// });

// // as if we are clicking on a button
// // myEmitter.emit("newSale");

// myEmitter.emit("newSale", 99);

/////////////////////////////////////////////////
/**
 * Create a server
 */
const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request received.");
  res.end("Request received.");
});

server.on("request", (req, res) => {
  console.log("Another.");
});

server.on("close", () => {
  console.log("Server closed.");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for request...");
});
