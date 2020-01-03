// user_1 score display board
let deck1 = document.querySelector("#deck-column1");

let table1 = document.createElement('table');
table1.classList.add('page-font', 'table1');
table1.id = 'user1-board';

let tr = document.createElement('tr');
tr.classList.add('page-fond', 'tr1');

let th1 = document.createElement('th');
let th2 = document.createElement('th');

th1.classList.add('page-font', 'th');
th1.id = 'player1-name';
th1.innerText = `Player_1:`;
th2.classList.add('page-font', 'th');
th2.id = 'player2-points';
th2.innerText = '        points';

tr.append(th1, th2);
table1.appendChild(tr); 


let stat1btn = document.createElement('button'); 
stat1btn.classList.add('page-font', 'stat1btn');
stat1btn.innerText = 'Your Stats';
stat1btn.type = 'submit'; 

deck1.append(table1, stat1btn); 

stat1btn.addEventListener ('click', (e) =>{
    e.preventDefault(); 
    let el = document.querySelector('#player1Stats');
    
    if (el){
        if (el.classList.value === 'hidden'){
            el.classList.remove('hidden')
        } else {
            el.classList.add('hidden');
        }
    } else {
        deck1.append(showStats(player1)); 
        let el = document.querySelector('#playerStats');
        el.id = 'player1Stats';
        el.classList.remove('hidden'); 
    }

})

// // user show of stats
function showStats(player){
    let div = document.createElement('div');
    div.id = 'playerStats'; 
    div.classList.add('hidden');

    let gameCount = player.user_games.length;

    let totalGame = document.createElement('h3');
    totalGame.innerText = `${player.name} has played ${gameCount} games.`;
    totalGame.classList.add ('page-font');

    let getSum = (memo, current) => memo + current; 
    let scoreAry = ()=>{
        return player.user_games.map (game => {
            return game.score;
        })
    };

    let totalScore = document.createElement('h3'); 
    totalScore.innerText = `You've scored ${scoreAry().reduce(getSum, 0)} points.`;
    totalScore.classList.add ('page-font'); 

    div.append(totalGame, totalScore);
    return div; 
}

// user_2 score display board
let deck2 = document.querySelector("#deck-column2");

let table2 = document.createElement('table');
table2.classList.add('page-font', 'table2');
table2.id = 'user2-board';

let tr2 = document.createElement('tr');
tr2.classList.add('page-fond', 'tr2');

let thX = document.createElement('th');
let thY = document.createElement('th');

thX.classList.add('page-font', 'th');
thX.id = 'player2-name';
thX.innerText = `Play_2:`;
thY.classList.add('page-font', 'th');
thY.id = 'player2-points';
thY.innerText = '        points';

tr2.append(thX, thY);
table2.appendChild(tr2); 


let stat2btn = document.createElement('button'); 
stat2btn.classList.add('page-font', 'stat2btn');
stat2btn.innerText = 'Your Stats';
stat2btn.type = 'submit'; 


deck2.append(table2, stat2btn); 

stat2btn.addEventListener ('click', (e) =>{
    e.preventDefault(); 
    let el = document.querySelector('#player2Stats');
    
    if (el){
        if (el.classList.value === 'hidden'){
            el.classList.remove('hidden')
        } else {
            el.classList.add('hidden');
        }
    } else {
        deck2.append(showStats(player2)); 
        let el = document.querySelector('#playerStats');
        el.id = 'player2Stats';
        el.classList.remove('hidden'); 
    }
})
