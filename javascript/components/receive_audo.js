 <script>
    document.getElementById("getAudioBtn").addEventListener("click", async () => {
      const btn = document.getElementById("getAudioBtn");
      const audioPlayer = document.getElementById("audioPlayer");
      btn.disabled = true;
      btn.textContent = "Generating...";
      const displayTextElement = getElement('playing');
      try {
        // Send request to backend
        const response = await fetch("http://127.0.0.1:5000/synthesize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: "Hello! I am your AI robot speaking." })
        });

        if (!response.ok) {
          throw new Error("Failed to fetch audio");
        }

        // Convert response to Blob (binary)
        const audioBlob = await response.blob();

        // Create object URL for audio
        const audioURL = URL.createObjectURL(audioBlob);

        // Set source and play
        audioPlayer.src = audioURL;
        audioPlayer.play();

      } catch (error) {
        console.error(error);
        alert("Error: Cannot load audio from backend.");
      } finally {
        btn.disabled = false;
        btn.textContent = "Generate & Play AI Voice";
      }
    });
  </script>