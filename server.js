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
    console.log("Client sent " + data.toString());
    for(let i=0; i<clientList.length; i++) {
      if(client !== clientList[i]) {
        clientList[i].write(data);
      }
    }
  });

  client.on("end", function () {
    console.log("Client disconnected");
    
  });

  client.write("Hello");
});

server.listen(env.process.SERVER_PORT00, function () {
  console.log("Server listening for connection");
});