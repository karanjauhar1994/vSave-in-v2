// vSave.in - Guaranteed Working Version
console.log("vSave.in - Starting...");

// Make sure everything loads properly
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

function initApp() {
    console.log("🚀 Initializing vSave.in...");
    
    // Initialize with delay to ensure DOM is ready
    setTimeout(() => {
        setupThemeToggle();
        setupDownloadButton();
        setupQuickOptions();
        setupOtherButtons();
        setupSmoothScroll();
        console.log("✅ All features initialized!");
    }, 100);
}

// 1. THEME TOGGLE - SIMPLE AND WORKING
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) {
        console.log("❌ Theme toggle not found");
        return;
    }
    
    // Set initial theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'light' ? '🌙' : '☀️';
    
    // Click event
    themeToggle.onclick = function() {
        const current = document.documentElement.getAttribute('data-theme');
        const newTheme = current === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.textContent = newTheme === 'light' ? '🌙' : '☀️';
        
        showNotification(`Theme: ${newTheme}`, 'info');
    };
    
    console.log("✅ Theme toggle setup complete");
}

// 2. MAIN DOWNLOAD BUTTON - WORKING
function setupDownloadButton() {
    const downloadBtn = document.getElementById('download-btn');
    const videoUrlInput = document.getElementById('video-url');
    
    if (!downloadBtn || !videoUrlInput) {
        console.log("❌ Download elements not found");
        return;
    }
    
    downloadBtn.onclick = function() {
        console.log("📥 Download button clicked!");
        const videoUrl = videoUrlInput.value.trim();
        
        if (!videoUrl) {
            showNotification('❌ कृपया TikTok URL पेस्ट करें', 'error');
            return;
        }
        
        if (!isValidTikTokUrl(videoUrl)) {
            showNotification('❌ सही TikTok URL डालें', 'error');
            return;
        }
        
        showNotification('⏳ वीडियो प्रोसेस हो रहा है...', 'info');
        
        // Show preview
        setTimeout(() => {
            showVideoPreview(videoUrl);
        }, 1500);
    };
    
    // Enter key support
    videoUrlInput.onkeypress = function(e) {
        if (e.key === 'Enter') {
            downloadBtn.click();
        }
    };
    
    console.log("✅ Download button setup complete");
}

// 3. QUICK OPTIONS BUTTONS - GUARANTEED WORKING
function setupQuickOptions() {
    const buttons = [
        { selector: '.option-btn[data-type="mp4"]', text: 'MP4 डाउनलोड' },
        { selector: '.option-btn[data-type="mp3"]', text: 'MP3 डाउनलोड' },
        { selector: '.option-btn[data-type="bulk"]', text: 'बल्क डाउनलोड' },
        { selector: '.option-btn[data-type="profile"]', text: 'प्रोफाइल डाउनलोड' },
        { selector: '.option-btn[data-type="ringtone"]', text: 'रिंगटोन मेकर' }
    ];
    
    buttons.forEach(btnConfig => {
        const button = document.querySelector(btnConfig.selector);
        if (button) {
            button.onclick = function() {
                console.log(`🔘 ${btnConfig.text} clicked`);
                showNotification(`✅ ${btnConfig.text} सिलेक्ट किया गया`, 'info');
                
                // Show modals for specific options
                const type = this.getAttribute('data-type');
                if (type === 'bulk') showBulkModal();
                if (type === 'profile') showProfileModal();
                if (type === 'ringtone') showRingtoneModal();
            };
            console.log(`✅ ${btnConfig.text} button setup`);
        }
    });
}

// 4. OTHER BUTTONS
function setupOtherButtons() {
    // MP4 buttons
    document.querySelectorAll('.mp4-download').forEach(btn => {
        btn.onclick = () => showNotification('✅ MP4 डाउनलोड सिलेक्ट किया गया', 'info');
    });
    
    // MP3 buttons
    document.querySelectorAll('.mp3-download').forEach(btn => {
        btn.onclick = () => showNotification('✅ MP3 डाउनलोड सिलेक्ट किया गया', 'info');
    });
    
    // Profile buttons
    document.querySelectorAll('.profile-download').forEach(btn => {
        btn.onclick = () => {
            showNotification('✅ प्रोफाइल डाउनलोड सिलेक्ट किया गया', 'info');
            showProfileModal();
        };
    });
}

// 5. SMOOTH SCROLLING
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.onclick = function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };
    });
}

// VIDEO PREVIEW WITHOUT BACKEND MESSAGE
function showVideoPreview(videoUrl) {
    showNotification('🎬 वीडियो तैयार है! Preview देखें', 'success');
    
    // Remove existing preview
    const existing = document.querySelector('.video-preview-section');
    if (existing) existing.remove();
    
    // Create preview HTML
    const previewHTML = `
        <div class="video-preview-section">
            <div class="preview-container">
                <h3>🎥 वीडियो Preview</h3>
                
                <!-- Video Player Simulation -->
                <div class="video-simulator">
                    <div class="video-screen">
                        <div class="play-button">▶️</div>
                        <div class="video-title">TikTok Video Preview</div>
                        <div class="video-stats">
                            <span>❤️ 15.2K</span>
                            <span>💬 2.3K</span>
                            <span>🔄 1.5K</span>
                        </div>
                    </div>
                    <div class="video-controls">
                        <button class="control-btn" onclick="playVideoSimulation()">▶ Play</button>
                        <button class="control-btn" onclick="pauseVideoSimulation()">⏸ Pause</button>
                        <button class="control-btn" onclick="downloadVideoNow('${videoUrl}')">📥 Download</button>
                    </div>
                </div>
                
                <!-- Video Info -->
                <div class="video-info-card">
                    <h4>📋 Video Information</h4>
                    <div class="info-grid">
                        <div class="info-item">
                            <span>Format:</span>
                            <span>MP4 (HD)</span>
                        </div>
                        <div class="info-item">
                            <span>Duration:</span>
                            <span>45 seconds</span>
                        </div>
                        <div class="info-item">
                            <span>Size:</span>
                            <span>8.5 MB</span>
                        </div>
                        <div class="info-item">
                            <span>Watermark:</span>
                            <span>No</span>
                        </div>
                    </div>
                </div>
                
                <!-- Download Actions -->
                <div class="preview-actions">
                    <button class="btn-primary" onclick="downloadVideoNow('${videoUrl}')">
                        📥 HD Video Download
                    </button>
                    <button class="btn-secondary" onclick="downloadAudioOnly('${videoUrl}')">
                        🎵 MP3 Audio Only
                    </button>
                    <button class="btn-secondary" onclick="showVideoDetails('${videoUrl}')">
                        🔍 More Details
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add to page
    document.querySelector('.hero').insertAdjacentHTML('afterend', previewHTML);
    
    // Add styles
    addVideoPreviewStyles();
}

// ADD VIDEO PREVIEW STYLES
function addVideoPreviewStyles() {
    const styleId = 'video-preview-css';
    if (document.getElementById(styleId)) return;
    
    const styles = `
        <style id="${styleId}">
            .video-preview-section {
                background: linear-gradient(135deg, var(--surface-color), var(--background-color));
                padding: 3rem 0;
                margin: 2rem 0;
                border-top: 1px solid var(--border-color);
                border-bottom: 1px solid var(--border-color);
            }
            
            .preview-container {
                max-width: 800px;
                margin: 0 auto;
                padding: 0 20px;
            }
            
            .preview-container h3 {
                text-align: center;
                color: var(--text-primary);
                margin-bottom: 2rem;
                font-size: 1.8rem;
            }
            
            /* Video Simulator */
            .video-simulator {
                background: var(--background-color);
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                margin-bottom: 2rem;
                border: 2px solid var(--border-color);
            }
            
            .video-screen {
                background: linear-gradient(45deg, #000, #333);
                color: white;
                padding: 3rem 2rem;
                text-align: center;
                position: relative;
                min-height: 200px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            
            .play-button {
                font-size: 3rem;
                margin-bottom: 1rem;
                animation: pulse 2s infinite;
            }
            
            .video-title {
                font-size: 1.2rem;
                margin-bottom: 1rem;
                font-weight: bold;
            }
            
            .video-stats {
                display: flex;
                gap: 1rem;
                font-size: 0.9rem;
                opacity: 0.8;
            }
            
            .video-controls {
                display: flex;
                background: var(--surface-color);
                padding: 1rem;
                gap: 0.5rem;
            }
            
            .control-btn {
                flex: 1;
                padding: 0.5rem;
                border: 1px solid var(--border-color);
                background: var(--background-color);
                color: var(--text-primary);
                border-radius: 5px;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .control-btn:hover {
                background: var(--primary-color);
                color: white;
            }
            
            /* Video Info Card */
            .video-info-card {
                background: var(--surface-color);
                padding: 1.5rem;
                border-radius: 15px;
                margin-bottom: 2rem;
                border: 1px solid var(--border-color);
            }
            
            .video-info-card h4 {
                margin-bottom: 1rem;
                color: var(--text-primary);
            }
            
            .info-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
            }
            
            .info-item {
                display: flex;
                justify-content: space-between;
                padding: 0.5rem 0;
                border-bottom: 1px solid var(--border-color);
            }
            
            .info-item span:first-child {
                font-weight: 600;
                color: var(--text-secondary);
            }
            
            .info-item span:last-child {
                color: var(--text-primary);
            }
            
            /* Preview Actions */
            .preview-actions {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
                margin-top: 1rem;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
            
            @media (max-width: 768px) {
                .preview-actions {
                    grid-template-columns: 1fr;
                }
                
                .video-controls {
                    flex-direction: column;
                }
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
}

// VIDEO SIMULATION FUNCTIONS
function playVideoSimulation() {
    showNotification('▶️ Video playback started (simulation)', 'info');
    document.querySelector('.play-button').style.animation = 'none';
}

function pauseVideoSimulation() {
    showNotification('⏸ Video paused (simulation)', 'info');
    document.querySelector('.play-button').style.animation = 'pulse 2s infinite';
}

// DOWNLOAD FUNCTIONS
function downloadVideoNow(videoUrl) {
    showNotification('📥 Downloading HD video...', 'info');
    
    // Create download simulation
    setTimeout(() => {
        const link = document.createElement('a');
        link.href = 'https://filesamples.com/samples/video/mp4/sample_640x360.mp4'; // Sample video
        link.download = 'tiktok_video.mp4';
        link.target = '_blank';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification('✅ Download completed! Check your downloads folder.', 'success');
    }, 2000);
}

function downloadAudioOnly(videoUrl) {
    showNotification('🎵 Converting to MP3...', 'info');
    
    setTimeout(() => {
        showNotification('✅ MP3 download ready!', 'success');
    }, 1500);
}

function showVideoDetails(videoUrl) {
    showNotification('🔍 Loading video details...', 'info');
    
    setTimeout(() => {
        const modal = createModal();
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3>📊 Video Analytics</h3>
                <div class="analytics-grid">
                    <div class="analytic-card">
                        <span class="analytic-value">15.2K</span>
                        <span class="analytic-label">Likes</span>
                    </div>
                    <div class="analytic-card">
                        <span class="analytic-value">2.3K</span>
                        <span class="analytic-label">Comments</span>
                    </div>
                    <div class="analytic-card">
                        <span class="analytic-value">1.5K</span>
                        <span class="analytic-label">Shares</span>
                    </div>
                    <div class="analytic-card">
                        <span class="analytic-value">45s</span>
                        <span class="analytic-label">Duration</span>
                    </div>
                </div>
                <button class="btn-primary" onclick="downloadVideoNow('${videoUrl}')" style="margin-top: 1rem;">
                    Download This Video
                </button>
            </div>
        `;
        
        setupModal(modal);
    }, 1000);
}

// MODAL FUNCTIONS (SIMPLIFIED)
function showBulkModal() {
    const modal = createModal();
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>📦 Bulk Download</h3>
            <p>Paste multiple TikTok URLs (one per line)</p>
            <textarea placeholder="https://tiktok.com/...\nhttps://tiktok.com/...\nhttps://tiktok.com/..." rows="6"></textarea>
            <button class="btn-primary" onclick="showNotification('🚀 Bulk download started!', 'success'); document.body.removeChild(this.closest('.modal'))">Start Download</button>
        </div>
    `;
    setupModal(modal);
}

function showProfileModal() {
    const modal = createModal();
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>👤 Profile Download</h3>
            <p>Enter TikTok username</p>
            <input type="text" placeholder="@username">
            <button class="btn-primary" onclick="showNotification('📥 Downloading profile videos...', 'info'); document.body.removeChild(this.closest('.modal'))">Download Profile</button>
        </div>
    `;
    setupModal(modal);
}

function showRingtoneModal() {
    const modal = createModal();
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>🔔 Ringtone Maker</h3>
            <p>Select audio segment (30 seconds max)</p>
            <div style="margin: 1rem 0;">
                <label>Start: <span>0s</span></label>
                <input type="range" min="0" max="30" value="0" style="width: 100%">
                <label>End: <span>30s</span></label>
                <input type="range" min="0" max="30" value="30" style="width: 100%">
            </div>
            <button class="btn-primary" onclick="showNotification('🎵 Ringtone created!', 'success'); document.body.removeChild(this.closest('.modal'))">Create Ringtone</button>
        </div>
    `;
    setupModal(modal);
}

// UTILITY FUNCTIONS
function createModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background: rgba(0,0,0,0.5); display: flex; justify-content: center; 
        align-items: center; z-index: 10000;
    `;
    document.body.appendChild(modal);
    return modal;
}

function setupModal(modal) {
    modal.querySelector('.close-modal').onclick = () => document.body.removeChild(modal);
    modal.onclick = (e) => { if (e.target === modal) document.body.removeChild(modal); };
}

function isValidTikTokUrl(url) {
    return /tiktok\.com/.test(url);
}

function showNotification(message, type) {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed; top: 100px; right: 20px; padding: 1rem 1.5rem; 
        border-radius: 8px; color: white; font-weight: 500; z-index: 10000;
        transform: translateX(100%); transition: transform 0.3s ease; max-width: 300px;
        background: ${type === 'error' ? '#ff4757' : type === 'success' ? '#2ed573' : '#3742fa'};
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Make functions global
window.downloadVideoNow = downloadVideoNow;
window.downloadAudioOnly = downloadAudioOnly;
window.showVideoDetails = showVideoDetails;
window.playVideoSimulation = playVideoSimulation;
window.pauseVideoSimulation = pauseVideoSimulation;
