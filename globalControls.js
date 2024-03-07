// globalControls.js

// Global control parameters
const globalControls = {
  volumes: {
    kick: -3,
    snare: -4,
    hiHat: -4,
    bass: -3,
  },
  globalKey: "F",
  bpm: 128,
  patternLength: 4, 
};

// Function to update gobal controls
function updateGlobalControls(newControls) {
  Object.assign(globalControls, newControls);
  // You can add more logic here if needed
}

// Assign to the global object (window in the browser)
window.globalControls = globalControls;
window.updateGlobalControls = updateGlobalControls;
