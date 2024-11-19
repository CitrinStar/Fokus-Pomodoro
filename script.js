const html = document.querySelector('html');
const tempoNaTela = document.querySelector('#timer');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const musicaFocoInput = document.querySelector('#alternar-musica');
const btplayImg = document.querySelector('.app__card-primary-butto-icon');


//botões
const botaoIniciar = document.querySelector('.app__card-primary-button');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const startPauseBtLabel = document.querySelector('#start-pause span');

//sons
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const startTemp = new Audio('/sons/play.wav');
const pauseTemp = new Audio('/sons/pause.mp3');
const finishTemp = new Audio('/sons/beep.mp3');

musica.loop = true;

//durações e contagens
const duracaoFoco = 1500; 
const duracaoDescansoCurto = 300; 
const duracaoDescansoLongo = 900; 

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play();
    }else {
        musica.pause();
    }
});

focoBt.addEventListener('click', () => {
    zerar();
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', () => {
    zerar();
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', () => {
    zerar();
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
});

function alterarContexto(contexto){
    mostrarTempo();
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);

    switch (contexto){
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta.</strong>
            `;
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `;
            break;
        default:
            break;
            
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        finishTemp.play();
        alert('Tempo alcançado');
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarPausar);

function iniciarPausar(){
    if(intervaloId){
        pauseTemp.play();
        zerar();
        return;
    }
    btplayImg.setAttribute('src', 'imagens/pause.png');
    startPauseBtLabel.textContent = 'Pausar';
    startTemp.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
}

function zerar(){
    btplayImg.setAttribute('src',' imagens/play_arrow.png');
    clearInterval(intervaloId);
    intervaloId = null;
    startPauseBtLabel.textContent = 'Começar';
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();