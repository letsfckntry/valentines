// Sweet Valentine's Day Surprise
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

// Show multiple love messages
function showVirusMessages() {
    const messages = [
        'LOVE DETECTED!',
        'Your heart has been touched by CUPID\'S LOVE SPELL',
        'This spell will make you smile uncontrollably!',
        'Side effects: Butterflies in stomach, endless joy, warm fuzzy feelings ✨'
    ];
    
    virusScreen.innerHTML = `
        <div class="warning-icon">💕</div>
        <h2>💖 Special Valentine's Alert 💖</h2>
        <div class="message" id="messageContainer">
            <p class="glitch">Sending love your way... 💘</p>
        </div>
    `;
    
    const messageContainer = document.getElementById('messageContainer');
    let messageIndex = 0;
    
    const messageInterval = setInterval(() => {
        if (messageIndex < messages.length) {
            const p = document.createElement('p');
            p.style.color = messageIndex === 0 ? '#ff1744' : (messageIndex === 1 || messageIndex === 2 ? '#c2185b' : '#ff6b9d');
            p.style.marginTop = '15px';
            p.style.fontSize = messageIndex === 1 ? '20px' : '18px';
            p.style.fontWeight = 'bold';
            if (messageIndex === 0) p.className = 'glitch';
            if (messageIndex === 1) {
                p.innerHTML = messages[messageIndex] + '<br><strong style="font-size: 24px; font-family: \'Pacifico\', cursive;">💕 CUPID\'S LOVE SPELL 💕</strong>';
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
                <p>Spreading love... ❤️ <span id="loadingPercent">0</span>%</p>
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

// Make NO button teleport when clicked
function makeNoButtonTeleport() {
    const noBtn = document.getElementById('noBtn');
    if (!noBtn) return;
    
    const container = noBtn.closest('.virus-container');
    
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Add teleport class
        noBtn.classList.add('teleport');
        
        // Get button and container dimensions using offset dimensions
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;
        
        // Calculate random position within container bounds
        const maxX = containerWidth - btnWidth - 40;
        const maxY = containerHeight - btnHeight - 40;
        
        const randomX = Math.max(20, Math.min(maxX, Math.random() * maxX));
        const randomY = Math.max(20, Math.min(maxY, Math.random() * maxY));
        
        // Teleport to new position
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
    });
    
    // Also teleport on hover for extra challenge
    noBtn.addEventListener('mouseenter', (e) => {
        e.preventDefault();
        
        noBtn.classList.add('teleport');
        
        // Get button and container dimensions using offset dimensions
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;
        
        // Calculate random position within container bounds
        const maxX = containerWidth - btnWidth - 40;
        const maxY = containerHeight - btnHeight - 40;
        
        const randomX = Math.max(20, Math.min(maxX, Math.random() * maxX));
        const randomY = Math.max(20, Math.min(maxY, Math.random() * maxY));
        
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
    });
}

// Initialize button event listeners
function initializeButtons() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    
    // Make NO button teleport
    makeNoButtonTeleport();
    
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
        <p class="question-text">💕 Will you be my Valentine? 💕</p>
    `;
    messageContainer.appendChild(questionDiv);
    
    // Show buttons
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'buttons';
    buttonsDiv.id = 'buttons';
    buttonsDiv.innerHTML = `
        <button class="accept-btn" id="yesBtn">YES! �</button>
        <button class="decline-btn" id="noBtn">NO 😢</button>
    `;
    virusScreen.appendChild(buttonsDiv);
    
    // Initialize button listeners
    initializeButtons();
}

// Create romantic confetti effect
function createConfetti() {
    const symbols = ['❤️', '💕', '💖', '💗', '💘', '💙', '💚', '💜', '💝', '🌹', '🌷', '✨'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.fontSize = '25px';
            confetti.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-50px';
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

// Play sweet alert sounds (using Web Audio API)
function playAlertSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Sweet chime sound
    oscillator.frequency.value = 523.25; // C5 note
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

// Prevent pull-to-refresh on mobile
document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });

document.addEventListener('touchmove', (e) => {
    e.preventDefault();
}, { passive: false });

// Prevent zoom on double tap
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Prevent scrolling
document.body.addEventListener('touchmove', (e) => {
    e.preventDefault();
}, { passive: false });

// Request fullscreen on mobile
function requestFullscreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen().catch(err => console.log('Fullscreen error:', err));
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}

// Initialize
window.addEventListener('load', () => {
    addGlitchEffects();
    
    // Try to go fullscreen on mobile
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        requestFullscreen();
    }
});

// Prevent right-click for added effect
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    alert('💖 Right-click disabled by the power of love! ❤️');
});

// Add sweet "system" messages
const systemMessages = [
    'Checking heart compatibility... ❤️',
    'Measuring cuteness levels... 📈',
    'Loading romantic moments... 💕',
    'Preparing butterflies... 🦋',
    'Love spell at 100%... 💘'
];

let messageIndex = 0;
setInterval(() => {
    if (loadingProgress < 100) {
        console.log(systemMessages[messageIndex % systemMessages.length]);
        messageIndex++;
    }
}, 2000);

// Create floating hearts background
function createFloatingHearts() {
    const floatingHeartsContainer = document.getElementById('floatingHearts');
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💝', '🌹'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart-float';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 5 + 6) + 's';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
        
        floatingHeartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 10000);
    }, 300);
}

// Start floating hearts when page loads
createFloatingHearts();
