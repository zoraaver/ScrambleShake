// user_1 score display board
document.addEventListener("DOMContentLoaded", () => {
    let deck1 = document.querySelector("#deck-column1");

    let table1 = document.createElement('table');
    table1.classList.add('page-font', 'table1');
    table1.id = 'user1-board';

    let tr = document.createElement('tr');
    tr.classList.add('page-font', 'tr1');

    let th1 = document.createElement('th');
    let th2 = document.createElement('th');

    th1.classList.add('page-font', 'th');
    th1.innerText = 'user-1-name: ';
    th2.classList.add('page-font', 'th');
    th2.innerText = '        points';

    tr.append(th1, th2);
    table1.appendChild(tr); 


    let stat1btn = document.createElement('button'); 
    stat1btn.classList.add('page-font', 'stat1btn');
    stat1btn.innerText = 'Your Stats';
    stat1btn.type = 'submit'; 


    deck1.append(table1, stat1btn); 

    // user_2 score display board
    let deck2 = document.querySelector("#deck-column2");

    let table2 = document.createElement('table');
    table2.classList.add('page-font', 'table2');
    table2.id = 'user2-board';

    let tr2 = document.createElement('tr');
    tr2.classList.add('page-font', 'tr2');

    let thX = document.createElement('th');
    let thY = document.createElement('th');

    thX.classList.add('page-font', 'th');
    thX.innerText = 'user-2-name: ';
    thY.classList.add('page-font', 'th');
    thY.innerText = '        points';

    tr2.append(thX, thY);
    table2.appendChild(tr2); 


    let stat2btn = document.createElement('button'); 
    stat2btn.classList.add('page-font', 'stat2btn');
    stat2btn.innerText = 'Your Stats';
    stat2btn.type = 'submit'; 


    deck2.append(table2, stat2btn); 
})