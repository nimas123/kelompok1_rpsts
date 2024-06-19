const greeting = document.getElementById('greeting');
const carImage = document.getElementById('carImage');
const carMessage = document.getElementById('carMessage');
const carEngineSound = document.getElementById('carEngineSound');
const gunung1Image = document.getElementById('gunung1Image');
const gurunImage = document.getElementById('gurunImage');
const snowflakes = document.getElementById('snowflakes');
const matahari = document.getElementById('matahari');
const states = [
    {
        greeting: 'Selamat Pagi',
        carSrc: 'assets/car.png',
        backgroundColor: 'linear-gradient(to bottom, #87CEEB, #FFFFFF)',
        carMessage: '',
        gunungSrc: 'assets/gunung1.png',
        gunungClass: '',
        duration: 10000,
        showSnow: true,
        showGurun: true,
        showMatahari: true,
        greetingColor: 'black'  // Default color
    },
    {
        greeting: 'Selamat Siang',
        carSrc: 'assets/car.png',
        backgroundColor: 'linear-gradient(to bottom, #4682B4, #FFFFFF)',
        carMessage: '',
        gunungSrc: 'assets/gunung1.png',
        gunungClass: '',
        duration: 10000,
        showSnow: false,
        showGurun: true,
        showMatahari: true,
        greetingColor: 'black'  // Default color
    },
    {
        greeting: 'Selamat Malam',
        carSrc: 'assets/car.png',
        backgroundColor: 'linear-gradient(to bottom, #000000, #FFFFFF)',
        carMessage: '',
        gunungSrc: 'assets/gunung2.png',
        gunungClass: 'gunung2',
        duration: 15000,
        showSnow: false,
        showGurun: true,
        showMatahari: false,
        greetingColor: 'white'  // White color for better visibility
    }
];

let currentStateIndex = 0;

function updateState() {
    const state = states[currentStateIndex];
    console.log(`Switching to state: ${state.greeting}`);

    greeting.innerText = state.greeting;
    greeting.style.color = state.greetingColor || 'black';  // Default to black if not defined
    carImage.src = state.carSrc;
    carMessage.innerText = state.carMessage;
    document.querySelector(".container").style.background = state.backgroundColor;
    gunung1Image.src = state.gunungSrc;
    gunung1Image.classList.remove('gunung2');
   
    if (state.gunungClass) {
        gunung1Image.classList.add(state.gunungClass);
    }

    gurunImage.style.display = state.showGurun ? 'block' : 'none';
    matahari.style.display = state.showMatahari ? 'block' : 'none';

    if (state.showSnow) {
        createSnowflakes();
        snowflakes.style.display = 'block';
    } else {
        snowflakes.style.display = 'none';
    }
    carEngineSound.play();

    currentStateIndex = (currentStateIndex + 1) % states.length;
    setTimeout(updateState, state.duration);
}

function createSnowflakes() {
    snowflakes.innerHTML = '';
    const snowflakeCount = 50;
    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
        snowflake.style.animationDelay = `${Math.random() * 5}s`;
        snowflakes.appendChild(snowflake);
    }
}

carImage.addEventListener('animationstart', () => {
    carEngineSound.play();
});

carEngineSound.addEventListener('ended', () => {
    carEngineSound.pause();
    carEngineSound.currentTime = 0;
    carHornSound.play();
});

carImage.addEventListener('click', () => {
    carHornSound.play();
});

updateState();
