// Function to add the Translate Chat button to the chat header
function addTranslateButton() {
  const chatHeader = document.querySelector('header');  // Locate chat header

  if (!chatHeader) {
    console.error("Chat header not found.");
    return;
  }

  // Avoid adding duplicate buttons
  if (document.getElementById('translateChatBtn')) {
    return;
  }

  // Create the Translate Chat button
  const translateBtn = document.createElement('button');
  translateBtn.id = 'translateChatBtn';
  translateBtn.innerText = 'Translate Chat';
  translateBtn.style.margin = '10px';
  translateBtn.style.padding = '5px';
  translateBtn.style.backgroundColor = '#4CAF50';
  translateBtn.style.color = 'white';
  translateBtn.style.border = 'none';
  translateBtn.style.borderRadius = '5px';
  translateBtn.style.cursor = 'pointer';

  // Append the button to the chat header
  chatHeader.appendChild(translateBtn);

  // Add click event listener to the Translate button
  translateBtn.addEventListener('click', async () => {
    console.log('Translate button clicked');
    try {
      await translateChats();
    } catch (err) {
      console.error('Error translating chats:', err);
    }
  });
}

// Function to translate all visible chat messages
async function translateChats() {
  const messages = document.querySelectorAll('.selectable-text span');
  
  if (messages.length === 0) {
    console.error("No messages found to translate.");
    return;
  }

  // Try to retrieve the language preference
  chrome.storage.sync.get('preferredLanguage', async function (result) {
    if (chrome.runtime.lastError) {
      console.error('Error getting language preference:', chrome.runtime.lastError.message);
      return;
    }

    const targetLang = result.preferredLanguage || 'en';  // Default to English if not set

    // Translate each message
    for (let message of messages) {
      const originalText = message.innerText;
      const translatedText = await translateText(originalText, targetLang);
      message.innerText = translatedText;
    }
  });
}

// Mock translation function (we have to replace with actual translation logic)
async function translateText(text, targetLang) {
  return `[Translated to ${targetLang}]: ${text}`;  // Mock translation
}

// Function to observe changes in the DOM
function observeDOMChanges() {
  const observer = new MutationObserver(() => {
    const chatHeader = document.querySelector('header');  // Re-check for the header
    if (chatHeader) {
      addTranslateButton();
    }
  });

  // Observe changes in the document body
  observer.observe(document.body, { childList: true, subtree: true });
}

// Call when content script is loaded
observeDOMChanges();
