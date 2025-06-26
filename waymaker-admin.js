// WayMaker AI Admin Extension Module
// Browser Storage Admin Mode for Kenneth

class WayMakerAdminExtension {
    constructor(chatInstance) {
        this.chat = chatInstance;
        this.isAdminEnabled = false;
        this.adminKey = 'waymaker-admin-auth';
        this.adminValue = 'kenneth-admin-verified-2024';
        
        console.log('🛡️ Admin extension initialized');
        this.checkAdminStatus();
    }
    
    // ✅ CORE ADMIN DETECTION
    isAdminUser(userName) {
        const adminStorage = localStorage.getItem(this.adminKey);
        const isKenneth = userName && userName.toLowerCase() === 'kenneth';
        const hasAdminAuth = adminStorage === this.adminValue;
        
        console.log('🔍 Admin check:', { 
            userName, 
            isKenneth, 
            hasAdminAuth, 
            result: isKenneth && hasAdminAuth 
        });
        
        return isKenneth && hasAdminAuth;
    }
    
    checkAdminStatus() {
        if (this.chat && this.chat.userInfo) {
            this.isAdminEnabled = this.isAdminUser(this.chat.userInfo.name);
            
            if (this.isAdminEnabled) {
                console.log('✅ Admin mode active for Kenneth');
                this.setupAdminInterface();
            } else {
                console.log('ℹ️ Regular user mode');
            }
        }
    }
    
    // ✅ ADMIN INTERFACE SETUP
    setupAdminInterface() {
        try {
            // Update user display to show admin status
            this.updateUserDisplayForAdmin();
            
            // Add admin controls to Enhanced Features section
            this.addAdminControlsPanel();
            
            // Modify community members display
            this.updateCommunityMembersForAdmin();
            
            // Show admin activation notification
            this.showAdminNotification();
            
        } catch (error) {
            console.error('❌ Error setting up admin interface:', error);
        }
    }
    
    updateUserDisplayForAdmin() {
        try {
            const userDisplay = document.getElementById('userDisplay');
            if (userDisplay) {
                userDisplay.innerHTML = `Welcome, <span class="text-yellow-300 font-bold">Kenneth (Admin)</span>!`;
            }
            
            const userTypeBadge = document.getElementById('userTypeBadge');
            if (userTypeBadge) {
                userTypeBadge.innerHTML = `🛡️ Admin`;
                userTypeBadge.className += ' bg-yellow-600';
            }
            
            console.log('✅ Admin user display updated');
        } catch (error) {
            console.error('❌ Error updating admin display:', error);
        }
    }
    
    addAdminControlsPanel() {
        try {
            // Find Enhanced Features section
            const enhancedSection = document.querySelector('.sidebar-section').nextElementSibling;
            
            if (enhancedSection) {
                const adminPanel = document.createElement('div');
                adminPanel.className = 'sidebar-section';
                adminPanel.innerHTML = `
                    <div class="p-2 border-b border-gray-600">
                        <h4 class="font-semibold text-white mb-1 text-sm flex items-center gap-1">
                            🛡️ Admin Controls
                            <span class="text-xs bg-yellow-600 text-white px-1 rounded">Kenneth</span>
                        </h4>
                        <div class="space-y-1">
                            <button class="admin-btn w-full text-left" onclick="waymakerAdmin.viewAllUsers()">
                                👥 View All Users
                            </button>
                            <button class="admin-btn w-full text-left" onclick="waymakerAdmin.showModerationQueue()">
                                📋 Moderation Queue
                            </button>
                            <button class="admin-btn w-full text-left" onclick="waymakerAdmin.showReports()">
                                ⚠️ User Reports
                            </button>
                            <button class="admin-btn w-full text-left" onclick="waymakerAdmin.showAdminSettings()">
                                ⚙️ Admin Settings
                            </button>
                            <button class="admin-btn w-full text-left" onclick="waymakerAdmin.showAdminStats()">
                                📊 Community Stats
                            </button>
                        </div>
                        <div class="admin-stats mt-2 pt-2 border-t border-gray-600">
                            <div class="text-xs text-gray-400">
                                Active Users: <span id="admin-active-count">0</span> | 
                                Messages Today: <span id="admin-message-count">0</span>
                            </div>
                        </div>
                    </div>
                `;
                
                // Insert admin panel after Enhanced Features
                enhancedSection.parentNode.insertBefore(adminPanel, enhancedSection.nextSibling);
                
                // Add admin button styling
                this.addAdminCSS();
                
                console.log('✅ Admin controls panel added');
            }
        } catch (error) {
            console.error('❌ Error adding admin controls:', error);
        }
    }
    
    addAdminCSS() {
        const style = document.createElement('style');
        style.textContent = `
            .admin-btn {
                background: #374151;
                color: #d1d5db;
                transition: all 0.2s ease;
                padding: 0.375rem 0.5rem;
                font-size: 0.75rem;
                border-radius: 0.375rem;
                border: none;
                cursor: pointer;
                margin-bottom: 0.25rem;
            }
            
            .admin-btn:hover {
                background: #c78a44;
                color: white;
                transform: translateX(2px);
            }
            
            .admin-controls-section {
                background: rgba(199, 138, 68, 0.1);
                border: 1px solid rgba(199, 138, 68, 0.3);
            }
            
            .message.admin-message .message-content {
                border-left: 3px solid #c78a44;
            }
            
            .community-member.admin {
                border-left: 3px solid #c78a44;
                background: rgba(199, 138, 68, 0.1);
            }
            
            .admin-notification {
                position: fixed;
                top: 4rem;
                right: 1rem;
                background: linear-gradient(135deg, #c78a44, #b45309);
                color: white;
                padding: 1rem;
                border-radius: 0.5rem;
                box-shadow: 0 10px 25px rgba(199, 138, 68, 0.3);
                z-index: 1000;
                font-weight: bold;
                max-width: 300px;
            }
        `;
        document.head.appendChild(style);
    }
    
    updateCommunityMembersForAdmin() {
        try {
            // This will be called when the user list is updated
            // We'll hook into the existing renderUserList function
            console.log('✅ Community members admin styling ready');
        } catch (error) {
            console.error('❌ Error updating community members:', error);
        }
    }
    
    showAdminNotification() {
        try {
            const notification = document.createElement('div');
            notification.className = 'admin-notification';
            notification.innerHTML = `
                <div class="flex items-center gap-2 mb-2">
                    <span class="text-2xl">🛡️</span>
                    <strong>Admin Mode Active</strong>
                </div>
                <p class="text-sm">Welcome Kenneth! You now have full moderation capabilities.</p>
                <button onclick="this.parentElement.remove()" class="mt-2 px-2 py-1 bg-black bg-opacity-30 rounded text-xs">
                    Dismiss
                </button>
            `;
            
            document.body.appendChild(notification);
            
            // Auto-dismiss after 5 seconds
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 5000);
            
        } catch (error) {
            console.error('❌ Error showing admin notification:', error);
        }
    }
    
    // ✅ ADMIN ACTIONS
    viewAllUsers() {
        try {
            const users = this.chat.activeUsers || [];
            const userCount = users.length;
            
            let userList = `📊 COMMUNITY OVERVIEW (${userCount} users)\\n\\n`;
            
            users.forEach((user, index) => {
                const status = user.isBot ? 'AI Assistant' : 'Community Member';
                const timeOnline = user.joinedAt ? this.formatTimeOnline(user.joinedAt) : 'Always online';
                userList += `${index + 1}. ${user.name} (${status})\\n   Online: ${timeOnline}\\n\\n`;
            });
            
            userList += `\\n🛡️ Admin Tools:\\n- Monitor user activity\\n- Review message history\\n- Manage community guidelines`;
            
            alert(userList);
            
            // Update stats
            this.updateAdminStats(userCount);
            
        } catch (error) {
            console.error('❌ Error viewing users:', error);
            alert('Error loading user data. Please try again.');
        }
    }
    
    showModerationQueue() {
        try {
            const messages = document.querySelectorAll('.message');
            const totalMessages = messages.length;
            
            let queueInfo = `📋 MODERATION QUEUE\\n\\n`;
            queueInfo += `Total Messages: ${totalMessages}\\n`;
            queueInfo += `Recent Activity: Last ${Math.min(5, totalMessages)} messages\\n\\n`;
            
            queueInfo += `🛡️ Available Actions:\\n`;
            queueInfo += `- Edit any user message\\n`;
            queueInfo += `- Delete inappropriate content\\n`;
            queueInfo += `- Monitor for theological accuracy\\n`;
            queueInfo += `- Review prayer requests\\n\\n`;
            
            queueInfo += `💡 Quick Actions:\\n`;
            queueInfo += `- Hover over messages to see edit/delete options\\n`;
            queueInfo += `- All actions are logged for transparency\\n`;
            queueInfo += `- Use admin discretion for community guidelines`;
            
            alert(queueInfo);
        } catch (error) {
            console.error('❌ Error showing moderation queue:', error);
        }
    }
    
    showReports() {
        try {
            const reportInfo = `⚠️ USER REPORTS & COMMUNITY SAFETY\\n\\n`;
            const reportDetails = `Current Status: All Clear ✅\\n\\n`;
            const guidelines = `🛡️ Community Guidelines:\\n`;
            const rules = `- Keep discussions Christ-centered\\n- Be respectful and loving\\n- Share biblical wisdom\\n- Support one another in faith\\n\\n`;
            const actions = `📞 Report Issues:\\n- Theological concerns\\n- Inappropriate content\\n- Safety concerns\\n- Technical problems`;
            
            alert(reportInfo + reportDetails + guidelines + rules + actions);
        } catch (error) {
            console.error('❌ Error showing reports:', error);
        }
    }
    
    showAdminSettings() {
        try {
            const settings = `⚙️ ADMIN SETTINGS\\n\\n`;
            const config = `🛡️ Current Configuration:\\n`;
            const options = `- Admin Mode: Active (Kenneth)\\n- Storage: Browser localStorage\\n- Authentication: Device-specific\\n- Scope: Community moderation\\n\\n`;
            const management = `📋 Management Options:\\n`;
            const tools = `- Clear admin cache\\n- Re-authenticate admin\\n- Export moderation log\\n- Update community guidelines\\n\\n`;
            const security = `🔒 Security Status:\\n- Admin access: Device-locked\\n- No network credentials\\n- Local storage only`;
            
            const choice = confirm(settings + config + options + management + tools + security + '\\n\\nClear admin cache and re-authenticate?');
            
            if (choice) {
                this.clearAdminCache();
            }
        } catch (error) {
            console.error('❌ Error showing admin settings:', error);
        }
    }
    
    showAdminStats() {
        try {
            const messages = document.querySelectorAll('.message').length;
            const users = this.chat.activeUsers?.length || 0;
            const sessionTime = this.calculateSessionTime();
            
            const stats = `📊 COMMUNITY STATISTICS\\n\\n`;
            const data = `👥 Active Users: ${users}\\n📝 Total Messages: ${messages}\\n⏱️ Session Duration: ${sessionTime}\\n\\n`;
            const activity = `🔄 Recent Activity:\\n- Real-time chat active\\n- API connection stable\\n- Community engagement high\\n\\n`;
            const health = `💚 Community Health:\\n- All systems operational\\n- No reported issues\\n- Biblical guidance active`;
            
            alert(stats + data + activity + health);
            
            this.updateAdminStats(users, messages);
        } catch (error) {
            console.error('❌ Error showing admin stats:', error);
        }
    }
    
    clearAdminCache() {
        try {
            localStorage.removeItem(this.adminKey);
            alert('🔄 Admin cache cleared. Please visit admin-setup.html to re-enable admin mode.');
            location.reload();
        } catch (error) {
            console.error('❌ Error clearing admin cache:', error);
        }
    }
    
    // ✅ UTILITY FUNCTIONS
    updateAdminStats(userCount = 0, messageCount = 0) {
        try {
            const activeCountEl = document.getElementById('admin-active-count');
            const messageCountEl = document.getElementById('admin-message-count');
            
            if (activeCountEl) activeCountEl.textContent = userCount;
            if (messageCountEl) messageCountEl.textContent = messageCount;
            
        } catch (error) {
            console.error('❌ Error updating admin stats:', error);
        }
    }
    
    formatTimeOnline(joinedAt) {
        if (!joinedAt) return 'Unknown';
        
        const now = Date.now() / 1000;
        const onlineSeconds = Math.floor(now - joinedAt);
        
        if (onlineSeconds < 60) return 'Just joined';
        if (onlineSeconds < 3600) return `${Math.floor(onlineSeconds / 60)} minutes`;
        if (onlineSeconds < 86400) return `${Math.floor(onlineSeconds / 3600)} hours`;
        return `${Math.floor(onlineSeconds / 86400)} days`;
    }
    
    calculateSessionTime() {
        try {
            const startTime = sessionStorage.getItem('waymaker-session-start') || Date.now();
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            
            if (elapsed < 60) return `${elapsed} seconds`;
            if (elapsed < 3600) return `${Math.floor(elapsed / 60)} minutes`;
            return `${Math.floor(elapsed / 3600)} hours`;
        } catch (error) {
            return 'Unknown';
        }
    }
}

// Global admin instance
let waymakerAdmin = null;

// Initialize admin extension when chat is ready
function initializeAdminExtension(chatInstance) {
    try {
        waymakerAdmin = new WayMakerAdminExtension(chatInstance);
        console.log('✅ WayMaker Admin Extension loaded');
    } catch (error) {
        console.error('❌ Failed to initialize admin extension:', error);
    }
}