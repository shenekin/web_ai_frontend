
// app-webai.js
import { getElement } from './utils/dom-utils.js';
import { setupFileUpload } from './models/file-upload.js';
import { speak } from './components/speech-synthesis.js';

(function() {
    // DOM element references
//    const characterSelect = getElement('character');
//    const emotionSelect = getElement('emotion');
//    const playButton = getElement('playButton');
    const displayTextElement = getElement('displayText');


    let uploadedText = '';

    // Function to update the display text
    function updateDisplayText(text) {
        uploadedText = text;
        displayTextElement.textContent = text;
    }

    // Setup file upload
    setupFileUpload(updateDisplayText);

    // Speech synthesis event listener
//    playButton.addEventListener('click', function() {
//        if (!uploadedText) {
//            alert('Please upload a file first.');
//            return;
//        }
//        const character = characterSelect.value;
//        const emotion = emotionSelect.value;
//        speak(uploadedText, character, emotion);
//    });
})();