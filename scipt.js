document.addEventListener("DOMContentLoaded", function() {
    const descriptionContainer = document.getElementById("description-container");
    const toggleDescriptionButton = document.getElementById("toggle-description-button");

    toggleDescriptionButton.addEventListener("click", function() {
        if (descriptionContainer.style.display === "none") {
            descriptionContainer.style.display = "block";
            toggleDescriptionButton.textContent = "Beschreibung ausblenden";
        } else {
            descriptionContainer.style.display = "none";
            toggleDescriptionButton.textContent = "Beschreibung anzeigen";
        }
    });
});
async function predict() {
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    const prediction = await model.predict(posenetOutput);

    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }

    // Erkannte Posen mit Sounds verknüpfen
    if (pose) {
        if (prediction[0].className === 'highNote' && prediction[0].probability > 0.5) {
            playSound('highNote');
        } else if (prediction[1].className === 'middleNote' && prediction[1].probability > 0.5) {
            playSound('middleNote');
        } else if (prediction[2].className === 'lowNote' && prediction[2].probability > 0.5) {
            playSound('lowNote');
        }
    }

    // Posenerkennung zeichnen
    drawPose(pose);
}
