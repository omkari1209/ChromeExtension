chrome.runtime.onInstalled.addListener(() => {
  console.log('WhatsApp Translator Extension Installed');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getUserLanguagePreference') {
    chrome.storage.sync.get(['preferredLanguage'], (result) => {
      const preferredLanguage = result.preferredLanguage || 'en'; // Default to English
      sendResponse({ preferredLanguage });
    });
    return true; // To allow asynchronous response
  }
});
