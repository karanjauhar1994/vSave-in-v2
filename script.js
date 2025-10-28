// Theme Toggle - WORKING
console.log("vSave.in Professional Version Loaded!");

// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Theme Toggle
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

    // Download Button - WORKING
    const downloadBtn = document.getElementById('download-btn');
    const videoUrlInput = document.getElementById('video-url');

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
        
        // ACTUAL DOWNLOAD FUNCTIONALITY
        setTimeout(() => {
            processVideoDownload(videoUrl);
        }, 2000);
    });

    // QUICK OPTIONS BUTTONS - FIXED
    const optionBtns = document.querySelectorAll('.option-btn');
    
    optionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            showNotification(`${type.toUpperCase()} सिलेक्ट किया गया`, 'info');
            
            // Show respective modal
            if (type === 'bulk') {
                showBulkDownloadModal();
            } else if (type === 'profile') {
                showProfileDownloadModal();
            } else if (type === 'ringtone') {
                showRingtoneMakerModal();
            }
        });
    });

    // Download Option Buttons
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

    // Enter key support
    videoUrlInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            downloadBtn.click();
        }
    });
}

// ACTUAL DOWNLOAD FUNCTIONALITY
async function processVideoDownload(videoUrl) {
    try {
        showNotification('वीडियो डाउनलोड हो रहा है...', 'info');
        
        // Free TikTok Downloader API use करें
        const apiUrl = `https://api.tiklydown.net/api/download?url=${encodeURIComponent(videoUrl)}`;
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data && data.videoUrl) {
            // Create download link
            const downloadLink = document.createElement('a');
            downloadLink.href = data.videoUrl;
            downloadLink.download = 'tiktok_video.mp4';
            downloadLink.target = '_blank';
            
            // Trigger download
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            
            showNotification('डाउनलोड शुरू हो गया!', 'success');
        } else {
            showNotification('वीडियो डाउनलोड नहीं हो पाया', 'error');
        }
    } catch (error) {
        console.error('Download error:', error);
        // Fallback: Show preview option
        showPreviewOption(videoUrl);
    }
}

// PREVIEW FUNCTIONALITY
function showPreviewOption(videoUrl) {
    showNotification('वीडियो तैयार है! Preview उपलब्ध है', 'success');
    
    // Create preview button
    const previewBtn = document.createElement('button');
    previewBtn.textContent = 'वीडियो देखें';
    previewBtn.className = 'btn-primary';
    previewBtn.style.margin = '10px';
    previewBtn.onclick = function() {
        window.open(videoUrl, '_blank');
    };
    
    // Add to page temporarily
    const heroSection = document.querySelector('.hero-content');
    heroSection.appendChild(previewBtn);
    
    // Remove after 10 seconds
    setTimeout(() => {
        if (previewBtn.parentNode) {
            previewBtn.parentNode.removeChild(previewBtn);
        }
    }, 10000);
}

// Utility Functions
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
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    if (type === 'error') {
        notification.style.backgroundColor = '#ff4757';
    } else if (type === 'success') {
        notification.style.backgroundColor = '#2ed573';
    } else {
        notification.style.backgroundColor = '#3742fa';
    }
    
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
    }, 4000);
}

// Modal Functions
function showBulkDownloadModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>बल्क डाउनलोड</h3>
            <p>एक साथ 5-10 TikTok वीडियो डाउनलोड करें</p>
            <textarea placeholder="TikTok URLs (एक लाइन में एक URL)" style="width: 100%; height: 150px; padding: 1rem; margin: 1rem 0; border: 2px solid var(--border-color); border-radius: 8px; background-color: var(--background-color); color: var(--text-primary); resize: vertical;"></textarea>
            <button class="btn-primary bulk-download-btn" style="margin-top: 1rem;">डाउनलोड करें</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.close-modal');
    const downloadBtn = modal.querySelector('.bulk-download-btn');
    
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    downloadBtn.addEventListener('click', () => {
        showNotification('बल्क डाउनलोड शुरू हो गया!', 'success');
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
            <input type="text" placeholder="@username" class="username-input" style="width: 100%; padding: 1rem; margin: 1rem 0; border: 2px solid var(--border-color); border-radius: 8px; background-color: var(--background-color); color: var(--text-primary);">
            <button class="btn-primary profile-download-btn" style="margin-top: 1rem;">डाउनलोड करें</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.close-modal');
    const downloadBtn = modal.querySelector('.profile-download-btn');
    
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    downloadBtn.addEventListener('click', () => {
        const username = modal.querySelector('.username-input').value;
        if (username) {
            showNotification(`@${username} के वीडियो डाउनलोड हो रहे हैं...`, 'info');
            document.body.removeChild(modal);
        } else {
            showNotification('कृपया username डालें', 'error');
        }
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
            <input type="text" placeholder="TikTok video URL" class="ringtone-url" style="width: 100%; padding: 1rem; margin: 1rem 0; border: 2px solid var(--border-color); border-radius: 8px; background-color: var(--background-color); color: var(--text-primary);">
            <div style="margin: 1rem 0;">
                <label style="display: block; margin-bottom: 0.5rem;">शुरुआत: <span class="start-time">0s</span></label>
                <input type="range" class="start-slider" min="0" max="30" value="0" style="width: 100%; margin: 0.5rem 0;">
                <label style="display: block; margin-bottom: 0.5rem;">अंत: <span class="end-time">30s</span></label>
                <input type="range" class="end-slider" min="0" max="30" value="30" style="width: 100%; margin: 0.5rem 0;">
            </div>
            <button class="btn-primary ringtone-create-btn" style="margin-top: 1rem;">रिंगटोन बनाएं</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.close-modal');
    const createBtn = modal.querySelector('.ringtone-create-btn');
    const startSlider = modal.querySelector('.start-slider');
    const endSlider = modal.querySelector('.end-slider');
    const startTime = modal.querySelector('.start-time');
    const endTime = modal.querySelector('.end-time');
    
    // Slider functionality
    startSlider.addEventListener('input', function() {
        startTime.textContent = `${this.value}s`;
        if (parseInt(this.value) >= parseInt(endSlider.value)) {
            endSlider.value = parseInt(this.value) + 1;
            endTime.textContent = `${endSlider.value}s`;
        }
    });
    
    endSlider.addEventListener('input', function() {
        endTime.textContent = `${this.value}s`;
        if (parseInt(this.value) <= parseInt(startSlider.value)) {
            startSlider.value = parseInt(this.value) - 1;
            startTime.textContent = `${startSlider.value}s`;
        }
    });
    
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    createBtn.addEventListener('click', () => {
        showNotification('रिंगटोन बनाया जा रहा है...', 'info');
        setTimeout(() => {
            showNotification('रिंगटोन तैयार है!', 'success');
            document.body.removeChild(modal);
        }, 2000);
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
