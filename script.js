//Capturar los elementos del dom
const contenidor = document.querySelector('.contenidor');
const contador = document.getElementById('contador');
const error = document.getElementById('errors');
const total = document.getElementById('total');
const retry = document.getElementById('retry')
const time = document.getElementById('time');
const status = document.getElementById('status');
const palabra = document.getElementById('palabra');
const showParaula = document.querySelector('.paraula');

let temaProva = ['test','trial','you','reddit'];
let random = Math.random()*(temaProva.length-1);
let paraula = temaProva[random.toFixed()].toUpperCase(); 
let paraulaAmagada = "";

//Cronometro
let elCrono;
let elCountdown
let mifecha = new Date;
let laHora = document.getElementById("time");
let laHora2 = document.getElementById("time2");
let countdown_seconds = new Date;
let countdown = document.querySelector("countdown");


//inicializa el tiempo del cronometro
mifecha.setHours(0,0,0,0);
countdown_seconds.setHours(0,0,11,0);

//inicializa el texto de laHora
laHora.innerHTML = "00:00:00";

//Main interval
function cooldown() {
    let segundos = countdown_seconds.getSeconds();
    segundos -= 1;
    countdown_seconds.setSeconds(segundos);
    console.log(segundos);
    countdown.innerHTML = ""+segundos;
    return segundos;
}
function reiniciarCooldown(){
    countdown_seconds.setHours(0,0,10,0);
}
function startCooldown(){
    elCountdown = setInterval(cooldown, 1000);
}
function stopCooldown(){
    clearInterval(elCountdown);
}
function crono(){

    let horas = mifecha.getHours();
    let minutos = mifecha.getMinutes();
    let segundos = mifecha.getSeconds();

    segundos += 1;

    if(segundos == 60){
        segundos = 0;
        minutos += 1;
        
        mifecha.setMinutes(minutos);
    }

    mifecha.setSeconds(segundos);

    if (horas < 10) {horas = "0" + horas;}
    if (minutos < 10) {minutos = "0" + minutos;}
    if (segundos < 10) {segundos = "0" + segundos;}

    laHora.innerHTML = horas + ":" + minutos + ":" + segundos;


}
function reiniciarCrono(){
    mifecha.setHours(0,0,10,0);

//inicializa el texto de laHora
    laHora.innerHTML = "00:00:00";
}
function start(){
    elCrono = setInterval(crono, 1000);
}
function stop(){
    clearInterval(elCrono);
}
function reset(){
    setTimeout(reiniciarCrono,0)
}
function prepararParaula() {
    console.log(paraula);
    showParaula.innerText = "";
    for (let i = 0; i < paraula.length; i++) {
        showParaula.innerText += '-' ;
    }
    paraulaAmagada = showParaula.innerText;
    start()
    startCooldown();    
}
//Using split [...] we creat an iterable array to change the characters
//then using char at we find if the character is in the word if it is we swap it.
function adivinarLletra(e) {
    let counter = 0;
    charArray = [...paraulaAmagada];
    console.log(paraulaAmagada);
    for (let i = 0; i < charArray.length; i++) {
        if (paraula.charAt(i) === e) {
            charArray[i] = e;
            console.log(charArray);
            counter++;
        }
    }
    //once finished we update paraula amagada with the new string and update it to the player.    
    paraulaAmagada = charArray.join("");
    showParaula.innerText = paraulaAmagada;
    return counter;
}
function endGame(final,error){
    stop();
    document.getElementById('status').innerText = final;
    document.getElementById('palabra').innerText = "The word was: " + paraula;
    document.getElementById('errores').innerText = "You had " + error + " mistakes";
    const envoltorio = document.getElementsByClassName('envoltorio-popup');
    laHora2.innerText = laHora.innerText;
    contenidor.style.display = 'none';
    envoltorio[0].style.display = 'block';
}
function startGame(){
    prepararParaula();
    let errors = 0;
    contador.innerText = '7';
    contenidor.addEventListener('click', (e) => {
        if (e.target.classList.contains('lletra')) {
            if(paraulaAmagada != paraula && errors != 7) {              
                if(adivinarLletra(e.target.innerText)>0){
                    e.target.classList.toggle('correct');
                    reiniciarCooldown();
                }else{
                    e.target.classList.toggle('error');
                    errors++;
                    contador.innerText = (7-errors);
                    error.innerText = errors;
                    reiniciarCooldown();
                }
                if(paraulaAmagada === paraula){
                    endGame("You win" , errors);
                    stopCooldown();                 
                }else if(errors === 7){
                    endGame('You lost.',errors);
                    stopCooldown();
                }
            }
        }
    });
    while (countdown_seconds.getSeconds > 0) {
        console.log("test");
    }
   
}
startGame();
retry.addEventListener('click',(e)=>{
    startGame();
});


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


