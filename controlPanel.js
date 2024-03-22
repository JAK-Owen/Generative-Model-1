// Function to create the control panel UI
function createControlPanel() {
    const controlPanel = document.createElement('div');
    controlPanel.classList.add('control-panel');
  
    // Create input fields for each global control parameter
    for (let control in globalControls) {
        if (typeof globalControls[control] === 'object') {
            // Handle nested objects (volumes)
            for (let subControl in globalControls[control]) {
                const input = createInput(subControl, control, globalControls[control][subControl], controlPanel);
                controlPanel.appendChild(input);
            }
        } else {
            const input = createInput(control, null, globalControls[control], controlPanel);
            controlPanel.appendChild(input);
        }
    }
  
    // Append the control panel to the body
    document.body.appendChild(controlPanel);
}

// Function to create input fields
function createInput(name, parentControl, value, container) {
    const inputContainer = document.createElement('div');
    inputContainer.classList.add('input-container');
  
    const label = document.createElement('label');
    label.textContent = name;
    inputContainer.appendChild(label);
  
    const input = document.createElement('input');
    input.type = 'number';
    input.value = typeof value === 'number' ? value : 0; // Set value to 0 if not a number
  
    input.addEventListener('input', function() {
        // Update the globalControls object in real-time
        const floatValue = parseFloat(this.value);
        if (!isNaN(floatValue)) {
            if (parentControl) {
                globalControls[parentControl][name] = floatValue;
            } else {
                globalControls[name] = floatValue;
            }
            updateToneInstruments(parentControl, name, floatValue);
        }
    });
  
    inputContainer.appendChild(input);
  
    return inputContainer;
}

// Function to listen for changes in control panel inputs and update globalControls accordingly
function listenForControlChanges() {
    const inputElements = document.querySelectorAll('.input-container input');
    inputElements.forEach(input => {
        input.addEventListener('input', function() {
            const controlName = input.previousSibling.textContent.trim();
            const parentControl = input.parentNode.parentNode.previousSibling ? input.parentNode.parentNode.previousSibling.textContent.trim() : null;
            const floatValue = parseFloat(this.value);
            if (!isNaN(floatValue)) {
                if (parentControl) {
                    globalControls[parentControl][controlName] = floatValue;
                } else {
                    globalControls[controlName] = floatValue;
                }
                updateToneInstruments(parentControl, controlName, floatValue);
            }
        });
    });
}

// Function to update Tone.js instruments based on global controls
function updateToneInstruments(parentControl, controlName, value) {
    switch (parentControl) {
        case 'volumes':
            switch (controlName) {
                case 'kick':
                    // Example: Update volume of the kick instrument
                    kick.updateSynthVolume(value);
                    break;
                case 'snare':
                    // Example: Update volume of the snare instrument
                    snare.updateSynthVolume(value);
                    break;
                case 'hiHat':
                    // Example: Update volume of the hi-hat instrument
                    hiHat.updateSynthVolume(value);
                    break;
                case 'bass':
                    // Example: Update volume of the bass instrument
                    bass.updateSynthVolume(value);
                    break;
                case 'pad':
                    // Example: Update volume of the pad instrument
                    pad.updateSynthVolume(value);
                    break;
                case 'lead':
                    // Example: Update volume of the lead instrument
                    lead.updateSynthVolume(value);
                    break;
                // Add cases for other instruments if needed
            }
            break;
        case null:
            switch (controlName) {
                case 'globalKey':
                    // Example: Update key of all instruments based on the global key
                    const key = `${globalControls.globalKey}1`; // Use globalKey to set the new key
                    kick.updateKey(key);
                    hiHat.updateKey(key);
                    snare.updateKey(key);
                    bass.updateKey(key);
                    pad.updateKey(globalControls.globalKey);
                    lead.updateKey(globalControls.globalKey);
                    break;
                case 'bpm':
                    // Example: Update BPM of the Transport
                    Tone.Transport.bpm.value = value;
                    break;
                // Add cases for other global controls if needed
            }
            break;
        // Add cases for other parent controls if needed
    }
}

// Call the function to create the control panel UI
createControlPanel();

// Call the function to listen for control changes
listenForControlChanges();
