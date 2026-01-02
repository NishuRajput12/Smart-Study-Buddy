const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Add user message to chat
function addMessage(sender, text) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message');
  msgDiv.classList.add(sender === 'user' ? 'user-msg' : 'bot-msg');
  msgDiv.innerText = text;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Send button click or Enter key
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function(e){
  if(e.key === 'Enter') sendMessage();
});

async function sendMessage() {
  const message = userInput.value.trim();
  if(!message) return;

 
  addMessage('user', message);
  userInput.value = '';

  // Call Gemini API
  try {
    const response = await fetch('https://api.openai.com/v1/responses', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'utopian-outlook-477813-r0' 
      },
      body: JSON.stringify({ prompt: message })
    });

    const data = await response.json();
    const botReply = data.response || "Sorry, I could not answer that.";
    addMessage('bot', botReply);

  } catch (error) {
    console.error(error);
    addMessage('bot', 'Error connecting to AI API.');
  }
}
