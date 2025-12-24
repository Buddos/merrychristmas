document.addEventListener('DOMContentLoaded', function() {
    console.log('🎄 Merry Christmas! Website loaded successfully!');
    
    // Add click handlers for icons
    const treeIcon = document.getElementById('treeIcon');
    const starIcon = document.getElementById('starIcon');
    
    if (treeIcon) {
        treeIcon.addEventListener('click', function() {
            openModal('treeModal');
        });
    }
    
    if (starIcon) {
        starIcon.addEventListener('click', function() {
            openModal('starModal');
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
                    // Optional: Show a subtle toast notification
                    showNotification('Christmas message copied! 🎅');
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
            
            // Play celebration sound if available
            playCelebrationSound();
            
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
            const rotation = Math.random() * 720;
            
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
            // Create a simple beep sound using Web Audio API
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 880; // A5 note
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
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
        
        @keyframes floatBackground {
            0% { transform: translate(0, 0) scale(1); }
            100% { transform: translate(-50px, -50px) scale(1.1); }
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
                bottom: 20px;
                right: 20px;
                background: rgba(255, 255, 255, 0.1);
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 14px;
                backdrop-filter: blur(5px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                z-index: 1000;
            `;
            
            document.body.appendChild(countdownEl);
        }
    }
    
    // Initialize countdown
    updateChristmasCountdown();
    
    // Auto-start snowfall after 3 seconds
    setTimeout(() => {
        createSnowflakes(5); // Light background snowfall
    }, 3000);
});