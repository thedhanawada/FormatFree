const cleanButton = document.getElementById('clean-button');
const outputContainer = document.getElementById('output-container');
const output = document.getElementById('output');
const copyButton = document.getElementById('copy-button');
const linebreakCheckbox = document.getElementById('linebreak-checkbox');
const outputLabel = document.getElementById('output-label');
const inputElement = document.getElementById('input');
const charCountElement = document.getElementById('char-count');

inputElement.addEventListener('input', () => {
  charCountElement.innerText = `${inputElement.value.length} characters`;
});

// Trigger the input event to initialize the character count on page load
inputElement.dispatchEvent(new Event('input'));


cleanButton.addEventListener('click', () => {
  const dirtyText = document.getElementById('input').value;
  let cleanText = dirtyText;
  
  const outputFormatDropdown = document.getElementById('output-format-dropdown');
  const selectedOutputFormat = outputFormatDropdown.value;

  if (selectedOutputFormat === 'html') {
    // Convert to HTML (wrap in <p> tag)
    cleanText = convertToHTML(cleanText);
  } else if (selectedOutputFormat === 'markdown') {
    // Wrap the text in markdown
    cleanText = wrapInMarkdown(cleanText);
  }

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

function convertToHTML(text) {
  const converter = new showdown.Converter();
  return converter.makeHtml(text);
}

function wrapInMarkdown(text) {
  return text
    .split('\n')
    .map((line) => line.trim() === '' ? '' : line)
    .join('\n\n');
}

function copyToClipboard() {
    const output = document.getElementById("output");
    const textarea = document.createElement("textarea");
    textarea.value = output.innerText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  
    const copyButton = document.getElementById("copy-button");
    copyButton.innerText = "Copied!";
    setTimeout(() => {
      copyButton.innerText = copyButton.getAttribute("data-original-text");
    }, 1500);
  }
  