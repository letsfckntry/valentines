// Fake Virus Valentine Prank
const initialWarning = document.getElementById('initialWarning');
const virusScreen = document.getElementById('virusScreen');
const valentineReveal = document.getElementById('valentineReveal');
const bgMusic = document.getElementById('bgMusic');

let loadingProgress = 0;

// Auto-start after 2 seconds
setTimeout(() => {
    // Hide initial warning
    initialWarning.style.display = 'none';
    
    // Show virus screen with multiple warning messages
    virusScreen.style.display = 'block';
    showVirusMessages();
    
    // Start alert sound
    playAlertSound();
}, 2000);

// Show multiple virus warning messages
function showVirusMessages() {
    const messages = [
        'VIRUS DETECTED!',
        'Your system has been infected with LOVE VIRUS',
        'This virus will make you smile uncontrollably!',
        'Side effects: Butterflies in stomach, random giggling'
    ];
    
    virusScreen.innerHTML = `
        <div class="warning-icon">⚠️</div>
        <h1>⚠️ CRITICAL SYSTEM ERROR ⚠️</h1>
        <div class="message" id="messageContainer">
            <p class="glitch">SCANNING SYSTEM...</p>
        </div>
    `;
    
    const messageContainer = document.getElementById('messageContainer');
    let messageIndex = 0;
    
    const messageInterval = setInterval(() => {
        if (messageIndex < messages.length) {
            const p = document.createElement('p');
            p.style.color = messageIndex === 0 ? '#0ff' : (messageIndex === 1 || messageIndex === 2 ? '#ff0' : '#f00');
            p.style.marginTop = '15px';
            p.style.fontSize = messageIndex === 1 ? '20px' : '18px';
            if (messageIndex === 0) p.className = 'glitch';
            if (messageIndex === 1) {
                p.innerHTML = messages[messageIndex] + '<br><strong style="font-size: 24px;">LOVE VIRUS RUNNING</strong>';
            } else {
                p.textContent = messages[messageIndex];
            }
            messageContainer.appendChild(p);
            messageIndex++;
            
            // Play alert sound on each message
            playAlertSound();
        } else {
            clearInterval(messageInterval);
            // Show loading bar
            const loadingDiv = document.createElement('div');
            loadingDiv.className = 'loading';
            loadingDiv.innerHTML = `
                <p>Installing affection... <span id="loadingPercent">0</span>%</p>
                <div class="loading-bar">
                    <div class="loading-fill" id="loadingFill"></div>
                </div>
            `;
            messageContainer.appendChild(loadingDiv);
            
            // Start loading animation after elements are created
            setTimeout(() => {
                startLoading();
            }, 100);
        }
    }, 800);
}

// Initialize button event listeners
function initializeButtons() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    
    // Yes button - show valentine reveal
    yesBtn.addEventListener('click', () => {
        // Play music
        bgMusic.play().catch(e => console.log('Music autoplay blocked:', e));
        
        // Change body background
        document.body.classList.add('valentine-mode');
        
        // Hide virus screen
        virusScreen.classList.add('hidden');
        
        // Show valentine reveal with delay to ensure smooth transition
        setTimeout(() => {
            valentineReveal.style.display = 'block';
            valentineReveal.classList.remove('hidden');
            valentineReveal.classList.add('show');
        }, 100);
        
        // Add confetti effect
        setTimeout(() => {
            createConfetti();
        }, 200);
    });
    
    // No button - show error
    noBtn.addEventListener('click', () => {
        noBtn.textContent = 'ERROR!';
        noBtn.style.background = '#000';
        noBtn.style.animation = 'shake 0.3s infinite';
        
        // Play error sound
        playAlertSound();
        
        setTimeout(() => {
            noBtn.textContent = 'BUTTON DISABLED';
            noBtn.disabled = true;
            noBtn.style.opacity = '0.5';
            noBtn.style.cursor = 'not-allowed';
        }, 500);
        
        // Show message
        setTimeout(() => {
            const errorMsg = document.createElement('p');
            errorMsg.style.color = '#f00';
            errorMsg.style.marginTop = '20px';
            errorMsg.style.fontSize = '20px';
            errorMsg.className = 'glitch';
            errorMsg.textContent = '❌ ERROR: "NO" is not a valid option! ❌';
            document.getElementById('messageContainer').appendChild(errorMsg);
        }, 1000);
    });
}

// Start loading animation
function startLoading() {
    const newLoadingFill = document.getElementById('loadingFill');
    const newLoadingPercent = document.getElementById('loadingPercent');
    
    const loadingInterval = setInterval(() => {
        loadingProgress += Math.random() * 15;
        
        if (loadingProgress >= 100) {
            loadingProgress = 100;
            clearInterval(loadingInterval);
            // Show question after loading
            setTimeout(() => {
                showValentineQuestion();
            }, 500);
        }
        
        newLoadingFill.style.width = loadingProgress + '%';
        newLoadingPercent.textContent = Math.floor(loadingProgress);
    }, 300);
}

// Show Valentine question
function showValentineQuestion() {
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.innerHTML = '';
    
    // Add question
    const questionDiv = document.createElement('div');
    questionDiv.innerHTML = `
        <p class="question-text">💕 Can you be my valentine date? 💕</p>
    `;
    messageContainer.appendChild(questionDiv);
    
    // Show buttons
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'buttons';
    buttonsDiv.id = 'buttons';
    buttonsDiv.innerHTML = `
        <button class="accept-btn" id="yesBtn">YES! 😊</button>
        <button class="decline-btn" id="noBtn">NO</button>
    `;
    virusScreen.appendChild(buttonsDiv);
    
    // Initialize button listeners
    initializeButtons();
}

// Create confetti effect
function createConfetti() {
    const colors = ['#ff6b9d', '#c06c84', '#ff0', '#f00', '#fff', '#0ff'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            confetti.style.opacity = '1';
            confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
            confetti.style.transition = 'all 3s ease-in';
            confetti.style.pointerEvents = 'none';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.style.top = window.innerHeight + 'px';
                confetti.style.opacity = '0';
                confetti.style.transform = 'rotate(' + (Math.random() * 720 + 360) + 'deg)';
            }, 10);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 30);
    }
}


// Add typing effect for virus messages
function typeMessage() {
    const messages = document.querySelectorAll('.message p');
    messages.forEach((msg, index) => {
        msg.style.opacity = '0';
        setTimeout(() => {
            msg.style.transition = 'opacity 0.5s';
            msg.style.opacity = '1';
        }, index * 500);
    });
}

// Add random glitch effects
function addGlitchEffects() {
    setInterval(() => {
        const glitchElements = document.querySelectorAll('.glitch');
        glitchElements.forEach(el => {
            el.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
        });
    }, 100);
}

// Play alert sounds (using Web Audio API)
function playAlertSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
    
    setTimeout(() => {
        const oscillator2 = audioContext.createOscillator();
        const gainNode2 = audioContext.createGain();
        
        oscillator2.connect(gainNode2);
        gainNode2.connect(audioContext.destination);
        
        oscillator2.frequency.value = 600;
        oscillator2.type = 'sine';
        
        gainNode2.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator2.start(audioContext.currentTime);
        oscillator2.stop(audioContext.currentTime + 0.5);
    }, 200);
}

// Initialize
window.addEventListener('load', () => {
    addGlitchEffects();
});

// Prevent right-click for added effect
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    alert('⚠️ System function disabled by LOVE VIRUS! ❤️');
});

// Add random "system" messages
const systemMessages = [
    'Scanning heart... ❤️',
    'Detecting cuteness levels... 📈',
    'Installing romantic protocols... 💕',
    'Bypassing resistance... 😏',
    'Love infection at 100%... 💘'
];

let messageIndex = 0;
setInterval(() => {
    if (loadingProgress < 100) {
        console.log(systemMessages[messageIndex % systemMessages.length]);
        messageIndex++;
    }
}, 2000);
