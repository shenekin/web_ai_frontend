import { getElement } from '../utils/dom-utils.js';

export function setupFileUpload(displayTextCallback) {
    const fileInput = getElement('fileInput');
    const responseElement = getElement('response'); // Get the response element
    const progressBar = getElement('progressBar'); // Get the progress bar element
    const progressText = getElement('progressText'); // Get the progress text element

    // Character and emotion selection
//    const characterSelect = getElement('character');
//    const emotionSelect = getElement('emotion');

    // Upload file when the user selects a file
//    const uploadButton = getElement('uploadButton'); // This button will trigger file input

    // Handle button click to open file input dialog
//    uploadButton.addEventListener('click', function() {
//        fileInput.click(); // Trigger the file input click event
//    });

    fileInput.addEventListener('change', function(event) {
        const fileTypeSelect = getElement('fileType'); // Get the file type select element
        const selectedFileType = fileTypeSelect.value; // Get the selected file type
        const formData = new FormData(); // Create FormData object

        // Add selected character and emotion to FormData
//        const selectedCharacter = characterSelect.value;
//        const selectedEmotion = emotionSelect.value;
//
//        formData.append('character', selectedCharacter);
//        formData.append('emotion', selectedEmotion);

        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];

            if (
                (selectedFileType === 'txt' && file.name.toLowerCase().endsWith('.txt')) ||
                (selectedFileType === 'doc' && file.name.toLowerCase().endsWith('.doc')) ||
                (selectedFileType === 'docx' && file.name.toLowerCase().endsWith('.docx'))
            ) {
                formData.append('file', file);

                // Initialize XMLHttpRequest
                const xhr = new XMLHttpRequest();

                // Set up the progress event listener
                xhr.upload.addEventListener('progress', function(event) {
                    if (event.lengthComputable) {
                        const percent = (event.loaded / event.total) * 100;
                        // Update the progress bar and text
                        progressBar.style.width = `${percent}%`;
                        progressText.textContent = `Uploading: ${Math.round(percent)}%`;
                    }
                });

                // Set up the load event listener
                xhr.onload = function() {
                    if (xhr.status === 200) {
                        try {
                            const data = JSON.parse(xhr.responseText);
                            console.log(data);  // Debugging: Log the response data
                            if (data.message) {
                                responseElement.textContent = 'File uploaded successfully!';
                                // Play the audio (autoplay)
                                const audioPlayer = getElement('audioPlayer'); // Get the audio player element
                                const audioSource = getElement('audioSource'); // Get the audio source element
                                audioSource.src = 'data:audio/mp3;base64,' + data.audio_base64; // Set the audio source
                                audioPlayer.load(); // Reload the audio player
                                audioPlayer.play(); // Play the audio automatically
                                // Optionally display additional data (text)
                                displayTextCallback(data.uploadedText);
                            } else if (data.error) {
                                responseElement.textContent = `Error: ${data.error}`;
                            }
                        } catch (e) {
                            console.error('Error parsing response:', e);
                            responseElement.textContent = 'Error processing file.';
                        }
                    } else {
                        // Got error message from backend
                        responseElement.textContent = `Error: ${xhr.statusText}`;
                    }
                };

                // Set up the error event listener
                xhr.onerror = function() {
                    responseElement.textContent = 'Error uploading file: ' + xhr.statusText;
                };

                // Configure the request (POST to /upload)
                const API_URL = 'http://119.8.188.101:5000/upload'; // Change to your server IP

                xhr.open('POST', API_URL, true);

                //xhr.open('POST', 'http://127.0.0.1:5000/upload', true);

                // Send the FormData object with the file
                xhr.send(formData);
            } else {
                responseElement.textContent = 'Please upload a file of the correct type.';
            }
        } else {
            responseElement.textContent = 'Please select a file to upload.';
        }
    });
}
