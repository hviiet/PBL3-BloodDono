const nextButton = document.getElementById('Next');
const backButton = document.getElementById('Back');
const container = document.getElementById('container');

nextButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

backButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});
