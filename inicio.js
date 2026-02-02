document.addEventListener('DOMContentLoaded', () => {
    porcentajeReseinas ();
});

function porcentajeReseinas (){
    const divResenias = document.getElementById('porcentajeReseniasInicio');
    const datosResenias = JSON.parse(localStorage.getItem('mis_resenias')) || [];

    if(datosResenias.length === 0){
        if(divResenias) divResenias.innerHTML = `<p>No hay resenias</p>`;
        return;
    }

    let porcentajeComentario = '';

    let longitudResenias = datosResenias.length;
    let sumaEstrellas = datosResenias.reduce((total, resenias) => total + Number(resenias.estrellas), 0);
    let totalResenias = sumaEstrellas / longitudResenias;
    let porcentaje = Math.round(totalResenias);
    
    for(let i = 1; i <= 5; i++){
        if( i <= porcentaje){
            porcentajeComentario += `<i class="fa-solid fa-star" style="color: gold; font-size: 15px;"></i>`;

        }else{
            porcentajeComentario += '<i class="fa-regular fa-star" style="color: #2c2828a9; font-size: 15px;"></i>';
        }
    }

    divResenias.innerHTML += `${porcentajeComentario}`;

}