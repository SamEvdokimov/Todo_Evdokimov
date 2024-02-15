const sendButton = document.querySelector('#send-button');
function handClick(event) {
  console.log('Hello, World!');
  event.preventDefault();
}
sendButton.addEventListener('click', handClick);
