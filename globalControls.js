// Global control parameters
const globalControls = {
  volumes: {
    kick: -1,
    snare: -3,
    hiHat: -4,
    bass: -1,
  },
  globalKey: "F",
  bpm: 128,
};

// Function to update global controls
function updateGlobalControls(newControls) {
  Object.assign(globalControls, newControls);
  kick.updateGlobalControls(globalControls);
  hiHat.updateGlobalControls(globalControls);
  snare.updateGlobalControls(globalControls);
  bass.updateGlobalControls(globalControls);
}

// Assign to the global object (window in the browser)
window.globalControls = globalControls;
window.updateGlobalControls = updateGlobalControls;
