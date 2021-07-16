const net = require('net');
const dotenv = require('dotenv');

dotenv.config();

const client = net.connect({host: process.env.SERVER_HOST, port: process.env.SERVER_PORT}, function(){
    console.log('Client connected');
    client.write('Some Data \r\n');
});

client.on('data', function(data){
    console.log(data.toString());
});

client.on('end', function(){
    console.log('Client disconnected');
});

client.on("error", function(err){
    console.log("🐛 Client Error");
    console.error(err);
})

process.stdin.resume();

// 사용자가 키보드 입력후 엔터할때
process.stdin.on("data", function(data) {
    client.write(data);
});