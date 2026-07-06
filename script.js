// 12 High-quality public domain sample sounds
const sounds = [
    { id: 'kick', name: '🥁 Kick Drum', url: 'https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg' },
    { id: 'snare', name: '💥 Snare Hit', url: 'https://actions.google.com/sounds/v1/impacts/crash_shatter.ogg' },
    { id: 'laser', name: '🔫 Laser Blast', url: 'https://actions.google.com/sounds/v1/science_fiction/alien_creature_glitch.ogg' },
    { id: 'synth', name: '🎹 Synth Chord', url: 'https://actions.google.com/sounds/v1/science_fiction/ambient_space_machine.ogg' },
    { id: 'chime', name: '✨ Magic Chime', url: 'https://actions.google.com/sounds/v1/cartoon/slide_whistle_up.ogg' },
    { id: 'bell', name: '🔔 Retro Bell', url: 'https://actions.google.com/sounds/v1/alarms/mechanical_clock_ring.ogg' },
    { id: 'zap', name: '⚡ Sci-Fi Zap', url: 'https://actions.google.com/sounds/v1/science_fiction/teleport.ogg' },
    { id: 'airhorn', name: '🚨 Alert Siren', url: 'https://actions.google.com/sounds/v1/alarms/bugle_tune.ogg' },
    { id: 'cheer', name: '🎉 Crowds Cheer', url: 'https://actions.google.com/sounds/v1/human/applause_clapping.ogg' },
    { id: 'boing', name: '🏈 Cartoon Spring', url: 'https://actions.google.com/sounds/v1/cartoon/boing_spring.ogg' },
    { id: 'retro', name: '👾 Arcade Game', url: 'https://actions.google.com/sounds/v1/science_fiction/retro_game_music.ogg' },
    { id: 'woosh', name: '💨 Deep Woosh', url: 'https://actions.google.com/sounds/v1/impacts/sub_bass_thud.ogg' }
];

const grid = document.getElementById('soundboardGrid');
const volumeSlider = document.getElementById('volumeSlider');
const volumeLabel = document.getElementById('volumeLabel');
const stopAllBtn = document.getElementById('stopAllBtn');

// Cache to keep track of actively playing Audio Objects
const activeAudioObjects = [];

// Initialize soundboard buttons
sounds.forEach(sound => {
    const button = document.createElement('button');
    button.className = 'group relative bg-slate-700 hover:bg-indigo-950 active:bg-indigo-900 border border-slate-600 hover:border-indigo-500 rounded-xl p-5 min-h-[100px] flex flex-col items-center justify-center transition-all duration-200 shadow-md hover:shadow-indigo-900/20 active:scale-95';
    
    button.innerHTML = `
        <span class="text-sm font-semibold tracking-wide text-slate-200 group-hover:text-indigo-300 pointer-events-none">${sound.name}</span>
        <span class="absolute bottom-2 right-2 text-[10px] font-mono text-slate-500 group-hover:text-indigo-400/70 uppercase tracking-widest pointer-events-none">${sound.id}</span>
    `;

    button.addEventListener('click', () => playSound(sound.url, button));
    grid.appendChild(button);
});

// Play audio handler
function playSound(url, buttonElement) {
    const audio = new Audio(url);
    audio.volume = volumeSlider.value;
    
    // Add glowing effect to the active pad button UI
    buttonElement.classList.add('ring-2', 'ring-indigo-500', 'bg-indigo-950/40');
    
    audio.play().catch(err => console.log("Audio playback interrupted/blocked:", err));
    activeAudioObjects.push(audio);

    // Remove from tracking list and reset UI highlights once this specific audio ends
    audio.onended = () => {
        buttonElement.classList.remove('ring-2', 'ring-indigo-500', 'bg-indigo-950/40');
        const index = activeAudioObjects.indexOf(audio);
        if (index > -1) activeAudioObjects.splice(index, 1);
    };
}

// Global Volume Change
volumeSlider.addEventListener('input', (e) => {
    const currentVol = e.target.value;
    volumeLabel.textContent = `${Math.round(currentVol * 100)}%`;
    
    // Adjust all currently playing sounds dynamically
    activeAudioObjects.forEach(audio => {
        audio.volume = currentVol;
    });
});

// Stop All Action
stopAllBtn.addEventListener('click', () => {
    activeAudioObjects.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
    
    // Wipe active items array cleanly
    activeAudioObjects.length = 0;

    // Reset UI active visual rings across all pads
    document.querySelectorAll('#soundboardGrid button').forEach(btn => {
        btn.classList.remove('ring-2', 'ring-indigo-500', 'bg-indigo-950/40');
    });
});