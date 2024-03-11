// pad.js

class Pad {
    constructor(volume, globalKey) {
      this.synth = new Tone.PolySynth().toDestination();
      this.synth.volume.value = volume + globalControls.volumes.pad;
      this.globalKey = globalKey;
      this.note = [this.globalKey + "2", this.globalKey + "3", this.globalKey + "4"];
    }
  
    playConstantMinorChord() {
      // Check if note is not null before triggering attack and release
      if (this.note.every(note => note !== null)) {
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
  
    createNewRandomPad() {
      this.synth.dispose();
      this.synth = new Tone.PolySynth().toDestination();
      this.synth.volume.value = globalControls.volumes.pad;
      this.playConstantMinorChord();
    }
  
    updateGlobalControls(newControls) {
      this.synth.dispose();
      Object.assign(globalControls, newControls);
      this.synth = new Tone.PolySynth().toDestination();
      this.synth.volume.value = globalControls.volumes.pad;
      this.playConstantMinorChord();
    }
  
    adjustSynthParams() {
      // Add any specific adjustments you want for the pad
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
  