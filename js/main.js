document.addEventListener('DOMContentLoaded', function() {
    console.log('🎄 Merry Christmas! Website loaded successfully!');
    
    // Christmas Music Player
    let audio = null;
    let felizNavidadAudio = null;
    let isPlaying = false;
    let isFelizNavidadPlaying = false;
    let musicToggleBtn = null;
    let felizNavidadBtn = null;
    
    // Initialize music
    function initializeMusic() {
        // Create audio element with Jingle Bells music
        audio = new Audio();
        audio.src = 'https://assets.mixkit.co/music/preview/mixkit-jingle-bells-311.mp3';
        audio.loop = true;
        audio.volume = 0.3;
        audio.preload = 'auto';
        
        // Create audio element for Feliz Navidad
        felizNavidadAudio = new Audio();
        felizNavidadAudio.src = 'https://assets.mixkit.co/music/preview/mixkit-feliz-navidad-319.mp3';
        felizNavidadAudio.loop = false;
        felizNavidadAudio.volume = 0.4;
        felizNavidadAudio.preload = 'auto';
        
        // Create music toggle button if it doesn't exist
        if (!document.getElementById('musicToggle')) {
            musicToggleBtn = document.createElement('button');
            musicToggleBtn.id = 'musicToggle';
            musicToggleBtn.innerHTML = '🎵 Play Jingle Bells';
            musicToggleBtn.style.cssText = `
                position: fixed;
                bottom: 70px;
                left: 20px;
                background: rgba(255, 255, 255, 0.1);
                color: white;
                border: 1px solid rgba(255, 255, 255, 0.2);
                padding: 8px 16px;
                border-radius: 20px;
                cursor: pointer;
                font-size: 14px;
                backdrop-filter: blur(5px);
                z-index: 1000;
                transition: all 0.3s ease;
            `;
            
            musicToggleBtn.addEventListener('mouseenter', () => {
                musicToggleBtn.style.background = 'rgba(255, 255, 255, 0.2)';
                musicToggleBtn.style.transform = 'translateY(-2px)';
                musicToggleBtn.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
            });
            
            musicToggleBtn.addEventListener('mouseleave', () => {
                musicToggleBtn.style.background = 'rgba(255, 255, 255, 0.1)';
                musicToggleBtn.style.transform = 'translateY(0)';
                musicToggleBtn.style.boxShadow = 'none';
            });
            
            document.body.appendChild(musicToggleBtn);
        } else {
            musicToggleBtn = document.getElementById('musicToggle');
        }
        
        // Create Feliz Navidad button
        if (!document.getElementById('felizNavidadBtn')) {
            felizNavidadBtn = document.createElement('button');
            felizNavidadBtn.id = 'felizNavidadBtn';
            felizNavidadBtn.innerHTML = '🎶 Feliz Navidad';
            felizNavidadBtn.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 20px;
                background: linear-gradient(45deg, #c41e3a, #ff6b6b);
                color: white;
                border: 1px solid rgba(255, 255, 255, 0.3);
                padding: 10px 20px;
                border-radius: 20px;
                cursor: pointer;
                font-size: 14px;
                font-weight: bold;
                backdrop-filter: blur(5px);
                z-index: 1000;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(196, 30, 58, 0.3);
            `;
            
            felizNavidadBtn.addEventListener('mouseenter', () => {
                felizNavidadBtn.style.background = 'linear-gradient(45deg, #ff6b6b, #c41e3a)';
                felizNavidadBtn.style.transform = 'translateY(-2px) scale(1.05)';
                felizNavidadBtn.style.boxShadow = '0 6px 20px rgba(196, 30, 58, 0.4)';
            });
            
            felizNavidadBtn.addEventListener('mouseleave', () => {
                felizNavidadBtn.style.background = 'linear-gradient(45deg, #c41e3a, #ff6b6b)';
                felizNavidadBtn.style.transform = 'translateY(0) scale(1)';
                felizNavidadBtn.style.boxShadow = '0 4px 15px rgba(196, 30, 58, 0.3)';
            });
            
            document.body.appendChild(felizNavidadBtn);
        } else {
            felizNavidadBtn = document.getElementById('felizNavidadBtn');
        }
        
        // Add music toggle functionality
        musicToggleBtn.addEventListener('click', toggleJingleBells);
        felizNavidadBtn.addEventListener('click', playFelizNavidad);
        
        // When Feliz Navidad ends, update button
        felizNavidadAudio.addEventListener('ended', () => {
            isFelizNavidadPlaying = false;
            felizNavidadBtn.innerHTML = '🎶 Feliz Navidad';
            felizNavidadBtn.style.background = 'linear-gradient(45deg, #c41e3a, #ff6b6b)';
        });
        
        // Auto-play music after user interaction (browser policy)
        document.addEventListener('click', enableAutoPlay, { once: true });
    }
    
    function enableAutoPlay() {
        // Enable autoplay by playing/pausing quickly
        if (audio && !isPlaying) {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    audio.pause();
                    audio.currentTime = 0;
                }).catch(() => {
                    console.log('Auto-play prevented by browser');
                });
            }
        }
    }
    
    function toggleJingleBells() {
        if (!audio) return;
        
        if (isPlaying) {
            audio.pause();
            musicToggleBtn.innerHTML = '🎵 Play Jingle Bells';
            isPlaying = false;
            showNotification('Jingle Bells paused');
        } else {
            // Stop Feliz Navidad if playing
            if (isFelizNavidadPlaying) {
                felizNavidadAudio.pause();
                felizNavidadAudio.currentTime = 0;
                isFelizNavidadPlaying = false;
                felizNavidadBtn.innerHTML = '🎶 Feliz Navidad';
                felizNavidadBtn.style.background = 'linear-gradient(45deg, #c41e3a, #ff6b6b)';
            }
            
            audio.play().then(() => {
                musicToggleBtn.innerHTML = '⏸️ Jingle Bells Playing';
                isPlaying = true;
                showNotification('🎶 Jingle Bells started!');
                
                // Add visual music note animation
                createMusicNotes(3, '#ffd700');
            }).catch(err => {
                console.log('Audio play failed:', err);
                musicToggleBtn.innerHTML = '🎵 Click to Play';
                showNotification('Click the music button to start Christmas music!');
            });
        }
    }
    
    function playFelizNavidad() {
        if (!felizNavidadAudio) return;
        
        if (isFelizNavidadPlaying) {
            felizNavidadAudio.pause();
            felizNavidadAudio.currentTime = 0;
            isFelizNavidadPlaying = false;
            felizNavidadBtn.innerHTML = '🎶 Feliz Navidad';
            felizNavidadBtn.style.background = 'linear-gradient(45deg, #c41e3a, #ff6b6b)';
            showNotification('Feliz Navidad stopped');
        } else {
            // Stop Jingle Bells if playing
            if (isPlaying) {
                audio.pause();
                isPlaying = false;
                musicToggleBtn.innerHTML = '🎵 Play Jingle Bells';
            }
            
            felizNavidadAudio.currentTime = 0;
            felizNavidadAudio.play().then(() => {
                isFelizNavidadPlaying = true;
                felizNavidadBtn.innerHTML = '⏸️ Playing Feliz Navidad';
                felizNavidadBtn.style.background = 'linear-gradient(45deg, #ff0000, #ff6b6b)';
                
                showNotification('🎶 ¡Feliz Navidad! 🎄');
                
                // Create special Spanish-themed animations
                createFelizNavidadEffects();
                createMusicNotes(5, '#c41e3a');
                
                // Show Spanish message
                showSpanishMessage();
                
            }).catch(err => {
                console.log('Feliz Navidad play failed:', err);
                felizNavidadBtn.innerHTML = '🎶 Click to Play';
                showNotification('Click to play Feliz Navidad!');
            });
        }
    }
    
    function showSpanishMessage() {
        const messages = [
            "¡Feliz Navidad y Próspero Año Nuevo!",
            "¡Que la paz y el amor reinen en tu hogar!",
            "¡Brindemos por la Navidad! 🥂",
            "¡Muchas felicidades en esta Navidad!",
            "¡Que tengas una Navidad llena de alegría!"
        ];
        
        const message = messages[Math.floor(Math.random() * messages.length)];
        const spanishMsg = document.createElement('div');
        spanishMsg.className = 'spanish-message';
        spanishMsg.innerHTML = `🇪🇸 ${message}`;
        spanishMsg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(196, 30, 58, 0.9);
            color: white;
            padding: 15px 25px;
            border-radius: 15px;
            font-size: 18px;
            font-weight: bold;
            z-index: 1001;
            animation: spanishMessage 3s ease forwards;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            border: 2px solid rgba(255, 255, 255, 0.3);
        `;
        
        document.body.appendChild(spanishMsg);
        
        setTimeout(() => {
            if (spanishMsg.parentNode) {
                spanishMsg.remove();
            }
        }, 3000);
    }
    
    function createFelizNavidadEffects() {
        // Create Spanish flag colors confetti
        const spanishColors = ['#c41e3a', '#ffc400', '#c41e3a']; // Red, Yellow, Red
        
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '12px';
            confetti.style.height = '8px';
            confetti.style.backgroundColor = spanishColors[Math.floor(Math.random() * spanishColors.length)];
            confetti.style.borderRadius = '4px';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-20px';
            confetti.style.zIndex = '9997';
            confetti.style.pointerEvents = 'none';
            confetti.style.opacity = '0.9';
            
            const duration = Math.random() * 2 + 2;
            const delay = Math.random() * 0.5;
            
            confetti.style.animation = `
                fall ${duration}s linear ${delay}s forwards,
                rotate ${duration}s linear ${delay}s infinite
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.remove();
                }
            }, (duration + delay) * 1000);
        }
        
        // Create guitar notes
        for (let i = 0; i < 5; i++) {
            const guitar = document.createElement('div');
            guitar.innerHTML = '🎸';
            guitar.style.position = 'fixed';
            guitar.style.left = Math.random() * 100 + 'vw';
            guitar.style.top = '100vh';
            guitar.style.fontSize = '30px';
            guitar.style.opacity = '0.8';
            guitar.style.zIndex = '9996';
            guitar.style.animation = `guitarFloat ${Math.random() * 3 + 3}s ease-in forwards`;
            
            document.body.appendChild(guitar);
            
            setTimeout(() => {
                if (guitar.parentNode) {
                    guitar.remove();
                }
            }, 5000);
        }
    }
    
    // Create floating music notes animation
    function createMusicNotes(count, color = '#ffd700') {
        const notes = ['♪', '♫', '🎵', '🎶', '🎼'];
        
        for (let i = 0; i < count; i++) {
            const note = document.createElement('div');
            note.innerHTML = notes[Math.floor(Math.random() * notes.length)];
            note.style.position = 'fixed';
            note.style.left = Math.random() * 100 + 'vw';
            note.style.top = '100vh';
            note.style.fontSize = (Math.random() * 20 + 20) + 'px';
            note.style.opacity = '0.7';
            note.style.zIndex = '9995';
            note.style.pointerEvents = 'none';
            note.style.animation = `floatUp ${Math.random() * 3 + 3}s ease-in forwards`;
            note.style.color = color;
            
            document.body.appendChild(note);
            
            setTimeout(() => {
                if (note.parentNode) {
                    note.remove();
                }
            }, 5000);
        }
    }
    
    // Initialize music player
    initializeMusic();
    
    // Add click handlers for icons
    const treeIcon = document.getElementById('treeIcon');
    const starIcon = document.getElementById('starIcon');
    
    if (treeIcon) {
        treeIcon.addEventListener('click', function() {
            openModal('treeModal');
            // Play tree sound effect
            playSoundEffect('tree');
        });
    }
    
    if (starIcon) {
        starIcon.addEventListener('click', function() {
            openModal('starModal');
            // Play star sound effect
            playSoundEffect('star');
        });
    }
    
    // Modal functions
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'grid';
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            
            // Add opening animation
            modal.style.opacity = '0';
            modal.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                modal.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                modal.style.opacity = '1';
                modal.style.transform = 'scale(1)';
            }, 10);
            
            // Focus on close button
            const closeBtn = modal.querySelector('.close');
            if (closeBtn) closeBtn.focus();
        }
    }
    
    function closeModal(modal) {
        if (modal) {
            modal.style.opacity = '0';
            modal.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                modal.style.display = 'none';
                modal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = 'auto';
            }, 300);
        }
    }
    
    // Close modal buttons
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal-backdrop');
            closeModal(modal);
        });
    });
    
    // Close modal on backdrop click
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-backdrop[aria-hidden="false"]').forEach(modal => {
                closeModal(modal);
            });
        }
    });
    
    // Play sound effects
    function playSoundEffect(type) {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Different sounds for different actions
            switch(type) {
                case 'tree':
                    oscillator.frequency.value = 440; // A4
                    oscillator.type = 'sine';
                    break;
                case 'star':
                    oscillator.frequency.value = 523.25; // C5
                    oscillator.type = 'triangle';
                    break;
                case 'celebrate':
                    oscillator.frequency.value = 659.25; // E5
                    oscillator.type = 'sawtooth';
                    break;
                case 'feliz':
                    // Spanish guitar-like sound
                    oscillator.frequency.value = 392; // G4
                    oscillator.type = 'sine';
                    break;
                default:
                    oscillator.frequency.value = 440;
                    oscillator.type = 'sine';
            }
            
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (e) {
            console.log('Sound effect failed:', e);
        }
    }
    
    // Copy message button with enhanced feedback
    const copyBtn = document.getElementById('copy');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const title = document.getElementById('title')?.textContent || 'Merry Christmas!';
            const message = document.getElementById('message')?.textContent || 'Wishing you joy and peace!';
            const fullText = `${title} - ${message}`;
            
            // Visual feedback
            const originalText = this.innerHTML;
            this.innerHTML = '✅ Copied!';
            this.style.backgroundColor = '#1a9b1a';
            
            // Reset button after 2 seconds
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.backgroundColor = '';
            }, 2000);
            
            // Copy to clipboard
            navigator.clipboard.writeText(fullText)
                .then(() => {
                    showNotification('Christmas message copied! 🎅');
                    playSoundEffect('celebrate');
                })
                .catch(err => {
                    console.log('Copy failed:', err);
                    this.innerHTML = '📋 Failed!';
                    setTimeout(() => {
                        this.innerHTML = originalText;
                    }, 2000);
                });
        });
    }
    
    // Share button
    const shareBtn = document.getElementById('share');
    if (shareBtn) {
        shareBtn.addEventListener('click', async function() {
            const title = document.getElementById('title')?.textContent || 'Merry Christmas!';
            const message = document.getElementById('message')?.textContent || 'Wishing you joy and peace!';
            const shareText = `${title} - ${message}`;
            
            // Visual feedback
            const originalText = this.innerHTML;
            this.innerHTML = '📤 Sharing...';
            
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: 'Christmas Greetings',
                        text: shareText,
                        url: window.location.href
                    });
                    this.innerHTML = '✅ Shared!';
                    playSoundEffect('celebrate');
                } catch (err) {
                    console.log('Share cancelled:', err);
                    this.innerHTML = originalText;
                }
            } else {
                // Fallback: Copy to clipboard
                navigator.clipboard.writeText(shareText + '\n\n' + window.location.href)
                    .then(() => {
                        this.innerHTML = '📋 Link Copied!';
                        showNotification('Link copied to clipboard! Share it manually.');
                        playSoundEffect('celebrate');
                    })
                    .catch(() => {
                        this.innerHTML = '❌ Failed';
                    });
            }
            
            // Reset button after 3 seconds
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 3000);
        });
    }
    
    // Celebrate button with enhanced effects
    const celebrateBtn = document.getElementById('celebrate');
    if (celebrateBtn) {
        celebrateBtn.addEventListener('click', function() {
            // Button feedback
            const originalText = this.innerHTML;
            this.innerHTML = '🎇 Celebrating!';
            this.style.background = 'linear-gradient(90deg, #ff7f50, #ffd166, #ff7f50)';
            
            // Page shake effect
            document.body.style.animation = 'none';
            setTimeout(() => {
                document.body.style.animation = 'celebrate 0.8s ease';
            }, 10);
            
            // Create multiple effects
            createSnowflakes(25);
            createConfetti(50);
            createTwinklingLights(10);
            
            // Play celebration sound
            playCelebrationSound();
            
            // Play Feliz Navidad if not already playing
            if (!isFelizNavidadPlaying && !isPlaying) {
                felizNavidadBtn.click();
            }
            
            // Create music notes
            createMusicNotes(10, '#ff6b6b');
            
            // Reset button after 2 seconds
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.background = '';
            }, 2000);
        });
    }
    
    // Create falling snowflakes
    function createSnowflakes(count) {
        for (let i = 0; i < count; i++) {
            const snowflake = document.createElement('div');
            const snowTypes = ['❄️', '❅', '❆', '⛄', '🎄'];
            snowflake.innerHTML = snowTypes[Math.floor(Math.random() * snowTypes.length)];
            
            snowflake.style.position = 'fixed';
            snowflake.style.left = Math.random() * 100 + 'vw';
            snowflake.style.top = '-30px';
            snowflake.style.fontSize = (Math.random() * 20 + 15) + 'px';
            snowflake.style.opacity = Math.random() * 0.6 + 0.3;
            snowflake.style.zIndex = '9998';
            snowflake.style.pointerEvents = 'none';
            snowflake.style.userSelect = 'none';
            
            // Random animation
            const duration = Math.random() * 3 + 3;
            const delay = Math.random() * 2;
            snowflake.style.animation = `
                fall ${duration}s linear ${delay}s forwards,
                sway ${duration * 2}s ease-in-out ${delay}s infinite
            `;
            
            document.body.appendChild(snowflake);
            
            // Remove snowflake after animation
            setTimeout(() => {
                if (snowflake.parentNode) {
                    snowflake.remove();
                }
            }, (duration + delay) * 1000);
        }
    }
    
    // Create confetti effect
    function createConfetti(count) {
        const colors = ['#ff0000', '#1a9b1a', '#ffd700', '#1e90ff', '#ff69b4', '#9370db'];
        
        for (let i = 0; i < count; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-20px';
            confetti.style.zIndex = '9997';
            confetti.style.pointerEvents = 'none';
            confetti.style.opacity = '0.8';
            
            const duration = Math.random() * 2 + 1;
            const delay = Math.random() * 0.5;
            
            confetti.style.animation = `
                fall ${duration}s linear ${delay}s forwards,
                rotate ${duration}s linear ${delay}s infinite
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.remove();
                }
            }, (duration + delay) * 1000);
        }
    }
    
    // Create twinkling lights around the card
    function createTwinklingLights(count) {
        const card = document.querySelector('.card');
        if (!card) return;
        
        const cardRect = card.getBoundingClientRect();
        
        for (let i = 0; i < count; i++) {
            const light = document.createElement('div');
            light.style.position = 'fixed';
            light.style.width = '8px';
            light.style.height = '8px';
            light.style.backgroundColor = ['#ff0000', '#1a9b1a', '#ffd700', '#ffffff'][Math.floor(Math.random() * 4)];
            light.style.borderRadius = '50%';
            light.style.boxShadow = '0 0 10px currentColor';
            light.style.left = (cardRect.left + Math.random() * cardRect.width) + 'px';
            light.style.top = (cardRect.top + Math.random() * cardRect.height) + 'px';
            light.style.zIndex = '9996';
            light.style.pointerEvents = 'none';
            light.style.animation = `twinkle 0.5s ease ${Math.random() * 0.5}s ${Math.random() > 0.5 ? 'alternate' : 'normal'} infinite`;
            
            document.body.appendChild(light);
            
            setTimeout(() => {
                if (light.parentNode) {
                    light.remove();
                }
            }, 3000);
        }
    }
    
    // Play celebration sound
    function playCelebrationSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Play a Christmas melody
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime); // E5
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.2);
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.3);
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.4);
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.5);
            
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.8);
        } catch (e) {
            console.log('Audio not supported:', e);
        }
    }
    
    // Show notification function
    function showNotification(message) {
        // Remove existing notification
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();
        
        // Create new notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 10000;
            animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            border-left: 4px solid #1a9b1a;
            max-width: 300px;
            font-family: inherit;
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }
    
    // ========== FIREWORKS FUNCTIONALITY ==========
    // This was missing from your main.js - adding it now!
    (function initializeFireworks() {
        const canvas = document.getElementById('fireworks');
        if (!canvas) {
            console.warn('Fireworks canvas not found');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        let w = canvas.width = window.innerWidth;
        let h = canvas.height = window.innerHeight;
        
        window.addEventListener('resize', () => { 
            w = canvas.width = window.innerWidth; 
            h = canvas.height = window.innerHeight; 
        });

        const particles = [];
        
        function launch(x, y, color = null) {
            const hue = color || Math.random() * 360;
            for(let i = 0; i < 60; i++) {
                particles.push({
                    x, y,
                    vx: (Math.random() - 0.5) * 6,
                    vy: (Math.random() - 0.5) * 6,
                    life: 60 + Math.random() * 40,
                    hue,
                    size: 1 + Math.random() * 3
                });
            }
        }

        function renderFireworks() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
            ctx.fillRect(0, 0, w, h);
            
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx; 
                p.y += p.vy;
                p.vy += 0.02;
                p.life--;
                
                if (p.life <= 0) {
                    particles.splice(i, 1);
                } else {
                    ctx.beginPath();
                    ctx.fillStyle = `hsla(${p.hue}, 90%, ${50 - p.life * 0.2}%, ${p.life / 80})`;
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            requestAnimationFrame(renderFireworks);
        }
        
        renderFireworks();

        // Trigger fireworks on Celebrate button
        const celebrateBtn = document.getElementById('celebrate');
        if (celebrateBtn) {
            celebrateBtn.addEventListener('click', function(e) {
                const colors = [0, 120, 60, 240]; // Christmas colors
                for (let i = 0; i < 8; i++) {
                    setTimeout(() => {
                        const x = window.innerWidth * (0.1 + Math.random() * 0.8);
                        const y = window.innerHeight * (0.1 + Math.random() * 0.4);
                        launch(x, y, colors[Math.floor(Math.random() * colors.length)]);
                    }, i * 100);
                }
            });
        }

        // Click anywhere to spawn fireworks (except on card buttons)
        document.addEventListener('click', (e) => {
            if (e.target.closest('.card') && !e.target.closest('#celebrate')) return;
            launch(e.clientX, e.clientY);
        });
        
        console.log('🎆 Fireworks initialized!');
    })();
    // ========== END FIREWORKS ==========
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            to { 
                transform: translateY(100vh) rotate(360deg); 
            }
        }
        
        @keyframes sway {
            0%, 100% { transform: translateX(0) rotate(0deg); }
            50% { transform: translateX(20px) rotate(180deg); }
        }
        
        @keyframes rotate {
            to { transform: rotate(360deg); }
        }
        
        @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes celebrate {
            0%, 100% { transform: translateX(0) scale(1); }
            25% { transform: translateX(-10px) scale(1.02); }
            50% { transform: translateX(10px) scale(1.02); }
            75% { transform: translateX(-5px) scale(1.01); }
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        @keyframes floatUp {
            from { 
                transform: translateY(0) rotate(0deg); 
                opacity: 0.8;
            }
            to { 
                transform: translateY(-100vh) rotate(360deg); 
                opacity: 0;
            }
        }
        
        @keyframes guitarFloat {
            from { 
                transform: translateY(0) rotate(0deg); 
                opacity: 0.8;
            }
            to { 
                transform: translateY(-100vh) rotate(720deg); 
                opacity: 0;
            }
        }
        
        @keyframes spanishMessage {
            0% { 
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8);
            }
            20% { 
                opacity: 1;
                transform: translate(-50%, -50%) scale(1.1);
            }
            40% { 
                transform: translate(-50%, -50%) scale(1);
            }
            80% { 
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
            100% { 
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.9);
            }
        }
        
        @keyframes floatBackground {
            0% { transform: translate(0, 0) scale(1); }
            100% { transform: translate(-50px, -50px) scale(1.1); }
        }
        
        /* Add subtle background animation */
        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
                radial-gradient(circle at 20% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 0, 0, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(0, 128, 0, 0.1) 0%, transparent 50%);
            animation: floatBackground 20s ease-in-out infinite alternate;
            pointer-events: none;
            z-index: 1;
        }
    `;
    document.head.appendChild(style);
    
    // Add keyboard accessibility for icons
    ['treeIcon', 'starIcon'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    el.click();
                }
            });
            
            // Add hover effect
            el.addEventListener('mouseenter', () => {
                el.style.transform = 'scale(1.1)';
                el.style.boxShadow = '0 8px 20px rgba(0,0,0,0.3)';
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = '';
                el.style.boxShadow = '';
            });
        }
    });
    
    // Add a Christmas countdown (optional)
    function updateChristmasCountdown() {
        const now = new Date();
        const currentYear = now.getFullYear();
        let christmas = new Date(currentYear, 11, 25); // December 25
        
        // If Christmas has passed this year, use next year
        if (now > christmas) {
            christmas = new Date(currentYear + 1, 11, 25);
        }
        
        const diff = christmas - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        
        // Add countdown to page if not already present
        if (days >= 0 && !document.getElementById('countdown')) {
            const countdownEl = document.createElement('div');
            countdownEl.id = 'countdown';
            countdownEl.innerHTML = `🎅 ${days} days until Christmas!`;
            countdownEl.style.cssText = `
                position: fixed;
                bottom: 70px;
                right: 20px;
                background: rgba(255, 255, 255, 0.1);
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 14px;
                backdrop-filter: blur(5px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                z-index: 1000;
                transition: all 0.3s ease;
            `;
            
            // Add hover effect to countdown
            countdownEl.addEventListener('mouseenter', () => {
                countdownEl.style.background = 'rgba(255, 255, 255, 0.2)';
                countdownEl.style.transform = 'translateY(-2px)';
            });
            
            countdownEl.addEventListener('mouseleave', () => {
                countdownEl.style.background = 'rgba(255, 255, 255, 0.1)';
                countdownEl.style.transform = 'translateY(0)';
            });
            
            document.body.appendChild(countdownEl);
        }
    }
    
    // Initialize countdown
    updateChristmasCountdown();
    
    // Auto-start snowfall after 3 seconds
    setTimeout(() => {
        createSnowflakes(5); // Light background snowfall
    }, 3000);
    
    // Show welcome message with music suggestion
    setTimeout(() => {
        if (!isPlaying && !isFelizNavidadPlaying) {
            showNotification('🎄 Try the Feliz Navidad button for Spanish Christmas music!');
        }
    }, 5000);
    
    // Auto-play Feliz Navidad when page loads (after user interaction)
    document.addEventListener('click', function autoPlayFelizNavidad() {
        if (!isPlaying && !isFelizNavidadPlaying) {
            // Play Feliz Navidad on first click anywhere
            setTimeout(() => {
                felizNavidadBtn.click();
            }, 500);
        }
        document.removeEventListener('click', autoPlayFelizNavidad);
    }, { once: true });
    
    console.log('✨ All Christmas features loaded successfully!');
});