document.addEventListener('DOMContentLoaded', function () {
  // Check if chrome.storage.sync is available
  if (chrome.storage && chrome.storage.sync) {
    // Load saved language preference when popup is opened
    chrome.storage.sync.get('preferredLanguage', function (result) {
      if (chrome.runtime.lastError) {
        console.error('Error retrieving language:', chrome.runtime.lastError.message);
        return;
      }
      
      if (result.preferredLanguage) {
        document.getElementById('languageSelect').value = result.preferredLanguage;
      }
    });

    // Save language preference when the user clicks "Save Language"
    document.getElementById('saveLanguage').addEventListener('click', function () {
      const selectedLanguage = document.getElementById('languageSelect').value;
      chrome.storage.sync.set({ preferredLanguage: selectedLanguage }, function () {
        if (chrome.runtime.lastError) {
          console.error('Error saving language:', chrome.runtime.lastError.message);
        } else {
          console.log('Preferred language saved as:', selectedLanguage);
        }
      });
    });
  } else {
    console.error('chrome.storage.sync is not available.');
  }
});
