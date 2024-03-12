class Pad {
    constructor(volume, globalKey) {
        this.effectRack = new Tone.Filter({
            type: 'lowpass',
            frequency: this.randomizeParameter(200, 800),
            rolloff: -12,
        }).toDestination();

        const highPassFilter = new Tone.Filter({
            type: 'highpass',
            frequency: this.randomizeParameter(100, 500),
            rolloff: -12,
        });

        const chorus = new Tone.Chorus({
            voices: 16,
            depth: this.randomizeParameter(0.3, 0.7),
            frequency: this.randomizeParameter(2, 8),
            delayTime: {
                '4n': this.randomizeParameter(1, 3),
                '8n': this.randomizeParameter(4, 15),
            },
            feedback: this.randomizeParameter(0.2, 0.6),
            spread: 1,
        }).toDestination();

        const delay = new Tone.PingPongDelay({
            delayTime: this.randomizeParameter(0.05, 0.2),
            feedback: this.randomizeParameter(0.3, 0.7),
            wet: this.randomizeParameter(0.2, 0.5),
            spread: 1,
        }).toDestination();

        const reverb = new Tone.JCReverb({
            preDelay: this.randomizeParameter(0.005, 0.02),
            roomSize: this.randomizeParameter(0.5, 0.9),
            wet: 1,
        }).toDestination();

        this.effectRack.chain(highPassFilter, reverb, delay, chorus);

        this.synth = new Tone.PolySynth().connect(this.effectRack);
        this.synth.volume.value = volume + globalControls.volumes.pad;
        this.globalKey = globalKey;
        this.note = [this.globalKey + "2", this.globalKey + "3", this.globalKey + "4"];
        this.params = this.generateRandomPadParams();

        this.setupSynthesizer();
        this.playConstantMinorChord();
        this.setupLFO();
        this.automateParameterChanges();
    }

    playConstantMinorChord() {
        if (this.note.every((note) => note !== null)) {
            this.synth.triggerAttack(this.note);
        }
    }

    stopPad() {
        this.synth.triggerRelease(this.note);
    }

    initialize() {
        this.playConstantMinorChord();
    }

    generateRandomPadParams() {
        const octave = 2;

        return {
            oscillator: {
                type: this.randomOscillatorType(),
                Type: 'sine',
                harmonicity: Math.random() * 3 + 1,
                detune: Math.random() * 10 - 5,
            },
            filter: {
                type: 'lowpass',
                frequency: this.randomizeParameter(200, 800),
                rolloff: -12,
            },
            octave,
        };
    }

    updateSynthParams() {
        this.synth.set(this.params);
    }

    setupSynthesizer() {
        this.updateSynthParams();
    }

    createNewRandomPad() {
        this.synth.dispose();
        this.synth = new Tone.PolySynth().connect(this.effectRack);
        this.synth.volume.value = globalControls.volumes.pad;
        this.params = this.generateRandomPadParams();
        this.setupSynthesizer();
        this.playConstantMinorChord();
    }

    updateGlobalControls(newControls) {
        this.synth.dispose();
        Object.assign(globalControls, newControls);
        this.synth = new Tone.PolySynth().connect(this.effectRack);
        this.synth.volume.value = globalControls.volumes.pad;
        this.params = this.generateRandomPadParams();
        this.setupSynthesizer();
        this.playConstantMinorChord();
    }

    adjustSynthParams() {
        // Add any specific adjustments you want for the pad
    }

    randomOscillatorType() {
        const oscillatorTypes = ["triangle", "sine", "sawtooth", "square"];
        return oscillatorTypes[Math.floor(Math.random() * oscillatorTypes.length)];
    }

    setupLFO() {
        this.lfo = new Tone.LFO({
            type: 'sine',
            frequency: 0.01,
            min: 400,
            max: 2000,
            phase: 180,
        }).start();

        this.lfo.connect(this.effectRack.frequency);
    }

    automateParameterChanges() {
        const automationTime = 60;

        Tone.Transport.scheduleRepeat((time) => {
            this.effectRack.frequency.setValueAtTime(400, Tone.now());
            this.effectRack.frequency.linearRampToValueAtTime(2000, Tone.now() + automationTime / 2);
            this.effectRack.frequency.linearRampToValueAtTime(400, Tone.now() + automationTime);
        }, automationTime);

        Tone.Transport.start();
    }

    randomizeParameter(min, max) {
        return Math.random() * (max - min) + min;
    }
}

const pad = new Pad(globalControls.volumes.pad, globalControls.globalKey);
window.pad = pad;
