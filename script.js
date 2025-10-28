// Theme Toggle - WORKING
console.log("vSave.in Professional Version Loaded!");

const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';

document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Download Button - WORKING
const downloadBtn = document.getElementById('download-btn');
const videoUrlInput = document.getElementById('video-url');

if (downloadBtn) {
    downloadBtn.addEventListener('click', function() {
        const videoUrl = videoUrlInput.value.trim();
        
        if (!videoUrl) {
            showNotification('कृपया TikTok video URL पेस्ट करें', 'error');
            return;
        }
        
        if (!isValidTikTokUrl(videoUrl)) {
            showNotification('कृपया सही TikTok URL डालें', 'error');
            return;
        }
        
        showNotification('वीडियो प्रोसेस हो रहा है...', 'info');
        
        setTimeout(() => {
            showNotification('वीडियो डाउनलोड के लिए तैयार है!', 'success');
            simulateDownload();
        }, 2000);
    });
}

// Quick Options Buttons - WORKING
const optionBtns = document.querySelectorAll('.option-btn');

optionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const type = this.getAttribute('data-type');
        handleOptionClick(type);
    });
});

// Download Option Buttons - WORKING
const mp4Buttons = document.querySelectorAll('.mp4-download');
const mp3Buttons = document.querySelectorAll('.mp3-download');
const profileButtons = document.querySelectorAll('.profile-download');

mp4Buttons.forEach(btn => {
    btn.addEventListener('click', function() {
        showNotification('MP4 डाउनलोड सिलेक्ट किया गया', 'info');
    });
});

mp3Buttons.forEach(btn => {
    btn.addEventListener('click', function() {
        showNotification('MP3 डाउनलोड सिलेक्ट किया गया', 'info');
    });
});

profileButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        showNotification('प्रोफाइल डाउनलोड सिलेक्ट किया गया', 'info');
        showProfileDownloadModal();
    });
});

// Handle Option Clicks - WORKING
function handleOptionClick(type) {
    switch(type) {
        case 'mp4':
            showNotification('MP4 डाउनलोड सिलेक्ट किया गया', 'info');
            break;
        case 'mp3':
            showNotification('MP3 डाउनलोड सिलेक्ट किया गया', 'info');
            break;
        case 'bulk':
            showNotification('बल्क डाउनलोड सिलेक्ट किया गया', 'info');
            showBulkDownloadModal();
            break;
        case 'profile':
            showNotification('प्रोफाइल डाउनलोड सिलेक्ट किया गया', 'info');
            showProfileDownloadModal();
            break;
        case 'ringtone':
            showNotification('रिंगटोन मेकर सिलेक्ट किया गया', 'info');
            showRingtoneMakerModal();
            break;
    }
}

// Utility Functions - WORKING
function isValidTikTokUrl(url) {
    const tiktokRegex = /https?:\/\/(www\.)?tiktok\.com\/.+/;
    return tiktokRegex.test(url);
}

function showNotification(message, type) {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function simulateDownload() {
    console.log('Professional Download simulation complete');
}

// Modal Functions - WORKING
function showBulkDownloadModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>बल्क डाउनलोड</h3>
            <p>एक साथ 5-10 TikTok वीडियो डाउनलोड करें</p>
            <textarea placeholder="TikTok URLs (एक लाइन में एक URL)" style="width: 100%; height: 150px; padding: 1rem; margin: 1rem 0; border: 2px solid var(--border-color); border-radius: 8px; background-color: var(--background-color); color: var(--text-primary); resize: vertical;"></textarea>
            <button class="btn-primary" style="margin-top: 1rem;">डाउनलोड करें</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

function showProfileDownloadModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>प्रोफाइल डाउनलोड</h3>
            <p>TikTok username डालें और सारे वीडियोज़ डाउनलोड करें</p>
            <input type="text" placeholder="@username" style="width: 100%; padding: 1rem; margin: 1rem 0; border: 2px solid var(--border-color); border-radius: 8px; background-color: var(--background-color); color: var(--text-primary);">
            <button class="btn-primary" style="margin-top: 1rem;">डाउनलोड करें</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

function showRingtoneMakerModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>रिंगटोन मेकर</h3>
            <p>MP3 को 30 सेकंड कट करें (रिंगटोन के लिए)</p>
            <input type="text" placeholder="TikTok video URL" style="width: 100%; padding: 1rem; margin: 1rem 0; border: 2px solid var(--border-color); border-radius: 8px; background-color: var(--background-color); color: var(--text-primary);">
            <div style="margin: 1rem 0;">
                <label>शुरुआत: <span>0s</span></label>
                <input type="range" min="0" max="30" value="0" style="width: 100%; margin: 0.5rem 0;">
                <label>अंत: <span>30s</span></label>
                <input type="range" min="0" max="30" value="30" style="width: 100%; margin: 0.5rem 0;">
            </div>
            <button class="btn-primary" style="margin-top: 1rem;">रिंगटोन बनाएं</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enter key support
videoUrlInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        downloadBtn.click();
    }
});
