// globalControls.js

// Global control parameters
const globalControls = {
  volumes: {
    kick: -1,
    snare: -5,
    hiHat: -3,
    bass: -1,
  },
  globalKey: "F",
  bpm: 128,
  patternLength: 2, 
};

// Function to update gobal controls
function updateGlobalControls(newControls) {
  Object.assign(globalControls, newControls);
}

// Assign to the global object (window in the browser)
window.globalControls = globalControls;
window.updateGlobalControls = updateGlobalControls;
