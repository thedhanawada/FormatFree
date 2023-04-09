const cleanButton = document.getElementById('clean-button');
const outputContainer = document.getElementById('output-container');
const output = document.getElementById('output');
const outputLabel = document.getElementById('output-label');
const copyButton = document.getElementById('copy-button');
const linebreakCheckbox = document.getElementById('linebreak-checkbox');

cleanButton.addEventListener('click', () => {
  const dirtyText = document.getElementById('input').value;
  let cleanText = dirtyText;
  
  // Check which checkboxes are selected
  const capitalizeCheckbox = document.getElementById('capitalize-checkbox');
  const uppercaseCheckbox = document.getElementById('uppercase-checkbox');
  
  if (capitalizeCheckbox.checked) {
    // Capitalize the first letter of each sentence
    cleanText = dirtyText.replace(/(^\s*\w|[\.\!\?]\s*\w)/g, function(c) { return c.toUpperCase(); });
  }
  else if (uppercaseCheckbox.checked) {
    // Convert all text to uppercase
    cleanText = dirtyText.toUpperCase();
  }
  
  if (linebreakCheckbox.checked) {
    // Remove all line breaks
    cleanText = cleanText.replace(/(\r\n|\n|\r)/gm, "");
  }
  else {
    // Add line breaks after each sentence
    cleanText = cleanText.replace(/([\.\?!])\s*(?=[A-Z])/g, "$1\n");
  }
  
  // Remove HTML tags
  cleanText = cleanText.replace(/<\/?[^>]+(>|$)/g, "");
  
  // Check which encoding is selected
  const encodingDropdown = document.getElementById('encoding-dropdown');
  const selectedEncoding = encodingDropdown.value;
  if (selectedEncoding !== 'none') {
    // Encode the text using the selected encoding
    const encoder = new TextEncoder(selectedEncoding);
    const encodedText = encoder.encode(cleanText);
    cleanText = String.fromCharCode.apply(null, encodedText);
  }

  if (cleanText) {
    outputContainer.style.display = "block";
    output.innerText = cleanText;
    outputLabel.style.display = "block";
    copyButton.style.display = "block";
    copyButton.innerText = copyButton.getAttribute('data-original-text');
  } else {
    outputContainer.style.display = "none";
    outputLabel.style.display = "none";
    copyButton.style.display = "none";
  }
});

copyButton.addEventListener('click', () => {
  const outputText = document.getElementById('output');
  const textArea = document.createElement('textarea');
  textArea.value = outputText.innerText;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
  const originalText = copyButton.getAttribute('data-original-text');
  copyButton.innerText = 'Copied!';
  setTimeout(() => {
    copyButton.innerText = originalText;
  }, 1000);
});
