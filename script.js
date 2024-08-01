//Dados inicias
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: '',
};

let player = '';
let warning = '';
let playing = false;

reset();

//Eventos

//evento para limpar o quadro
document.querySelector('.reset').addEventListener('click', reset);
//evento para percorrer todos os itens com a mesma classe
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});

//funções

//função de click no quadro
function itemClick(event) {
    //função para saber onde o usuário clicou no quadro
    let item = event.target.getAttribute('data-item');
    if(playing && square[item] === '') {
        //função para mostrar no quadro quem marcou e onde marcou
        square[item] = player;
        renderSquare();
        //funçao para trocar de jogador
        togglePlayer();
    }

}

//função que vai limpasr o quadro
function reset() {
    warning = '';

    //função que vai gerear um numero aleatório
    let random = Math.floor(Math.random() * 2);

    //definindo quem vai jogar
    player = (random === 0) ? 'x' : 'o';
    //ou
    /*if(random === 0) {
        player = 'x';
    }else{
        player = 'o';
    }*/

    //função para limpar o quadro do jogo
    for (let i in square) {
        square[i] = '';
    }
    //player = true;
    playing = true;

    renderSquare();
    renderInfo();
}

//função que vai verificar se está escrito algo nos campos ou não
function renderSquare() {
    for(let i in square) {
        //função para pegar o item especifico
        let item = document.querySelector(`div[data-item=${i}]`);
        //se tiver algo escrito ele completa caso não ele escreve vazio
        item.innerHTML = square[i];        
    }
    //função para verificar se alguém ganhou
    checkGame();
}

//função que vai pegar as informações nos campos
function renderInfo() {
    //função que vai mostrar de quem é a vez
    document.querySelector('.vez').innerHTML = player;
    //função para mostrar quem ganhou
    document.querySelector('.resultado').innerHTML = warning;
}

function togglePlayer() {
    player = (player === 'x') ? 'o' : 'x';
    //funç~]ao para mostrar na tela
    renderInfo();
}

function checkGame() {
    if(checkwinnerFor('x')) {
        warning = 'O "x" venceu';
        playing = false;
    }else if(checkwinnerFor('o')) {
        warning = 'O "o" venceu';
        playing = false;
    }else if(isFull()) {
        warning = 'Deu empate';
        playing = false;
    }
}
//função que vai verificar como foi o vencedor
function checkwinnerFor(player) {
    //variavél de possibilidade e ganhar
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    //loop para ver quais as posições prenchidas
    for(let w in pos) {
        let pArray = pos[w].split(',');
        //verificar se a possibilidade está marcada com o jogador
        let hasWon = pArray.every(option => square[option] === player);
        if(hasWon) {
            return true;
        }
    }
    return false;
}
/* ou assim:
pArray.every((option) => {
            if(square[option] === player) {
                return true;
            }else{
                return false;
            }
        });
*/

//função para verificar o impate
function isFull() {
    for(let i in square) {
        if(square[i] === '') {
            return false;
        }
    }
    return true;
}