const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const gCont = document.querySelector('.game-container')

const figureParts = document.querySelectorAll('.figure-part');

const words = ['צינור', 'אבק', 'ילקוט', 'טלויזיה'];

let selectedWord = words[Math.floor(Math.random() * words.length)];


const correctLetters = [];
const wrongLetters = [];

gCont.append('<input type='text' id='dummy'>');
const gContDummy = document.querySelector('.game-container #dummy');
gContDummy.css({"position":"fixed","left":"120%"}).focus();

// Show hidde word
function displayWord() {
    wordEl.innerHTML = `${selectedWord.split('').map(letter => `
    <span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
    </span>
    `
    )
    .join('')
    }`;

    const innerWord = wordEl.innerText.replace(/\n/g, '');
    
    if(innerWord === selectedWord) {
        finalMessage.innerText = 'ברכותינו! ניצחת';
        popup.style.display = 'flex';
    }
}

// Update the wrong letters
function updateWrongLettersEl() {
    // Display wrong letters
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>אותיות שגויות</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    // Display parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if(index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    // Check if lost
    if(wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'לצערנו הפסדת.';
        popup.style.display = 'flex';
    }
}

// Show notification
function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Event Handlers
// Keydown letter press
window.addEventListener('keydown', e => {
    
    if(e.keyCode >= 65 && e.keyCode <= 190) {
        const letter = e.key;

        if(selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                displayWord();
            } else {
                showNotification();
            }
        } else if(!wrongLetters.includes(letter)) {
            wrongLetters.push(letter);

            updateWrongLettersEl();
        } else {
            showNotification();
        }
    }
})

// Restart game and play again.
playAgainBtn.addEventListener('click', (e) => {
    // Empty the arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord();
    updateWrongLettersEl();
    popup.style.display = 'none';
})

displayWord();