const guess = document.getElementById('your-guess');
const submit = document.getElementById('submit-guess');
const results = document.getElementById('results');
const hiddenCode = document.getElementById('code');
const playAgainButton = document.getElementById('again');
const inputForm = document.getElementById('input-form');
const answers = document.getElementsByClassName('res');
const success = document.getElementById('success');
const warning = document.getElementById('warning');
const gameOverWarning = document.getElementById('game-over');


/*
    Puzzleception
*/
var r_text = new Array ();
r_text[0] = "Secret: [1] = 1";
r_text[1] = "Secret: [2] = H";
r_text[2] = "Secret: [3] = O";
r_text[3] = "Secret: [4] = R";
r_text[4] = "Secret: [5] = i";
r_text[5] = "Secret: [6] = 2";
r_text[6] = "Secret: [7] = D";
r_text[7] = "Secret: [8] = U";
r_text[8] = "Secret: [9] = 1";
r_text[9] = "Secret: [10] = A";
r_text[10] = "Secret: [11] = F";
r_text[11] = "Secret: [12] = P";
r_text[12] = "Secret: [13] = c";
r_text[13] = "Secret: [14] = R";
r_text[14] = "Secret: [15] = A";
r_text[15] = "Secret: [16] = 0";
r_text[16] = "Secret: [17] = 1";
r_text[17] = "Secret: [18] = G";
r_text[18] = "Secret: [19] = 3";
r_text[19] = "Secret: [20] = a";
r_text[20] = "Secret: [21] = z";
r_text[21] = "Secret: [22] = J";
r_text[22] = "Secret: [23] = 0";
r_text[23] = "Secret: [24] = B";
r_text[24] = "Secret: [25] = C";
r_text[25] = "Secret: [26] = C";
r_text[26] = "Secret: [27] = - (that's a dash symbol)";
r_text[27] = "Secret: [28] = L";
r_text[28] = "Secret: [29] = C";
r_text[29] = "Secret: [30] = k";
r_text[30] = "Secret: [31] = r";
r_text[31] = "Secret: [32] = V";
r_text[32] = "Secret: [33] = H";
r_text[33] = "Secret: [34] = i";
r_text[34] = "Secret: [35] = K";
r_text[35] = "Secret: [36] = L";
r_text[36] = "Secret: [37] = p";
r_text[37] = "Secret: [38] = S";
r_text[38] = "Secret: [39] = f";
r_text[39] = "Secret: [40] = s";
r_text[40] = "Secret: [41] = 9";
r_text[41] = "Secret: [42] = V";
r_text[42] = "Secret: [43] = h";
r_text[43] = "Secret: [44] = A";

/*
    Generate random 4 digits 
    Returns Array of 4 elements
*/
const generateFourRandomNumbers = () => {
    let number = Math.floor(Math.random() * 10000).toString();

    if (number.length < 4) number = `0${number}`;

    return [...number];
}

// Initialize the game number
const gameNumber = generateFourRandomNumbers();
let turns = 0;

const startTheGame = () => {
    turns++;

    if (turns >= 10) gameOver(); // Check for max turns exceeded

    // Get input data
    const userInput = guess.value;
    const isUserInputValid =  validateInput(userInput); // Validate user input

    if (isUserInputValid) {
        const userInputArray = [...userInput];

        // Hide warning if shown
        warning.classList.remove('show');

        // Generate HTML
        const html = genrateResultsHTML(userInputArray, gameNumber);
        const hr = document.createElement('hr');
        
        // Display result
        results.append(html);
        results.append(hr);

        // check if result is a win
        if (isWining()) winTheGame();
        
        return;
    }

    // Show warning
    warning.classList.add('show');
}

// Validates the user input
const validateInput = (input) => !(input === '' || input.length > 4 || input.length < 4);

// Generates a HTML that holds the result
const genrateResultsHTML = (userInput) => {
    if (userInput) {
        // Create <div class="row"></div>
        const row = document.createElement('div');
        row.classList.add('row');

        // Create <div class="col-sm-6">{userInput}</div>
        const leftColumn = document.createElement('div');
        leftColumn.classList.add('col-sm-6');
        leftColumn.innerHTML = userInput.join('');

        // Create <div class="res col-sm-6"></div>
        const rightColumn = document.createElement('div');
        rightColumn.classList.add('res', 'col-sm-6');

        const resultsColumn = generateResultsIconsHTML(rightColumn, userInput);

        // Adds 
        row.appendChild(leftColumn);
        row.appendChild(resultsColumn);

        return row;
    }
}

const generateResultsIconsHTML = (htmlElement, userInput) => {

    if (htmlElement && userInput && userInput.length > 0) {

        for (const [i, char] of userInput.entries()) {
            if (char === gameNumber[i]) {
                const icon = document.createElement('i');
                icon.classList.add('material-icons');
                icon.classList.add('check', 'correct');
                icon.textContent = 'check';
                htmlElement.appendChild(icon);
            } else if (gameNumber.includes(char)) {
                const icon = document.createElement('i');
                icon.classList.add('material-icons');
                icon.classList.add('refresh');
                icon.textContent = 'refresh';
                htmlElement.appendChild(icon);
            } else {
                const icon = document.createElement('i');
                icon.classList.add('material-icons');
                icon.classList.add('again');
                icon.textContent = 'close';
                htmlElement.appendChild(icon);
            }
        }

        return htmlElement;
    }

    return '';
}

/* 
    Is the submited number equal to the game number
    Returns boolean
*/
const isWining = () => {
    if (answers.length > 0) {
        let correct = 0;

        for (let i = 0; i < 4; i++) {
            const correctAnswer = answers[answers.length - 1].children[i].className.includes("correct"); // Always check the last item in the answers array

            if (correctAnswer) correct++;

            if (correct === 4) return true;
        }

        return false;
    }
}

const gameOver = () => {
    gameOverWarning.classList.remove('hide');
    gameOverWarning.classList.add('show');
    playAgainButton.classList.remove('hide');
    playAgainButton.classList.add('show');
    inputForm.classList.add('hide');
    code.style.animationName = "none";
    hiddenCode.style.color = "#dc3545";
    hiddenCode.textContent = gameNumber.join('');
    submit.disabled = true;
}

const winTheGame = () => {
    inputForm.classList.add('hide');
    success.classList.add('show');
    success.classList.remove('hide');
    playAgainButton.classList.remove('hide');
    playAgainButton.classList.add('show');
    code.style.animationName = "none";
    hiddenCode.style.color = "#9EBF5C";
    hiddenCode.textContent = gameNumber.join('');
    var x = Math.floor(r_text.length * Math.random());
    let rmsg = r_text[x];
    $('#rmsg').text(rmsg);
}

playAgainButton.addEventListener('click', () => {
    window.location.reload();
});

submit.addEventListener('click', startTheGame);
