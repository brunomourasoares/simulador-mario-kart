const readline = require('readline-sync');

const players = [
    mario = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0
},
peach = {
    NOME: "Peach",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 4,
    PODER: 2,
    PONTOS: 0
},
yoshi = {
    NOME: "Yoshi",
    VELOCIDADE: 5,
    MANOBRABILIDADE: 2,
    PODER: 3,
    PONTOS: 0
},
bowser = {
    NOME: "Bowser",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0
},
luigi = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 3,
    PONTOS: 0
},
donkeyKong = {
    NOME: "Donkey Kong",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 3,
    PODER: 5,
    PONTOS: 0
}];


async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random();
    let result 
    switch (true) {
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
            break;
    }
    return result;
}

async function logRollResult(playerName, playerRoll, attributeName, attributeValue, totalAttribute) {
    console.log(`${playerName} tem ${attributeName} ${attributeValue}, rolou o 🎲 e caiu no número ${playerRoll}, o total é ${totalAttribute}`);
}

async function playRaceEngine(player1, player2, numRounds) {
    for(let round = 1; round <= numRounds; round++) {
        console.log(`🏁 Rodada ${round}`);

        let block = await getRandomBlock();
        console.log(`PISTA ESCOLHIDA: ${block}`);

        let player1Roll = await rollDice();
        let player2Roll = await rollDice();
        let totalPlayer1Skill = 0;
        let totalPlayer2Skill = 0;
        let powerResult1 = 0;
        let powerResult2 = 0;
        let hp1 = 100;
        let hp2 = 100;

        if (block === "RETA") {
            totalPlayer1Skill = player1Roll + player1.VELOCIDADE;
            totalPlayer2Skill = player2Roll + player2.VELOCIDADE;
            await logRollResult(player1.NOME, player1Roll, "VELOCIDADE", player1.VELOCIDADE ,totalPlayer1Skill);
            await logRollResult(player2.NOME, player2Roll, "VELOCIDADE", player2.VELOCIDADE ,totalPlayer2Skill);
        }
        if (block === "CURVA") {
            totalPlayer1Skill = player1Roll + player1.MANOBRABILIDADE;
            totalPlayer2Skill = player2Roll + player2.MANOBRABILIDADE;
            await logRollResult(player1.NOME, player1Roll, "MANOBRABILIDADE", player1.MANOBRABILIDADE, totalPlayer1Skill);
            await logRollResult(player2.NOME, player2Roll, "MANOBRABILIDADE", player2.MANOBRABILIDADE, totalPlayer2Skill);
        }
        if (block === "CONFRONTO") {
            powerResult1 = player1Roll + player1.PODER;
            await logRollResult(player1.NOME, player1Roll, "PODER", player1.PODER, powerResult1);
            powerResult2 = player2Roll + player2.PODER;
            await logRollResult(player2.NOME, player2Roll, "PODER", player2.PODER, powerResult2);

            while (hp1 > 0 && hp2 > 0) {
                let rollDice1 = await rollDice();
                hp2 -= rollDice1 * powerResult1;
                console.log(`🚗 ${player1.NOME} rolou o 🎲 e será multiplicado ${rollDice1}x o dano, 🚕 ${player2.NOME} sofreu um ataque com ${rollDice1 * powerResult1} de dano${rollDice1 > 4 ? ' critico' : ''}! ${player2.NOME} tem ${hp2 < 0 ? 0 : hp2} de vida!`);
                if (hp2 <= 0) break;
                    let rollDice2 = await rollDice();
                    hp1 -= rollDice2 * powerResult2;
                    console.log(`🚕 ${player2.NOME} rolou o 🎲 e será multiplicado ${rollDice2}x o dano, 🚗 ${player1.NOME} sofreu um ataque com ${rollDice2 * powerResult2} de dano${rollDice2 > 4 ? ' critico' : ''}! ${player1.NOME} tem ${hp1 < 0 ? 0 : hp1} de vida!`);
            }
        }

        if (block === "RETA" || block === "CURVA") {
            if (totalPlayer1Skill > totalPlayer2Skill) {
                player1.PONTOS++;
                console.log(`🏁 🚗 ${player1.NOME} venceu a rodada e marca 1 ponto!`);
            } else if (totalPlayer2Skill > totalPlayer1Skill) {
                player2.PONTOS++;
                console.log(`🏁 🚕 ${player2.NOME} venceu a rodada e marca 1 ponto!`);
            } else {
                console.log(`🏁 🚗 ${player1.NOME} e 🚕 ${player2.NOME} empataram na rodada!`);
            }
        } else {
            if (hp1 > hp2) {
                player2.PONTOS === 0 ? "" : player2.PONTOS--;
                console.log(`🏁 🚗 ${player1.NOME} venceu a rodada e tira 1 ponto de ${player2.NOME}!`);
            } else if (hp2 > hp1) {
                player1.PONTOS === 0 ? "" : player1.PONTOS--;
                console.log(`🏁 🚕 ${player2.NOME} venceu a rodada e tira 1 ponto de ${player1.NOME}!`);
            } else {
                console.log(`🏁 🚗 ${player1.NOME} e 🚕 ${player2.NOME} empataram na rodada!`);
            }
        }

        console.log(`🏁 Pontuação: ${player1.NOME} ${player1.PONTOS} x ${player2.PONTOS} ${player2.NOME}`);
        console.log("----------------------------------------");
    }
}

async function declareWinner(player1, player2) {
    if (player1.PONTOS > player2.PONTOS) {
        console.log(`🏁 🏆 ${player1.NOME} venceu a corrida! 🏆 🏁`);
    } else if (player2.PONTOS > player1.PONTOS) {
        console.log(`🏁 🏆 ${player2.NOME} venceu a corrida! 🏆 🏁`);
    } else {
        console.log(`🏁 🏆 A corrida terminou empatada! 🏆 🏁`);
    }
}

(async function main() {
    console.log("=========================================================================");
    console.log(`Escolhendo os jogadores... \n1- Mario: Velocidade 4, Manobrabilidade 3, Poder 3\n2- Peach: Velocidade 3, Manobrabilidade 4, Poder 2\n3- Yoshi: Velocidade 2, Manobrabilidade 4, Poder 3\n4- Bowser: Velocidade 5, Manobrabilidade 2, Poder 5\n5- Luigi: Velocidade 3, Manobrabilidade 4, Poder 4\n6- Donkey Kong: Velocidade 2, Manobrabilidade 2, Poder 5\n7- Aleatorio`);
    console.log("=========================================================================\n");

    let numRounds = readline.question("Quantas rodadas deseja jogar? ");
    while (numRounds < 1) {
        numRounds = readline.question("Quantidade de rodadas invalida!\nQuantas rodadas deseja jogar: ");
    }
    let p1 = readline.question("Escolha o numero do jogador 1: ");
    while (p1 > 7 || p1 < 1) {
        p1 = readline.question("Jogador nao existe!!\nEscolha o numero do jogador 1: ");
    }
    if (p1 == 7) {
        p1 = await rollDice();
    }
    let player1 = players[parseInt(p1) - 1];
    console.log(`🚗 Jogador 1 escolhido: ${player1.NOME}\n`);

    let p2 = readline.question("Escolha o numero do jogador 2: ");
    while (p2 > 7 || p2 < 1 || p2 == p1) {
        p2 = readline.question("Jogador nao existe ou ja escolhido como Jogador 1!!\nEscolha o numero do jogador 2: ");
    }
    if (p2 == 7) {
        p2 = await rollDice();
        while (p2 == p1) {
            p2 = await rollDice();
        }
    }
    let player2 = players[parseInt(p2) - 1];
    console.log(`🚕 Jogador 2 escolhido: ${player2.NOME} \n`);

    console.log(` 🏁 A Corrida entre ${player1.NOME} x ${player2.NOME} está começando... 🏁`);
    console.log("=========================================================================");
    await playRaceEngine(player1, player2, numRounds);
    await declareWinner(player1, player2);
})();