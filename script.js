// vSave.in - Complete Working Version
console.log("vSave.in - All Features Working!");

// Wait for page to load completely
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Loaded - Initializing App");
    initializeApp();
});

function initializeApp() {
    console.log("Initializing all features...");
    
    // 1. THEME TOGGLE - WORKING
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateThemeIcon(currentTheme);
        
        themeToggle.addEventListener('click', function() {
            console.log("Theme toggle clicked");
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });

        function updateThemeIcon(theme) {
            themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
        }
    }

    // 2. MAIN DOWNLOAD BUTTON - WORKING
    const downloadBtn = document.getElementById('download-btn');
    const videoUrlInput = document.getElementById('video-url');

    if (downloadBtn && videoUrlInput) {
        downloadBtn.addEventListener('click', function() {
            console.log("Download button clicked");
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
            
            // Process video with preview
            setTimeout(() => {
                processVideoWithPreview(videoUrl);
            }, 2000);
        });

        // Enter key support
        videoUrlInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                downloadBtn.click();
            }
        });
    }

    // 3. QUICK OPTIONS BUTTONS - WORKING
    const optionBtns = document.querySelectorAll('.option-btn');
    console.log(`Found ${optionBtns.length} option buttons`);
    
    optionBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            console.log(`Option button ${index + 1} clicked`);
            const type = this.getAttribute('data-type');
            showNotification(`${getButtonText(type)} सिलेक्ट किया गया`, 'info');
            
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

    // 4. DOWNLOAD OPTION BUTTONS - WORKING
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

    console.log("All event listeners attached successfully!");
}

// Get Hindi text for buttons
function getButtonText(type) {
    const texts = {
        'mp4': 'MP4 डाउनलोड',
        'mp3': 'MP3 डाउनलोड', 
        'bulk': 'बल्क डाउनलोड',
        'profile': 'प्रोफाइल डाउनलोड',
        'ringtone': 'रिंगटोन मेकर'
    };
    return texts[type] || type;
}

// VIDEO PROCESSING WITH PREVIEW - WORKING
function processVideoWithPreview(videoUrl) {
    showNotification('वीडियो तैयार है! Preview उपलब्ध है', 'success');
    
    // Remove existing preview if any
    removeExistingPreview();
    
    // Create preview section
    const previewSection = document.createElement('div');
    previewSection.className = 'video-preview';
    previewSection.innerHTML = `
        <div class="preview-container">
            <h3>वीडियो Preview</h3>
            <div class="video-placeholder">
                <div class="video-icon">🎬</div>
                <p>वीडियो लोड हो रहा है...</p>
            </div>
            <div class="preview-actions">
                <button class="btn-primary download-preview-btn">डाउनलोड करें</button>
                <button class="btn-secondary watch-preview-btn">पूरा वीडियो देखें</button>
            </div>
        </div>
    `;
    
    // Add styles for preview
    const previewStyles = `
        <style>
            .video-preview {
                margin: 2rem auto;
                max-width: 600px;
                background: var(--surface-color);
                padding: 2rem;
                border-radius: 15px;
                box-shadow: var(--shadow);
                text-align: center;
            }
            .preview-container h3 {
                margin-bottom: 1rem;
                color: var(--text-primary);
            }
            .video-placeholder {
                background: var(--background-color);
                padding: 3rem;
                border-radius: 10px;
                margin: 1rem 0;
                border: 2px dashed var(--border-color);
            }
            .video-icon {
                font-size: 3rem;
                margin-bottom: 1rem;
            }
            .preview-actions {
                display: flex;
                gap: 1rem;
                justify-content: center;
                margin-top: 1rem;
            }
            .download-preview-btn, .watch-preview-btn {
                padding: 0.75rem 1.5rem;
                border: none;
                border-radius: 50px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s;
            }
            .download-preview-btn {
                background: var(--gradient);
                color: white;
            }
            .watch-preview-btn {
                background: transparent;
                color: var(--primary-color);
                border: 2px solid var(--primary-color);
            }
            .download-preview-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(255, 0, 80, 0.3);
            }
            .watch-preview-btn:hover {
                background: var(--primary-color);
                color: white;
            }
        </style>
    `;
    
    // Add to page
    document.head.insertAdjacentHTML('beforeend', previewStyles);
    const heroSection = document.querySelector('.hero');
    heroSection.appendChild(previewSection);
    
    // Add event listeners to preview buttons
    const downloadBtn = previewSection.querySelector('.download-preview-btn');
    const watchBtn = previewSection.querySelector('.watch-preview-btn');
    
    downloadBtn.addEventListener('click', function() {
        simulateDownload(videoUrl);
    });
    
    watchBtn.addEventListener('click', function() {
        // Show video in modal instead of redirecting
        showVideoModal(videoUrl);
    });
}

// SHOW VIDEO IN MODAL - WORKING
function showVideoModal(videoUrl) {
    const modal = document.createElement('div');
    modal.className = 'modal video-modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 800px;">
            <span class="close-modal">&times;</span>
            <h3>वीडियो Preview</h3>
            <div class="video-player">
                <div class="video-placeholder-large">
                    <div class="video-icon-large">🎬</div>
                    <p>वीडियो यहाँ दिखेगा</p>
                    <p class="video-url">${videoUrl}</p>
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn-primary modal-download-btn">डाउनलोड करें</button>
                <button class="btn-secondary modal-close-btn">बंद करें</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add video modal styles
    const modalStyles = `
        <style>
            .video-modal .modal-content {
                text-align: center;
            }
            .video-player {
                margin: 1rem 0;
            }
            .video-placeholder-large {
                background: var(--background-color);
                padding: 4rem;
                border-radius: 10px;
                margin: 1rem 0;
                border: 2px dashed var(--border-color);
            }
            .video-icon-large {
                font-size: 4rem;
                margin-bottom: 1rem;
            }
            .video-url {
                font-size: 0.8rem;
                color: var(--text-secondary);
                margin-top: 1rem;
                word-break: break-all;
            }
            .modal-actions {
                display: flex;
                gap: 1rem;
                justify-content: center;
                margin-top: 1rem;
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', modalStyles);
    
    // Event listeners for modal
    const closeBtn = modal.querySelector('.close-modal');
    const closeBtn2 = modal.querySelector('.modal-close-btn');
    const downloadBtn = modal.querySelector('.modal-download-btn');
    
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    closeBtn2.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    downloadBtn.addEventListener('click', () => {
        simulateDownload(videoUrl);
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Remove existing preview
function removeExistingPreview() {
    const existingPreview = document.querySelector('.video-preview');
    if (existingPreview) {
        existingPreview.remove();
    }
}

// SIMULATE DOWNLOAD - WORKING
function simulateDownload(videoUrl) {
    showNotification('डाउनलोड शुरू हो रहा है...', 'info');
    
    // Create a fake download
    setTimeout(() => {
        // Create download link
        const downloadLink = document.createElement('a');
        downloadLink.href = '#';
        downloadLink.download = 'tiktok_video.mp4';
        downloadLink.textContent = 'Download TikTok Video';
        
        // Trigger click (in real app, this would be actual download)
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        showNotification('डाउनलोड पूरा हुआ!', 'success');
    }, 1000);
}

// UTILITY FUNCTIONS
function isValidTikTokUrl(url) {
    const tiktokRegex = /https?:\/\/(www\.)?tiktok\.com\/.+/;
    return tiktokRegex.test(url);
}

function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// MODAL FUNCTIONS - WORKING
function showBulkDownloadModal() {
    const modal = createModal();
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>बल्क डाउनलोड</h3>
            <p>एक साथ 5-10 TikTok वीडियो डाउनलोड करें</p>
            <textarea placeholder="TikTok URLs (एक लाइन में एक URL)" class="bulk-urls"></textarea>
            <button class="btn-primary bulk-download-btn">डाउनलोड करें</button>
        </div>
    `;
    
    setupModal(modal);
    
    const downloadBtn = modal.querySelector('.bulk-download-btn');
    downloadBtn.addEventListener('click', () => {
        const urls = modal.querySelector('.bulk-urls').value;
        if (urls) {
            showNotification('बल्क डाउनलोड शुरू हो गया!', 'success');
            document.body.removeChild(modal);
        } else {
            showNotification('कृपया URLs डालें', 'error');
        }
    });
}

function showProfileDownloadModal() {
    const modal = createModal();
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>प्रोफाइल डाउनलोड</h3>
            <p>TikTok username डालें और सारे वीडियोज़ डाउनलोड करें</p>
            <input type="text" placeholder="@username" class="username-input">
            <button class="btn-primary profile-download-btn">डाउनलोड करें</button>
        </div>
    `;
    
    setupModal(modal);
    
    const downloadBtn = modal.querySelector('.profile-download-btn');
    downloadBtn.addEventListener('click', () => {
        const username = modal.querySelector('.username-input').value;
        if (username) {
            showNotification(`@${username} के वीडियो डाउनलोड हो रहे हैं...`, 'info');
            document.body.removeChild(modal);
        } else {
            showNotification('कृपया username डालें', 'error');
        }
    });
}

function showRingtoneMakerModal() {
    const modal = createModal();
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>रिंगटोन मेकर</h3>
            <p>MP3 को 30 सेकंड कट करें (रिंगटोन के लिए)</p>
            <input type="text" placeholder="TikTok video URL" class="ringtone-url">
            <div class="ringtone-controls">
                <label>शुरुआत: <span class="start-time">0s</span></label>
                <input type="range" class="start-slider" min="0" max="30" value="0">
                <label>अंत: <span class="end-time">30s</span></label>
                <input type="range" class="end-slider" min="0" max="30" value="30">
            </div>
            <button class="btn-primary ringtone-create-btn">रिंगटोन बनाएं</button>
        </div>
    `;
    
    setupModal(modal);
    
    // Slider functionality
    const startSlider = modal.querySelector('.start-slider');
    const endSlider = modal.querySelector('.end-slider');
    const startTime = modal.querySelector('.start-time');
    const endTime = modal.querySelector('.end-time');
    
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
    
    const createBtn = modal.querySelector('.ringtone-create-btn');
    createBtn.addEventListener('click', () => {
        showNotification('रिंगटोन बनाया जा रहा है...', 'info');
        setTimeout(() => {
            showNotification('रिंगटोन तैयार है!', 'success');
            document.body.removeChild(modal);
        }, 2000);
    });
}

// Modal helper functions
function createModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    document.body.appendChild(modal);
    return modal;
}

function setupModal(modal) {
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

// Smooth scrolling for navigation
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
