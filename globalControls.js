// globalControls.js

// Global control parameters
const globalControls = {
  volumes: {
    kick: -6,
    snare: -10,
    hiHat: -9,
    bass: -6,
    pad: -25,
  },
  globalKey: "G",
  bpm: 128,
  patternLength: 1,
};

// Function to update global controls
function updateGlobalControls(newControls) {
  Object.assign(globalControls, newControls);
}

// Assign to the global object (window in the browser)
window.globalControls = globalControls;
window.updateGlobalControls = updateGlobalControls;
