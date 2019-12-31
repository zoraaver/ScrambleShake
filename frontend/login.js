
document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.querySelector("#submit-user");
    
    startButton.addEventListener('click', startGame);
    
    function startGame(e) {
        e.preventDefault();
        const form = document.querySelector("#sign-in-form");
        form.classList.add("hidden");
        startButton.classList.add("hidden");
        const gamePage = document.querySelector("#game-page");
        gamePage.classList.remove("hidden");
    }
})
