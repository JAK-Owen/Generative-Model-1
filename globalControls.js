// Global control parameters
window.globalControls = {
  volumes: {
    kick: -6,
    snare: -10,
    hiHat: -9,
    bass: -6,
    pad: -28,
    lead: -18,
  },
  globalKey: "F",
  bpm: 128,
  patternLength: 1,
};

// Update global controls
window.updateGlobalControls = function(newControls) {
  Object.assign(globalControls, newControls);
};
