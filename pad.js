// pad.js

class Pad {
    constructor(volume, globalKey) {
      this.synth = new Tone.PolySynth().toDestination();
      this.synth.volume.value = volume + globalControls.volumes.pad;
      this.globalKey = globalKey;
      this.note = [this.globalKey + "2", this.globalKey + "3", this.globalKey + "4"];
  
      // Exposed synthesizer parameters
      this.params = this.generateRandomPadParams();
  
      // Apply parameters to the synthesizer
      this.updateSynthParams();
  
      // Initialize the constant minor chord
      this.playConstantMinorChord();
    }
  
    playConstantMinorChord() {
      // Check if the note is not null before triggering attack and release
      if (this.note.every((note) => note !== null)) {
        this.synth.triggerAttack(this.note);
      }
    }
  
    stopPad() {
      this.synth.triggerRelease(this.note);
    }
  
    initialize() {
      // Play the constant minor chord when initialized
      this.playConstantMinorChord();
    }
  
    generateRandomPadParams() {
        
        const octave = 3; 
    
        return {
          oscillator: {
            type: this.randomOscillatorType(),
            modulationType: 'sine', // Use a sine wave for modulation
            harmonicity: Math.random() * 3 + 1, // Adjust harmonicity for smoother tones
            detune: Math.random() * 10 - 5, // Detune for slight pitch variation
          },
          filter: {
            type: 'lowpass',
            frequency: Math.random() * 500 + 200, // Adjust filter frequency
            rolloff: -12,
          },
          octave,
        };
      }
    updateSynthParams() {
      // Apply the parameters to the synthesizer
      this.synth.set(this.params);
    }
  
    createNewRandomPad() {
      // Dispose of the current synthesizer
      this.synth.dispose();
  
      // Create a new synthesizer with random parameters
      this.synth = new Tone.PolySynth().toDestination();
      this.synth.volume.value = globalControls.volumes.pad;
  
      // Generate new random parameters
      this.params = this.generateRandomPadParams();
  
      // Apply the new parameters
      this.updateSynthParams();
  
      // Play the constant minor chord
      this.playConstantMinorChord();
    }
  
    updateGlobalControls(newControls) {
      // Dispose of the current synthesizer
      this.synth.dispose();
  
      // Update global controls
      Object.assign(globalControls, newControls);
  
      // Create a new synthesizer with updated global controls
      this.synth = new Tone.PolySynth().toDestination();
      this.synth.volume.value = globalControls.volumes.pad;
  
      // Generate new random parameters
      this.params = this.generateRandomPadParams();
  
      // Apply the new parameters
      this.updateSynthParams();
  
      // Play the constant minor chord
      this.playConstantMinorChord();
    }
  
    adjustSynthParams() {
      // Add any specific adjustments you want for the pad
    }
  
    // Function to generate a random oscillator type
    randomOscillatorType() {
      const oscillatorTypes = ["triangle", "sine", "sawtooth", "square"];
      return oscillatorTypes[Math.floor(Math.random() * oscillatorTypes.length)];
    }
  }
  
  // Create an instance of the Pad class
  const pad = new Pad(globalControls.volumes.pad, globalControls.globalKey);
  
  // Initialize the pad when the document is fully loaded
  document.addEventListener("DOMContentLoaded", () => {
    pad.initialize();
  });
  
  // Stop the pad when the stop button is pressed
  const stopBtn = document.getElementById("stopBtn");
  stopBtn.addEventListener("click", () => {
    pad.stopPad();
  });
  
  // Export the pad instance for use in other files
  window.pad = pad;
  