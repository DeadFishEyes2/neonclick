//reset
const resetButton = document.getElementById("resetButton");

resetButton.addEventListener('click', () =>{
    localStorage.clear();
    loadGame();
    location.reload();
})

document.addEventListener('buildingChanged', displayProgressBar);

//cheat
const cheatButton = document.getElementById("cheatButton");

cheatButton.addEventListener('click', () => {
    numPoints *= 100;
    points.innerHTML = convert(numPoints) + " $";
})

//toggle audio
const toggleAudio = document.getElementById("toggleAudio");

toggleAudio.addEventListener('click', () => {
    if (audio.volume == 0){
        audio.volume = 1;
        audioPop.volume = 1;
        audioError.volume = 1;
    } else {
        audio.volume = 0;
        audioPop.volume = 0;
        audioError.volume = 0;
    }
})


    