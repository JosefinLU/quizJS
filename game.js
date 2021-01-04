const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswear = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "What is the capital of Uruguay?",
    choice1: "Buenos Aires",
    choice2: "Montevideo",
    choice3: "Caracas",
    choice4: "Lima",
    answear: 2,
  },
  {
    question: "Who is the original singer of Son Of A Preacher Man",
    choice1: "Dusty Springfield",
    choice2: "Arheta Franklin",
    choice3: "Nina Simone",
    choice4: "Ella Fitzgerald",
    answear: 1,
  },
  {
    question: "Which ones are Cuba's most famouse cigars?",
    choice1: "H Upmann",
    choice2: "San Cristobal",
    choice3: "Cohiba",
    choice4: "Romeo y Julieta",
    answear: 3,
  },
  {
    question:
      "What percent of American adults believe that chocolate milk comes from brown cows?",
    choice1: "20%",
    choice2: "18%",
    choice3: "7%",
    choice4: "33%",
    answear: 3,
  },
  {
    question: "When did Stockholm host the Olympic Games for the first time?",
    choice1: "1900",
    choice2: "1908",
    choice3: "1912",
    choice4: "1920",
    answear: 3,
  },
  {
    question: "Who won the FIFA Women's World Cup in 2019?",
    choice1: "Sverige",
    choice2: "USA",
    choice3: "Spain",
    choice4: "China",
    answear: 2,
  },
  {
    question: "  Which vitamin is the only one that you will not find in an egg?",
    choice1: "Vitamin C",
    choice2: "Vitamin B",
    choice3: "Vitamin D",
    choice4: "Vitamin E",
    answear: 1,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 7;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.getElementsByClassName.width = `${
    (questionCounter / MAX_QUESTIONS) * 100
  }%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswear = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswear) return;

    acceptingAnswear = false;
    const selectedChoice = e.target;
    const selectedAnswear = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswear == currentQuestion.answear ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }
    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
