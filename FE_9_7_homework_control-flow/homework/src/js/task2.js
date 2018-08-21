let isPlaying = confirm('Do you want to play a game?');
let maxNumber = 5;
let maxPrize = 10;
let totalPrize = 0;
const [initialMaxNumber, initialMaxPrize, initialTotalPrize] = [maxNumber, maxPrize, totalPrize];
const maxTriesLeft = 3;
const minTriesLeft = 1;
const rangeIncrease = 1;

if (!isPlaying) {
    alert('You did not become a millionaire, but can.');
} else {

    while (isPlaying) {
        let randomNumber = generateRandomNumber(maxNumber);

        for (let i = maxTriesLeft; i >= minTriesLeft; i--) {

            let userNumber = prompt(`Enter a number form 0 to ${maxNumber}
Attempts left: ${i}\nTotal prize: ${totalPrize}\nPossible prize on current attempt: ${maxPrize} `, '0');

            if (parseInt(userNumber) === randomNumber) {
                totalPrize += maxPrize;
                isPlaying = confirm(`Congratulation! Your prize is: ${totalPrize}. Do you want to continue?`);

                if (isPlaying) {
                    maxPrize = maxPrize * 3;
                    maxNumber = maxNumber * 2;

                } else {
                    isPlaying = confirm('Do you want to play again?');

                    if (isPlaying) {
                        resetGame();
                    }
                }

                break;

            } else if (userNumber !== randomNumber && i === minTriesLeft || userNumber === null) {

                alert(`Thank you for a game. Your prize is: ${totalPrize}`);
                isPlaying = confirm('Do you want to play again?');

                if (isPlaying) {
                    resetGame();
                }

                break;
            }

            maxPrize = Math.floor(maxPrize / 2);
        }
    }
}

function resetGame() {
    [maxNumber, maxPrize, totalPrize] = [initialMaxNumber, initialMaxPrize, initialTotalPrize];
}

function generateRandomNumber(max) {
    return Math.floor(Math.random() * (max + rangeIncrease));
}




