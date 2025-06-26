/**
 * WayMaker AI Admin Extension
 * Provides admin detection and enhanced controls for Kenneth
 */
class WayMakerAdminExtension {
    constructor(chatInstance) {
        this.chat = chatInstance;
        this.adminKey = 'kenneth_admin_2025';
        this.init();
    }

    init() {
        console.log('🔧 Initializing WayMaker Admin Extension...');
        
        // Override original methods with admin-aware versions
        this.enhanceEditDeletePermissions();
        this.enhanceUserDisplay();
        this.addAdminControls();
        
        console.log('✅ Admin extension ready. Admin status:', this.isAdmin());
    }

    isAdmin() {
        try {
            const hasAdminKey = localStorage.getItem('waymaker_admin_key') === this.adminKey;
            const isKenneth = this.chat?.userInfo?.name === 'Kenneth';
            return hasAdminKey && isKenneth;
        } catch (error) {
            console.error('Admin check failed:', error);
            return false;
        }
    }

    enhanceEditDeletePermissions() {
        // Store original method
        const originalAddMessage = this.chat.addMessageToUI.bind(this.chat);
        
        // Override with admin-aware version
        this.chat.addMessageToUI = (content, type, sender, isWelcome, messageId) => {
            const result = originalAddMessage(content, type, sender, isWelcome, messageId);
            
            // Add admin controls to all messages if user is admin
            if (this.isAdmin() && type === 'user' && sender !== 'Kenneth') {
                this.addAdminActionsToMessage(messageId || this.generateMessageId());
            }
            
            return result;
        };
    }

    addAdminActionsToMessage(messageId) {
        setTimeout(() => {
            const messageEl = document.getElementById(messageId);
            if (!messageEl) return;

            const actionsDiv = messageEl.querySelector('.message-actions');
            if (!actionsDiv) {
                // Create admin actions for messages without existing actions
                const messageContent = messageEl.querySelector('.message-content');
                if (messageContent) {
                    const adminActions = document.createElement('div');
                    adminActions.className = 'message-actions flex gap-1 opacity-0 admin-actions';
                    adminActions.innerHTML = `
                        <button class="action-button edit admin-edit" onclick="chat.adminEditMessage('${messageId}')" title="Admin Edit">🛠️</button>
                        <button class="action-button delete admin-delete" onclick="chat.adminDeleteMessage('${messageId}')" title="Admin Delete">🗑️</button>
                    `;
                    messageContent.parentNode.appendChild(adminActions);
                }
            } else {
                // Add admin controls to existing actions
                if (!actionsDiv.querySelector('.admin-edit')) {
                    actionsDiv.innerHTML += `
                        <button class="action-button edit admin-edit" onclick="chat.adminEditMessage('${messageId}')" title="Admin Edit">🛠️</button>
                        <button class="action-button delete admin-delete" onclick="chat.adminDeleteMessage('${messageId}')" title="Admin Delete">🗑️</button>
                    `;
                }
            }
        }, 100);
    }

    enhanceUserDisplay() {
        // Override user info display to show admin badge
        const originalUpdateUserInfo = this.chat.updateUserInfo?.bind(this.chat);
        if (originalUpdateUserInfo) {
            this.chat.updateUserInfo = () => {
                const result = originalUpdateUserInfo();
                this.addAdminBadge();
                return result;
            };
        }
        
        // Also check for user list updates
        this.addAdminBadge();
    }

    addAdminBadge() {
        if (!this.isAdmin()) return;

        // Add badge to user info display
        const userInfoDisplay = document.getElementById('userInfoDisplay');
        if (userInfoDisplay && !userInfoDisplay.textContent.includes('(Admin)')) {
            userInfoDisplay.innerHTML = userInfoDisplay.innerHTML.replace(
                'Kenneth', 
                'Kenneth <span class="admin-badge bg-red-600 px-1 py-0.5 rounded text-xs ml-1">(Admin)</span>'
            );
        }

        // Add badge to community members list
        setTimeout(() => {
            const membersList = document.querySelector('#membersList, .compact-user-list');
            if (membersList) {
                const kennethEntry = Array.from(membersList.children)
                    .find(el => el.textContent.includes('Kenneth') && !el.textContent.includes('(Admin)'));
                
                if (kennethEntry) {
                    kennethEntry.innerHTML = kennethEntry.innerHTML.replace(
                        'Kenneth',
                        'Kenneth <span class="admin-badge bg-red-600 px-1 py-0.5 rounded text-xs">(Admin)</span>'
                    );
                }
            }
        }, 500);
    }

    addAdminControls() {
        if (!this.isAdmin()) return;

        // Add admin panel to Enhanced Features section
        setTimeout(() => {
            // Find the Enhanced Features section by its content
            const sidebarSections = document.querySelectorAll('.sidebar-section');
            let enhancedFeaturesSection = null;
            
            sidebarSections.forEach(section => {
                if (section.textContent.includes('Enhanced Features')) {
                    enhancedFeaturesSection = section;
                }
            });
            
            if (enhancedFeaturesSection && !document.getElementById('adminPanel')) {
                const adminPanel = document.createElement('div');
                adminPanel.id = 'adminPanel';
                adminPanel.className = 'p-2 border-b border-gray-600 bg-red-900/20';
                adminPanel.innerHTML = `
                    <h4 class="font-semibold text-red-300 mb-1 text-sm flex items-center gap-1">
                        🛡️ Admin Controls
                    </h4>
                    <div class="grid grid-cols-2 gap-1 text-xs">
                        <button onclick="waymakerAdmin.showUserManagement()" 
                                class="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs">
                            👥 Users
                        </button>
                        <button onclick="waymakerAdmin.showModerationLog()" 
                                class="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs">
                            📋 Logs
                        </button>
                        <button onclick="waymakerAdmin.exportData()" 
                                class="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs">
                            💾 Export
                        </button>
                        <button onclick="waymakerAdmin.clearAllMessages()" 
                                class="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs">
                            🧹 Clear
                        </button>
                    </div>
                `;
                
                // Insert admin panel at the top of the enhanced features section
                const firstChild = enhancedFeaturesSection.firstElementChild;
                enhancedFeaturesSection.insertBefore(adminPanel, firstChild);
                
                console.log('✅ Admin panel added to Enhanced Features');
            } else if (enhancedFeaturesSection) {
                console.log('ℹ️ Admin panel already exists');
            } else {
                console.warn('⚠️ Enhanced Features section not found');
            }
        }, 2000); // Increased timeout to ensure DOM is ready
    }

    // Admin-specific methods
    adminEditMessage(messageId) {
        if (!this.isAdmin()) {
            console.warn('Unauthorized admin action attempted');
            return;
        }

        console.log('🛠️ Admin editing message:', messageId);
        this.logAdminAction('edit', messageId, 'Admin edit initiated');
        
        // Use existing edit functionality
        this.chat.startEditMessage(messageId);
    }

    adminDeleteMessage(messageId) {
        if (!this.isAdmin()) {
            console.warn('Unauthorized admin action attempted');
            return;
        }

        const messageEl = document.getElementById(messageId);
        const contentEl = messageEl?.querySelector('.message-content');
        const messageContent = contentEl?.textContent || 'Unknown message';

        if (confirm(`Admin Delete: Remove this message?\n\n"${messageContent.substring(0, 100)}"`)) {
            console.log('🗑️ Admin deleting message:', messageId);
            this.logAdminAction('delete', messageId, messageContent.substring(0, 100));
            
            // Use existing delete functionality  
            this.chat.deleteMessage(messageId);
        }
    }

    showUserManagement() {
        alert('👥 User Management\n\nComing soon:\n• View all users\n• User activity logs\n• Ban/suspend users\n• Warning system');
    }

    showModerationLog() {
        const logs = JSON.parse(localStorage.getItem('waymaker_admin_logs') || '[]');
        const logText = logs.map(log => 
            `${log.timestamp}: ${log.action} - ${log.details}`
        ).join('\n');
        
        alert('📋 Moderation Log\n\n' + (logText || 'No admin actions logged yet.'));
    }

    exportData() {
        try {
            const data = {
                messages: this.chat.conversationHistory || [],
                users: this.chat.connectedUsers || [],
                adminLogs: JSON.parse(localStorage.getItem('waymaker_admin_logs') || '[]'),
                exportDate: new Date().toISOString()
            };
            
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `waymaker-admin-export-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
            
            console.log('💾 Admin data exported successfully');
        } catch (error) {
            console.error('Export failed:', error);
            alert('Export failed. Please try again.');
        }
    }

    clearAllMessages() {
        if (confirm('🧹 Admin Clear All Messages\n\nThis will remove ALL messages from the chat.\nThis action cannot be undone.\n\nContinue?')) {
            this.logAdminAction('clear_all', 'all', 'All messages cleared');
            this.chat.clearChat();
            console.log('🧹 Admin cleared all messages');
        }
    }

    logAdminAction(action, target, details) {
        try {
            const logs = JSON.parse(localStorage.getItem('waymaker_admin_logs') || '[]');
            logs.push({
                timestamp: new Date().toISOString(),
                action: action,
                target: target,
                details: details,
                admin: 'Kenneth'
            });
            
            // Keep only last 100 log entries
            if (logs.length > 100) {
                logs.splice(0, logs.length - 100);
            }
            
            localStorage.setItem('waymaker_admin_logs', JSON.stringify(logs));
        } catch (error) {
            console.error('Failed to log admin action:', error);
        }
    }

    generateMessageId() {
        return 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
}

// Global admin instance
let waymakerAdmin = null;

// Initialize when both DOM and chat are ready
function initializeWayMakerAdmin() {
    if (window.chat && typeof window.chat.addMessageToUI === 'function') {
        waymakerAdmin = new WayMakerAdminExtension(window.chat);
        console.log('✅ WayMaker Admin Extension loaded successfully');
        return true;
    }
    return false;
}

// Try initialization multiple times
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔧 DOM loaded, waiting for chat instance...');
    
    // Try immediately
    if (initializeWayMakerAdmin()) return;
    
    // Try every 100ms for up to 5 seconds
    let attempts = 0;
    const maxAttempts = 50;
    
    const initInterval = setInterval(() => {
        attempts++;
        
        if (initializeWayMakerAdmin()) {
            clearInterval(initInterval);
        } else if (attempts >= maxAttempts) {
            clearInterval(initInterval);
            console.warn('⚠️ Failed to initialize admin extension - chat instance not found');
        }
    }, 100);
});
