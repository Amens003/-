const textArea = document.getElementById('text');
const shiftButton = document.getElementById('shift');
const languageButton = document.getElementById('language');
const encodingButton = document.getElementById('encoding');
const decodingButton = document.getElementById('decoding');
const resultArea = document.getElementById('result');
const hackButton = document.getElementById('hack'); 

function caesarCipher(text, shift, language) {
  let result = '';
  const alphabet = language === 'en' ? 'abcdefghijklmnopqrstuvwxyz' : 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
  const alphabetLength = alphabet.length;

  for (let i = 0; i < text.length; i++) {
    const char = text[i].toLowerCase();
    const index = alphabet.indexOf(char);

    if (index === -1) {
      result += text[i];
    } else {
      let shiftIndex = (index + shift + alphabetLength) % alphabetLength;
      result += text[i] === char ? alphabet[shiftIndex] : alphabet[shiftIndex].toUpperCase();
    }
  }
  return result;
}


encodingButton.addEventListener('click', () => {
  const text = textArea.value;
  const shift = parseInt(shiftButton.value);
  const language = languageButton.value;
  resultArea.value = caesarCipher(text, shift, language);
});

decodingButton.addEventListener('click', () => {
  const text = textArea.value;
  const shift = parseInt(shiftButton.value);
  const language = languageButton.value;
  resultArea.value = caesarCipher(text, -shift, language);
});

// Взлом зашифрованного текста пребором
hackButton.addEventListener('click', () => {
  const text = textArea.value;
  const language = languageButton.value;
  let hackResults = '';

  const maxShift = language === 'en' ? 25 : 33;

  for (let shift = 1; shift <= maxShift; shift++) {
    const decodedText = caesarCipher(text, -shift, language);
    hackResults += `Shift ${shift}: ${decodedText}\n`;
  }

  resultArea.value = hackResults;
});
