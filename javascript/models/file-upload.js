// file-upload.js
import { getElement } from '../utils/dom-utils.js';


export function setupFileUpload(displayTextCallback) {
    const fileInput = getElement('fileInput');
    const responseElement = getElement('response'); // Get the response element

    fileInput.addEventListener('change', function(event) {
        const fileTypeSelect = getElement('fileType'); // Get the file type select element
        const selectedFileType = fileTypeSelect.value; // Get the selected file type
        const formData = new FormData(); // Create FormData object

        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];

            if (
                (selectedFileType === 'txt' && file.name.toLowerCase().endsWith('.txt')) ||
                (selectedFileType === 'doc' && file.name.toLowerCase().endsWith('.doc')) ||
                (selectedFileType === 'docx' && file.name.toLowerCase().endsWith('.docx'))
            ) {
                formData.append('file', file);

                // Send the form data via fetch API to the backend
                fetch('http://127.0.0.1:5000/upload', {
                    method: 'POST',
                    body: formData
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);  // Debugging: Log the response data
                        if (data.message) {

                            responseElement.textContent = 'File uploaded successfully!';
                        } else if (data.error) {
                            responseElement.textContent = `Error: ${data.error}`;
                        }
                    })
                    .catch(error => {
                        console.error(error);  // Log the error to console for debugging
                        responseElement.textContent = 'Error uploading file: ' + error.message; // More specific error
                    });
            } else {
                responseElement.textContent = 'Please upload a file of the correct type.';
            }
        } else {
            responseElement.textContent = 'Please select a file to upload.';
        }
    });
}