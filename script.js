//Capturar los elementos del dom
const contenidor = document.querySelector('.contenidor');
const contador = document.getElementById('contador');
const error = document.getElementById('errors');
const total = document.getElementById('total');
const time = document.getElementById('time');
const showParaula = document.querySelector('.paraula');

let temaProva = ['test','trial','you','reddit'];
let random = Math.random()*(temaProva.length-1);
let paraula = temaProva[random.toFixed()].toUpperCase(); 

let paraulaAmagada = "";
function prepararParaula() {
    showParaula.innerText = "";
    for (let i = 0; i < paraula.length; i++) {
        showParaula.innerText += '-' ;
    }
    paraulaAmagada = showParaula.innerText;
    
}

function adivinarLletra(e) {
    
    for (let i = 0; i < paraulaAmagada.length; i++) {
        if (paraula.charAt(i) == e) {
            console.log(e);
            paraulaAmagada.charAt(i) = e;
            
        }
    }
    console.log(paraulaAmagada);
    showParaula.innerText = paraulaAmagada;

}

contenidor.addEventListener('click', (e) => {
    
});
prepararParaula();
adivinarLletra('T');




