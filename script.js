// 12 High-quality, stable public domain audio links
const sounds = [
    { id: 'kick', name: '🥁 Kick Drum', url: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Bass_Drum_2.mp3' },
    { id: 'snare', name: '💥 Snare Hit', url: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Snare_Drum_1.mp3' },
    { id: 'laser', name: '🔫 Laser Blast', url: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Synth_Laser_Zap.mp3' },
    { id: 'synth', name: '🎹 Synth Chord', url: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/G_major_chord_synth.mp3' },
    { id: 'chime', name: '✨ Magic Chime', url: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Windchimes_short.mp3' },
    { id: 'bell', name: '🔔 Retro Bell', url: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Desk_bell_ring.mp3' },
    { id: 'zap', name: '⚡ Sci-Fi Zap', url: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Electronic_chirp.mp3' },
    { id: 'airhorn', name: '🚨 Alert Siren', url: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Sirens_Air_Raid.mp3' },
    { id: 'cheer', name: '🎉 Crowds Cheer', url: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Small_crowd_cheering_and_clapping.mp3' },
    { id: 'boing', name: '🏈 Cartoon Spring', url: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Spring_boing.mp3' },
    { id: 'retro', name: '👾 Arcade Game', url: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/8-bit_laser.mp3' },
    { id: 'woosh', name: '💨 Deep Woosh', url: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Swoosh_transition.mp3' }
];

const grid = document.getElementById('soundboardGrid');
const volumeSlider = document.getElementById('volumeSlider');
const volumeLabel = document.getElementById('volumeLabel');
const stopAllBtn = document.getElementById('stopAllBtn');

// Track actively playing audio elements globally
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
    
    // UI active states
    buttonElement.classList.add('ring-2', 'ring-indigo-500', 'bg-indigo-950/40');
    
    audio.play().catch(err => console.error("Audio block/CORS issue:", err));
    activeAudioObjects.push(audio);

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
    activeAudioObjects.length = 0;

    document.querySelectorAll('#soundboardGrid button').forEach(btn => {
        btn.classList.remove('ring-2', 'ring-indigo-500', 'bg-indigo-950/40');
    });
});
