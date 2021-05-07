const antiGame = {
  difficulty: 0,
  operation: 0,

  selectDifficulty(event) {
    const captValue = event.target.value;
    antiGame.difficulty = null;
    if (antiGame.difficulty !== 0) {
      antiGame.difficulty = captValue;
    }
  },

  selectOperation(event) {
    const captValue = event.target.value;
    const signal = document.getElementById("signal");
    antiGame.operation = null;
    if (antiGame.operation === 0) {
      signal.innerHTML = "?";
    } else {
      signal.innerHTML = captValue;
      antiGame.operation = captValue;
    }
  },
};

const startGame = {
  gameStarted: null,
  init() {
    document.getElementById("input1").value = "";
    document.getElementById("input2").value = "";
    document.getElementById("input3").value = "";
    document.getElementById("start").disabled = true;
    if (!antiGame.operation || !antiGame.difficulty) {
      alert("Select difiiculty and operation!");
      return;
    } else {
      startGame.gameStarted = true;
      timer.counter = setInterval(function () {
        timer.gameTimer();
      }, 1000);
      rafNumbers.raffle();
    }
  },
};

const rafNumbers = {
  raffle() {
    const camp1 = document.getElementById("input1");
    const camp2 = document.getElementById("input2");
    const numbers = rafNumbers.numberRandom();

    if (antiGame.operation === "r" && antiGame.difficulty !== null) {
      const operation = antiGame.operation;
      const signal = document.getElementById("signal");
      const nRaffle = Math.round(Math.random() * 2);

      if (operation === "r") {
        switch (nRaffle) {
          case 0:
            signal.innerHTML = "+";
            break;
          case 1:
            signal.innerHTML = "-";
            break;
          case 2:
            signal.innerHTML = "*";
            break;
        }
      }
    }

    if (antiGame.operation === "/" && antiGame.difficulty !== null) {
      const firstCamp = Math.round(Math.random() * numbers);
      const secondCamp = Math.round(Math.random() * numbers);
      camp1.value = firstCamp;
      camp2.value = secondCamp;

      while (camp1.value < camp2.value || camp1.value % camp2.value !== 0) {
        console.log("Raffle new value");
        camp1.value = Math.round(Math.random() * numbers);
      }
    } else if (antiGame.operation !== null || antiGame.difficulty !== null) {
      const firstCamp = Math.round(Math.random() * numbers);
      const secondCamp = Math.round(Math.random() * numbers);
      camp1.value = firstCamp;
      camp2.value = secondCamp;
    }
  },

  numberRandom() {
    const difficulty = document.getElementById("difficultyLevel").value;
    const operation = document.getElementById("signal").innerHTML;
    let multRandom = 0;

    if (difficulty === "e" && operation === "/") {
      multRandom = 10;
    } else if (difficulty === "m" && operation === "/") {
      multRandom = 25;
    } else if (difficulty === "h" && operation === "/") {
      multRandom = 45;
    } else if (difficulty === "x" && operation === "/") {
      multRandom = 60;
    } else if (difficulty === "e" && operation === "*") {
      multRandom = 5;
    } else if (difficulty === "m" && operation === "*") {
      multRandom = 7;
    } else if (difficulty === "h" && operation === "*") {
      multRandom = 10;
    } else if (difficulty === "x" && operation === "*") {
      multRandom = 15;
    } else if (difficulty === "e") {
      multRandom = 7;
    } else if (difficulty === "m") {
      multRandom = 15;
    } else if (difficulty === "h") {
      multRandom = 30;
    } else if (difficulty === "x") {
      multRandom = 60;
    }
    return multRandom;
  },
};

const validateData = {
  hits: 0,
  errors: 0,

  validateResult(event) {
    const camp3 = document.getElementById("input3").value;
    const nCamp = parseInt(camp3);

    if (camp3 === "" || isNaN(camp3) || event.keyCode !== 13) {
      console.log("cheguei aqui");
      return;
    }

    const camp1 = document.getElementById("input1").value;
    const camp2 = document.getElementById("input2").value;
    const operation = document.getElementById("signal").innerHTML;
    const hits = document.getElementById("hits");
    const errors = document.getElementById("errors");
    const answer = eval(camp1 + operation + camp2);

    if (nCamp === answer) {
      validateData.hits++;
      document.getElementById("input3").value = "";
      rafNumbers.raffle();
    } else if (nCamp !== answer) {
      validateData.errors++;
      document.getElementById("input3").value = "";
    }

    hits.innerHTML = "Hits:" + validateData.hits;
    errors.innerHTML = "Errors:" + validateData.errors;
  },
};

const resetGame = {
  reset() {
    document.getElementById("difficultyLevel").value = 0;
    document.getElementById("typeOperation").value = 0;
    document.getElementById("input1").value = "";
    document.getElementById("input2").value = "";
    document.getElementById("input3").value = "";
    document.getElementById("signal").innerHTML = "?";
    document.getElementById("hits").innerHTML = "Hits: 0";
    document.getElementById("errors").innerHTML = "Errors: 0";
    document.getElementById("start").disabled = false;
    document.getElementById("input3").readOnly = false;
    validateData.hits = 0;
    validateData.errors = 0;
    if (timer.counter !== 0) {
      timer.seconds = 45;
      clearInterval(timer.counter);
      document.getElementById("time").innerHTML = "Time:" + timer.seconds + "s";
    }
  },
};

const timer = {
  seconds: 44,
  counter: 0,

  gameTimer() {
    if (timer.seconds === -1) {
      clearInterval(timer.counter);
      alert("Game over, time is out!");
      document.getElementById("input3").readOnly = true;
    } else {
      document.getElementById("time").innerHTML = "Time:" + timer.seconds + "s";
      timer.seconds--;
    }
  },
};
