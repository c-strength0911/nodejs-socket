const net = require('net');
const dotenv = require('dotenv');
const { env } = require('process');

dotenv.config();

const client = net.connect({host: env.process.SERVER_HOST, port: env.process.SERVER_PORT}, function(){
    console.log('Client connected');
    client.write('Some Data \r\n');
});

client.on('data', function(data){
    console.log(data.toString());
});

client.on('end', function(){
    console.log('Client disconnected');
});

process.stdin.resume();

// 사용자가 키보드 입력후 엔터할때
process.stdin.on("data", function(data) {
    client.write(data);
});