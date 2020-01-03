// grabbing user inputs and update the db

let player1 = false;
let player2 = false;
document.addEventListener("DOMContentLoaded", (e) => {
    let gameRule = document.querySelector('#ScrambleShake-rules');
    let formOne = document.querySelector('#user1-form');
    let formTwo = document.querySelector('#user2-form');

    let readyOne = formOne.querySelector('#user1ready');
    let readyTwo = formTwo.querySelector('#user2ready');

    let user1Name = formOne.querySelector('#user1name');
    let user1Email = formOne.querySelector('#user1email');

    let user2Name = formTwo.querySelector('#user2name');
    let user2Email = formTwo.querySelector('#user2email');

    function validateForm(name, email){
        let userName = name.value;
        let userEmail = email.value; 

        if (userName == null || userName == '', userEmail == null || userName == ''){
            alert('Please Fill in Player Information');
            return false;
        } else {
            return userName, userEmail; 
        }
    };

    function validateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value)){
            return true
        } else {
            alert("You have entered an invalid email address!")
            return false
        }
    }


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

        if (validateForm(user1Name, user1Email)){
            if (validateEmail(user1Email)){
                fetch('http://localhost:3000/users', configObj)
                .then(response => response.json())
                .then(obj => {
                    player1 = obj;
                    if (player1 && player2) {
                        const game = document.querySelector('#submit-user');
                        game.classList.remove('hidden');
                        gameRule.classList.add('hidden');
                    };
                    readyOne.disabled = true;
                    user1Email.readOnly = true;
                    user1Name.readOnly = true; 
                })
            } 
        }
       
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

        if (validateForm (user2Name, user2Email)){
            if (validateEmail (user2Email)){
                fetch('http://localhost:3000/users', configObj)
                .then(response => response.json())
                .then(obj => {
                    player2 = obj;
                    if (player1 && player2) {
                        const game = document.querySelector('#submit-user');
                        game.classList.remove('hidden');
                        gameRule.classList.add('hidden');
                    };
                    readyTwo.disabled = true; 
                    user2Email.readOnly = true;
                    user2Name.readOnly = true; 
                });
            }
        }     
    });
});