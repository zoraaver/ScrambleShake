// grabbing user inputs and update the db

let player1 = false;
let player2 = false;
document.addEventListener("DOMContentLoaded", (e) => {
    let formOne = document.querySelector('#user1-form');
    let formTwo = document.querySelector('#user2-form');

    let readyOne = formOne.querySelector('#user1ready');
    let readyTwo = formTwo.querySelector('#user2ready');

    let user1Name = formOne.querySelector('#user1name');
    let user1Email = formOne.querySelector('#user1email');

    let user2Name = formTwo.querySelector('#user2name');
    let user2Email = formTwo.querySelector('#user2email');

    readyOne.addEventListener('click', (e)=>{
        e.preventDefault();
        configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: user1Name.value,
                email: user1Email.value
            })
        };
        fetch('http://localhost:3000/users', configObj)
        .then(response => response.json())
        .then(obj => {
            player1 = obj;
            if (player1 && player2) {
                const game = document.querySelector('#submit-user');
                game.classList.remove('hidden');
            };
        })
    });

    readyTwo.addEventListener('click', (e)=>{
        e.preventDefault();
        configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: user2Name.value,
                email: user2Email.value
            })
        };
        fetch('http://localhost:3000/users', configObj)
        .then(response => response.json())
        .then(obj => {
            player2 = obj;
            if (player1 && player2) {
                const game = document.querySelector('#submit-user');
                game.classList.remove('hidden');
            };
        });


    });



})