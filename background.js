// Background Service Worker for DeveloperTools Extension
// This runs in the background and handles extension lifecycle events

// Extension installation/update handler
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        console.log('DeveloperTools extension installed');
        
        // Set default preferences
        chrome.storage.local.set({
            'theme': 'auto',
            'version': chrome.runtime.getManifest().version
        });
        
    } else if (details.reason === 'update') {
        console.log('DeveloperTools extension updated to', chrome.runtime.getManifest().version);
    }
});

// Keep service worker alive (optional, for future features)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Handle messages from popup if needed
    if (request.action === 'ping') {
        sendResponse({ status: 'alive' });
    }
    return true;
});
