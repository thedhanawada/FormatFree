const cleanButton = document.getElementById('clean-button');
const outputContainer = document.getElementById('output-container');
const output = document.getElementById('output');
const copyButton = document.getElementById('copy-button');
const linebreakCheckbox = document.getElementById('linebreak-checkbox');
const outputLabel = document.getElementById('output-label');

cleanButton.addEventListener('click', () => {
  const dirtyText = document.getElementById('input').value;
  let cleanText = dirtyText;
  
  const outputFormatDropdown = document.getElementById('output-format-dropdown');
  const selectedOutputFormat = outputFormatDropdown.value;

  if (selectedOutputFormat === 'html') {
    // Convert to HTML (wrap in <p> tag)
    cleanText = `<p>${escapeHTML(cleanText).replace(/\n/g, '</p><p>')}</p>`;
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

function convertToMarkdown(text) {
    // Replace bold tags with markdown syntax
    text = text.replace(/<\/?b>|<\/?strong>/gi, '**');
    // Replace italic tags with markdown syntax
    text = text.replace(/<\/?i>|<\/?em>/gi, '_');
    // Replace headings with markdown syntax
    for (let i = 1; i <= 6; i++) {
      text = text.replace(new RegExp(`<(h${i})[^>]*>(.*?)</\\1>`, 'gi'), (match, p1, p2) => `${'#'.repeat(i)} ${p2}\n`);
    }
    // Replace links with markdown syntax
    text = text.replace(/<a[^>]+href="(.*?)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)');
    // Replace unordered lists with markdown syntax
    text = text.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (match, p1) => `${p1.replace(/<li[^>]*>(.*?)<\/li>/gi, '* $1')}\n`);
    // Replace ordered lists with markdown syntax
    text = text.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (match, p1) => `${p1.replace(/<li[^>]*>(.*?)<\/li>/gi, (m, p2, index) => `${index + 1}. ${p2}`)}\n`);
  
    return text;
  }
  
  function escapeHTML(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
  }
  
  function wrapInMarkdown(text) {
    return text
      .split('\n')
      .map((line) => line.trim() === '' ? '' : line)
      .join('\n\n');
  }
  

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
