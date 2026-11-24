const board = document.getElementById('board');
const diceFace = document.getElementById('dice-face');
const turnText = document.getElementById('turn-text');
const winScreen = document.getElementById('win-screen');
const winnerText = document.getElementById('winner-text');

const diceFaces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

let players = [
    { name: 'أنت (أحمر)', isBot: false, position: -1 },
    { name: 'أخضر (بوت)', isBot: true, position: -1 },
    { name: 'أصفر (بوت)', isBot: true, position: -1 },
    { name: 'أزرق (بوت)', isBot: true, position: -1 }
];

let currentPlayer = 0;
let isRolling = false;
let gameActive = false;

// رسم لوحة اللودو
function initBoard() {
    board.innerHTML = '';
    
    // إنشاء الخلايا الأساسية
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = `cell-${i}-${j}`;
            board.appendChild(cell);
        }
    }
    
    // إضافة البيوت (تغطي مساحات معينة)
    let redBase = document.createElement('div'); redBase.classList.add('red-base'); board.appendChild(redBase);
    let greenBase = document.createElement('div'); greenBase.classList.add('green-base'); board.appendChild(greenBase);
    let yellowBase = document.createElement('div'); yellowBase.classList.add('yellow-base'); board.appendChild(yellowBase);
    let blueBase = document.createElement('div'); blueBase.classList.add('blue-base'); board.appendChild(blueBase);
    let center = document.createElement('div'); center.classList.add('center-home'); board.appendChild(center);
}
initBoard();

function startGame() {
    gameActive = true;
    turnText.innerText = "دورك الآن!";
}

// دالة رمي النرد
function rollDice() {
    if (isRolling || !gameActive || players[currentPlayer].isBot) return;
    
    isRolling = true;
    let rolls = 0;
    
    let interval = setInterval(() => {
        diceFace.innerText = diceFaces[Math.floor(Math.random() * 6)];
        rolls++;
        
        if (rolls > 10) {
            clearInterval(interval);
            let finalRoll = Math.floor(Math.random() * 6) + 1;
            diceFace.innerText = diceFaces[finalRoll - 1];
            handleMove(currentPlayer, finalRoll);
        }
    }, 100);
}

// معالجة الحركة (مبسطة للبوتات واللاعب)
function handleMove(playerIndex, diceValue) {
    let p = players[playerIndex];
    
    if (p.position === -1) {
        if (diceValue === 6) {
            p.position = 0;
            turnText.innerText = `${p.name} خرج من البيت!`;
        } else {
            turnText.innerText = `${p.name} لم يحصل على 6.`;
        }
    } else {
        p.position += diceValue;
        if (p.position >= 56) { // الوصول للنهاية
            endGame(p.name);
            return;
        }
    }

    // الانتقال للاعب التالي
    setTimeout(nextTurn, 1000);
}

function nextTurn() {
    if (!gameActive) return;

    currentPlayer = (currentPlayer + 1) % 4;
    let p = players[currentPlayer];
    turnText.innerText = `دور ${p.name}`;

    if (p.isBot) {
        // البوت يرمي تلقائياً
        setTimeout(() => {
            let botRoll = Math.floor(Math.random() * 6) + 1;
            diceFace.innerText = diceFaces[botRoll - 1];
            handleMove(currentPlayer, botRoll);
        }, 1500);
    } else {
        isRolling = false; // تفعيل النرد للمستخدم
    }
}

function endGame(winnerName) {
    gameActive = false;
    winScreen.classList.remove('hidden');
    winnerText.innerText = `${winnerName} فاز باللعبة!`;
              }
