const ROCK_STR = "rock";
const SCISSORS_STR = "scissors";
const PAPER_STR = "paper";
const DRAW_STR = "draw"; //=> 승부가 안남

const judgeGame = inputList => {
  let winner = 0;
  winner += inputList.includes(SCISSORS_STR) ? 1 : 0;
  winner += inputList.includes(ROCK_STR) ? 2 : 0;
  winner += inputList.includes(PAPER_STR) ? 4 : 0;
  switch (winner) {
    case 3:
      return ROCK_STR;
    case 5:
      return SCISSORS_STR;
    case 6:
      return PAPER_STR;
    case 0:
    case 1:
    case 2:
    case 4:
    case 7:
      return DRAW_STR;
  }
};

test("가위바위보 테스트1", () => {
  //given
  const inputList1 = [ROCK_STR, ROCK_STR, ROCK_STR, ROCK_STR];
  const inputList2 = [PAPER_STR, PAPER_STR];
  const inputList3 = [SCISSORS_STR, SCISSORS_STR, SCISSORS_STR];

  //when
  const result1 = judgeGame(inputList1);
  const result2 = judgeGame(inputList2);
  const result3 = judgeGame(inputList3);

  //then
  expect(result1).toBe(DRAW_STR);
  expect(result2).toBe(DRAW_STR);
  expect(result3).toBe(DRAW_STR);
});

test("가위바위보 테스트2", () => {
  //given
  const inputList1 = [ROCK_STR, PAPER_STR, SCISSORS_STR, ROCK_STR];
  const inputList2 = [PAPER_STR, SCISSORS_STR, SCISSORS_STR, ROCK_STR];

  //when
  const result1 = judgeGame(inputList1);
  const result2 = judgeGame(inputList2);

  //then
  expect(result1).toBe(DRAW_STR);
  expect(result2).toBe(DRAW_STR);
});

test("가위바위보 테스트3", () => {
  //given
  const inputList1 = [ROCK_STR, PAPER_STR];
  const inputList2 = [PAPER_STR, SCISSORS_STR, SCISSORS_STR, SCISSORS_STR];
  const inputList3 = [SCISSORS_STR, SCISSORS_STR, ROCK_STR, ROCK_STR];

  //when
  const result1 = judgeGame(inputList1);
  const result2 = judgeGame(inputList2);
  const result3 = judgeGame(inputList3);

  //then
  expect(result1).toBe(PAPER_STR);
  expect(result2).toBe(SCISSORS_STR);
  expect(result3).toBe(ROCK_STR);
});
