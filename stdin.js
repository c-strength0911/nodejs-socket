console.log("호옹");

process.stdin.resume();

// 사용자가 키보드 입력후 엔터할때 발생하는 이벤트
process.stdin.on("data", function(data) {
    console.log(`User Input: ${data}`);
});