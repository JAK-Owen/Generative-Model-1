// globalControls.js

// Global control parameters
const globalControls = {
    volumes: {
      kick: -6,
      snare: -6,
      hiHat: -6,
    },
    keys: {
      kick: "C1",
      snare: "D1",
      hiHat: "E1",
    },
    bpm: 120,
  };
  
  // Function to update global controls
  function updateGlobalControls(newControls) {
    Object.assign(globalControls, newControls);
    // You can add more logic here if needed
  }
  
  // Assign to the global object (window in the browser)
  window.globalControls = globalControls;
  window.updateGlobalControls = updateGlobalControls;
  