//Capturar los elementos del dom
const contenidor = document.querySelector('.contenidor');
const seients = document.querySelectorAll('.fila .seient:not(.ocupat)');
const contador = document.getElementById('contador');
const total = document.getElementById('total');
const peliculaSelect = document.getElementById('pelicula');

//Precio de la pelicula selecionada.
let preuDelTicket = +peliculaSelect.value;

//llenamos interficie usuario
ompleUI();

/*Funciones*/
function actualitzaSeleccioSeients(){
    
    const seientsSeleccionats = document.querySelectorAll('.fila .seient.seientsSeleccionats');
    
    /* const seientsIndex = [...seientsSeleccionats.map(function(seient){
        return [...seients].indexOf(seient);
    })]; */

    const seientsIndex = [...seientsSeleccionats.entries((seient) => [...seients].indexOf(seient))];
    
    localStorage.setItem('seientsSeleccionats', JSON.stringify(seientsIndex));
    
    const contadorSeientsSeleccionats = seientsSeleccionats.length;

    contador.innerText = contadorSeientsSeleccionats;

    total.innerText = contadorSeientsSeleccionats * preuDelTicket;

    
}

function ompleUI(){
    const seientsSeleccionats = JSON.parse(localStorage.getItem('seientsSeleccionats'));
    
    if (seients !== null && seientsSeleccionats.length > 0){
        seients.forEach((seient, index) => {
            if(seientsSeleccionats.indexOf(index) > -1){
                seient.classList.add('seleccionat');
            }
        })
    }

    const indexPeliculaSeleccionada = localStorage.getItem('indexPeliculaSeleccionada');
    if (indexPeliculaSeleccionada !== null) {
        peliculaSelect.selectedIndex = indexPeliculaSeleccionada;
    }
    const preuPeliculaSeleccionada = localStorage.getItem('preuPeliculaSeleccionada');
    if(preuPeliculaSeleccionada !== null) {
        preuDelTicket = +preuPeliculaSeleccionada;
    }

    
}

/* Eventos */

contenidor.addEventListener('click', (e) => {

    if (e.target.classList.contains('seient') && !e.target.classList.contains('ocupat')) {
    
        e.target.classList.toggle('seleccionat');
    
        actualitzaSeleccioSeients();
    }


});

peliculaSelect.addEventListener('change', (e) => {
    preuDelTicket = +e.target.value;

    localStorage.setItem('indexPeliculaSeleccionada', e.target.selectedIndex);
    localStorage.setItem('preuPeliculaSeleccionada', e.target.value);

    actualitzaSeleccioSeients();
})

actualitzaSeleccioSeients();

