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
    console.log(paraula);
    showParaula.innerText = "";
    for (let i = 0; i < paraula.length; i++) {
        showParaula.innerText += '-' ;
    }
    paraulaAmagada = showParaula.innerText;
    
}

//Using split [...] we creat an iterable array to change the characters
//then using char at we find if the character is in the word if it is we swap it.
function adivinarLletra(e) {
    let counter = 0;
    charArray = [...paraulaAmagada];
    console.log(paraulaAmagada);
    for (let i = 0; i < charArray.length; i++) {
        if (paraula.charAt(i) === e) {
            charArray[i] = e
            console.log(charArray);
            counter++;
        }
    }
    //once finished we update paraula amagada with the new string and update it to the player.    
    paraulaAmagada = charArray.join("");
    showParaula.innerText = paraulaAmagada;
    return counter;
}
function startGame(){
    prepararParaula();
    let errors = 0;
    contador.innerText = '7';
    contenidor.addEventListener('click', (e) => {
        if (e.target.classList.contains('lletra')) {
            
            if(adivinarLletra(e.target.innerText)>0){
                e.target.classList.toggle('correct');
            }else{
                e.target.classList.toggle('error');
                contador.innerText = (7-errors);
                error.innerText = errors;
            }
        }
    });
}
startGame();







/* function replaceChar (str,e) {
    str = [...str];
    let i
  
    for (i = 0; i < str.length; i++) {
      if (str[i] == '-') {
        str[i] = e
      }
    }
    return str.join('');
  }
  console.log(replaceChar('foo-bar-baz','t')); */


