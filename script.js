const cleanButton = document.getElementById('clean-button');
const outputContainer = document.getElementById('output-container');
const output = document.getElementById('output');
const input = document.getElementById('input');
const charCount = document.getElementById('char-count');

input.addEventListener('input', () => {
  const text = input.value;
  const count = text.length;
  charCount.innerText = `${count} characters`;
});


input.addEventListener('input', () => {
  const text = input.value;
  const count = text.length;
  input.setAttribute('data-charcount', count);
});


function copyToClipboard() {
  const outputText = document.getElementById('output');
  const textArea = document.createElement('textarea');
  textArea.value = outputText.innerText;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
  const copyButton = document.getElementById('copy-button');
  const originalText = copyButton.getAttribute('data-original-text');
  copyButton.innerText = 'Copied!';
  setTimeout(() => {
    copyButton.innerText = originalText;
  }, 1000);
}

document.getElementById('copy-button').addEventListener('click', () => {
const outputText = document.getElementById('output');
const textArea = document.createElement('textarea');
textArea.value = outputText.innerText;
document.body.appendChild(textArea);
textArea.select();
document.execCommand('copy');
document.body.removeChild(textArea);
});

cleanButton.addEventListener('click', () => {
  const dirtyText = document.getElementById('input').value;
  const cleanText = dirtyText.replace(/<\/?[^>]+(>|$)/g, "");
  if (cleanText) {
    outputContainer.style.display = "block";
    output.innerText = cleanText;
    const copyButton = document.getElementById('copy-button');
    const originalText = copyButton.getAttribute('data-original-text');
    copyButton.style.display = "block";
    copyButton.innerText = originalText;
  } else {
    outputContainer.style.display = "none";
    const copyButton = document.getElementById('copy-button');
    copyButton.style.display = "none";
  }
});