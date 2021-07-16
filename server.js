const net = require("net");
const dotenv = require('dotenv');

dotenv.config();

/* 클라이언트 리스트 */
const clientList = [];
 
const server = net.createServer(function (client) {
  console.log("Client connected");
  /* 클라이언트 등록 */
  clientList.push(client);

  client.on("data", function (data) {
    console.log("Client sent " + data.toString().trim());
    for(let i=0; i<clientList.length; i++) {
      if(client !== clientList[i]) {
        clientList[i].write(data);
      }
    }
  });

  client.on("error", function (err) {
    console.log("🐛 Client Error");
    console.error(err);
  });

  client.on("end", function() {
    console.log("client end");
  });

  client.on("close", function() {
    for(let i=0; i<clientList.length; i++) {
      if(client !== clientList[i]) {
        clientList.splice(i,1);
      }
    }
    console.log("client close");
  })

  client.write("Hello");
});

server.listen(process.env.SERVER_PORT, function () {
  console.log("Server listening for connection");
});