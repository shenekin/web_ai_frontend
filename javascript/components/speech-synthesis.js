// speech-synthesis.js
export function speak(text, character, emotion) {
    const synth = window.speechSynthesis;

    if (!synth) {
        alert('Web Speech API is not supported in this browser.');
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    // Customize voice based on character and emotion
    if (character === 'robot1') {
        utterance.voice = synth.getVoices().find(voice => voice.name.includes('Google US English'));
        utterance.rate = 1.2;
    } else if (character === 'robot2') {
        utterance.voice = synth.getVoices().find(voice => voice.name.includes('Google UK English Female'));
        utterance.pitch = 0.8;
    } else {
        utterance.voice = synth.getVoices().find(voice => voice.name.includes('Microsoft David Desktop'));
    }

    if (emotion === 'sad') {
        utterance.rate = 0.9;
        utterance.pitch = 0.7;
    } else if (emotion === 'happy') {
        utterance.rate = 1.1;
        utterance.pitch = 1.1;
    }

    synth.speak(utterance);
}