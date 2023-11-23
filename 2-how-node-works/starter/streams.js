const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  /** Solution 1:
   * we write everything at once in to a variable,
   * once that is ready, we then send the entire piece of data to the client (time consuming).
   */
  // fs.readFile("test-file.txt", (err, data) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   res.end(data);
  // });

  /** Solution 2: (better)
   * using write methond to send data into a stream piece by piece,
   * and streaming the content to the client once a piece is avaliable.
   */
  // const readable = fs.createReadStream("test-file.txt");
  // readable.on("data", (chunk) => {
  //   // write to writable stream chunk by chunk
  //   res.write(chunk);
  // });
  // // let the readable know we are done reading
  // readable.on("end", () => {
  //   res.end();
  // });
  // readable.on("error", (err) => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end("File not found!");
  // });

  /** Solution 3:
   *  use pipe methode! Easiest way for this example.
   */
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res); // our data is actually from: readableSource.pip(writableDest)
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening...");
});
