const fs = require("fs");
const http = require("http");
const PORT = 3000;

const server = http.createServer((req, res) => {
  // Set HTTP request header
  res.setHeader("Content-Type", "text/html");

  // Get path of requested HTML page
  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about-me":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      res.end();
      break;
    default:
      path += "404.html";
      res.statusCode = 404;
      break;
  }

  // Send an HTML file to client
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      //res.write(data);
      res.end(data);
    }
  });
});

server.listen(PORT, "localhost", () => {
  console.log(`Listening on port ${PORT}`);
});
