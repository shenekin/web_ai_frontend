// script.js
document.getElementById("fileForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission to handle file upload

    const formData = new FormData();
    const selectedFileType = document.getElementById('fileType').value; // Get selected file type
    const fileInput = document.getElementById('fileUpload');

    // Check if the user selected a file and the file type matches the selected option
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];

        // Validate the file extension based on the selected option
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
                    document.getElementById('response').textContent = 'File uploaded successfully!';
                } else if (data.error) {
                    document.getElementById('response').textContent = `Error: ${data.error}`;
                }
            })
            .catch(error => {
                console.log(error);  // Log the error to console for debugging
                document.getElementById('response').textContent = 'Error uploading file.';
            });
        } else {
            document.getElementById('response').textContent = 'Please upload a file of the correct type.';
        }
    } else {
        document.getElementById('response').textContent = 'Please select a file to upload.';
    }
});
