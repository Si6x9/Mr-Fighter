const firstscore = document.getElementById('firstscore')
const playerFirst = document.getElementById('playerfirst')
const secondscore = document.getElementById('secondscore')
const playerSecond = document.getElementById('playersecond')
const win = document.getElementById('win')
const reset = document.getElementById('reset')
const simulate = document.getElementById('simulate')



// Player class
class player {
    constructor(name, health, attackdamage) {
        this.name = name;
        this.health = health;
        this.attackdamage = attackdamage;
    }

    strike(player, enemy, attackdamage) {
        const hit = Math.floor((Math.random() * attackdamage));
        enemy.health -= hit;
        // console.log(player.name);
        // console.log(enemy.name);
        updategame(playerAdata, playerBdata, game.isover)
        return `${player.name} hit ${enemy.name} with ${hit} points`;
    }
    heal(player) {
        let heall = Math.floor(Math.random() * 5);
        player.health += heall;
        // console.log(player.name);
        // console.log(playerBdata.name);
        updategame(playerAdata, playerBdata, game.isover);
        return `${heall} heal`;
    }

}

// Game class
class Game {
    constructor() {
        this.isover = false;
    }
    checkIsOver() {
    }

    declearwinner(pa, pb, isover) {
        let message;

        if (isover == true && pa.health <= 0) {
            message = `${pb.name} WINS!`
        }
        else if (isover == true && pb.health <= 0) {
            message = `${pa.name} WINS!`
        }

        document.getElementById('victory').play();
        // console.log(game.isover);

        return message
    }
    reset(p1, p2) {

        game.isover = false;
        p1.health = 100;
        p2.health = 100;
        updategame(p1, p2, this.isover);
        win.innerText = ""

    }
    play() {
        this.reset(playerAdata, playerBdata);
        while (!this.isover) {
            playerA.strike(playerA, playerB, playerA.attackdamage)
            playerA.heal(playerA)
            playerB.strike(playerB, playerA, playerB.attackdamage)
            playerB.heal(playerB)
        }
        this.declearwinner(playerAdata,playerBdata,this.isover)
    }
}
simulate.onclick = () => game.play()
reset.onclick = () => game.reset(playerAdata, playerBdata)
// updategame
const updategame = (pa, pb, gamestate) => {

    playerFirst.innerText = pa.name;
    playerSecond.innerText = pb.name;
    firstscore.innerText = pa.health;
    secondscore.innerText = pb.health;

    if (pa.health <= 0 || pb.health <= 0) {
        gamestate = true;
        game.isover = gamestate;
        win.innerText = `${game.declearwinner(pa, pb, gamestate)}`;
        win.style.display = 'block';
        return gamestate;
    }
}


// Add players
let playerA = new player("piyush", 500, 15);
// console.log(playerA);
let playerB = new player("saurav", 500, 15)
// console.log(playerB);

// Copy players data
let playerAdata = playerA;
let playerBdata = playerB;



let game = new Game();
// console.log(game.isover);
let gamestate = game.isover;

updategame(playerAdata, playerBdata, gamestate)

//console.log(playerAdata.strike(playerAdata, playerBdata, playerAdata.attackdamage))
//console.log(playerA.heal(playerAdata)); 


// player 1
// Strike
document.addEventListener('keydown', (key) => {
    if (key.key == 'q' && playerBdata.health > 0 && game.isover == false) {
        playerA.strike(playerAdata, playerBdata, playerAdata.attackdamage);
        document.getElementById('pAattack').play()
    }
})
// heal
document.addEventListener('keydown', (key) => {
    if (key.key == 'a' && playerBdata.health > 0 && game.isover == false) {
        playerA.heal(playerAdata, playerBdata);
        document.getElementById('pBheal').play()
    }
})
// player2
// Strike
document.addEventListener('keydown', (key) => {
    if (key.key == 'p' && playerAdata.health > 0 && game.isover == false) {
        playerB.strike(playerBdata, playerAdata, playerBdata.attackdamage);
        // console.log(playerA.health);
        document.getElementById('pBattack').play()
    }
})
// heal
document.addEventListener('keydown', (key) => {
    if (key.key == 'l' && playerAdata.health > 0 && game.isover == false) {
        playerB.heal(playerBdata, playerAdata);
        document.getElementById('pAheal').play()
    }
})

// reset 

document.addEventListener('keyup', (key) => {
    
    if (key.key == ' ') {
        game.reset(playerAdata, playerBdata)
    }
})
