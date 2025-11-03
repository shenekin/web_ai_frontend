document.getElementById("fileInput").addEventListener("change", handleFileUpload);
document.getElementById("playButton").addEventListener("click", startSpeech);

let uploadedText = "";

// Handle File Upload
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedText = e.target.result;
            document.getElementById("displayText").innerText = uploadedText;
        };
        reader.readAsText(file);
    }
}

// Start Speech
function startSpeech() {
    if (uploadedText === "") {
        alert("Please upload a text file!");
        return;
    }

    const character = document.getElementById("character").value;
    const emotion = document.getElementById("emotion").value;

    // Make an API request to the backend for speech synthesis
    fetch('/api/speech', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text: uploadedText,
            character: character,
            emotion: emotion
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const audio = new Audio(data.audio_file);
            audio.play();
        } else {
            alert("Something went wrong!");
        }
    });
}