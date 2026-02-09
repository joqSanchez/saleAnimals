
let ultima = -1; //-1 representa vacio

document.addEventListener("DOMContentLoaded", () => {

    const estrellas = document.querySelectorAll('.estrellas');

    if(!estrellas.length) return;

    // index respresenta la primera estrella a la que se le hizo click
    estrellas.forEach((estrellaSeleccionada, index) => { 
        estrellaSeleccionada.addEventListener('change', () => {

            //  si index es <= a i entonces que se seleccionen las que esten abajo del nivel de index
            if(ultima == index ){
                estrellas.forEach(e => e.checked = false);
                ultima = -1;
            }else{
                // I representa cada una de las estrellas mientras el codigo va revisando una por una para pintarlas
                estrellas.forEach((e, i) => { e.checked = i <= index})
                ultima = index;
            };
            /* automaticamente Desmarca las que son mayores a index */

        });

    });

    // 1. Activamos el escuchador del select
    fechaEstadoComentario(); 
    // 2. Ejecutamos el filtro una vez para que ordene al cargar según el select
    aplicarOrdenActual();

    // 3. Mostramos el  porcentaje de reseñas en estrellas
    porcetajeDeResenias();

});

// FUNCION QUE MUESTRA EL PORCENTAJE DE RESENIAS DENTRO DE LA PAGINA COMENTARIOS
function porcetajeDeResenias() {
    // 1. Declaramos ambos contenedores (el de la página de comentarios y el del inicio)
    const contenedorPrincipal = document.getElementById('porcentajeResenias');
    
    // 2. Obtenemos las reseñas
    let resenias = JSON.parse(localStorage.getItem('mis_resenias')) || [];

    // 3. Manejo si no hay reseñas
    if (resenias.length === 0) {
        if (contenedorPrincipal) {
            contenedorPrincipal.innerHTML = `
                <h2 class="tittle_Comentario">Comentarios</h2>
                <p>NO HAY RESEÑAS AÚN</p>
            `;
        }
        return;
    }

    // 4. Cálculos
    let sumaComentarios = resenias.length;
    let sumaEstrellas = resenias.reduce((total, r) => total + Number(r.estrellas), 0);
    let promedioReal = sumaEstrellas / resenias.length;
    let estrellasParaDibujar = Math.round(promedioReal);

    // 5. Generar iconos de estrellas
    let iconosEstrellas = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= estrellasParaDibujar) {
            iconosEstrellas += `<i class="fa-solid fa-star" style="color: gold; font-size: 15px;"></i>`;
        } else {
            iconosEstrellas += '<i class="fa-regular fa-star" style="color: #2c2828a9; font-size: 15px;"></i>';
        }
    }

    // 6. RENDERIZADO

    // A. Si estamos en la página de COMENTARIOS (Header)
    if (contenedorPrincipal) {
        let textoComentario = `<p style="color: #f79f1a;">${promedioReal.toFixed(1)}</p> <p>(${sumaComentarios} reseñas)</p>`;
        
        // Incluimos el H2 directamente en el string para que no se pierda
        contenedorPrincipal.innerHTML = `
            <h2 class="tittle_Comentario">Comentarios</h2>
            ${iconosEstrellas} ${textoComentario}
            
        `;
    }


}

// Esta funcion recibe el comentario del usuario y lo guarda
function recibirComentario( ){
    const comentario = document.querySelector('.escritura_comentario');
    const comentarioUser = comentario.value;

    if(!comentarioUser.trim()) { 
        console.log("No hay texto");
        return;
    }

    if(ultima === -1){
        alert("Porfavor seleccione una calificacion")
        return;
    }

    // Se envia la reseña a la funcionque la guarda
    recibirResenia(ultima, comentarioUser.trim());
    
    // Limpiamos el texto
    comentario.value = "";

    // Reseteamos las estrellas
    aplicarOrdenActual(); 
}

// Esta funcion guarda la reseña en el localStorage
function recibirResenia(ultima,comentarioUser) {
    // Para que la estrella sea 1-5 en lugar de 0-4 al estarle sumando 1 a cada una desde el 0(que es la posicion de la primera estrellas])
    const cantidadEstrellas = ultima + 1;

    // hacer esta clase de prototipos como ejemplos let diaActual = '20'; // Valor fijo para prototipo

    let dataFecha = new Date();
    let diaActual = dataFecha.getDate();
    // Obtener el nombre del mes en texto
    let mesTexto = dataFecha.toLocaleString('es-ES', { month: 'long' });

    const resenias = JSON.parse(localStorage.getItem('mis_resenias')) || [];

    // Crear el objeto de la nueva reseña
    const nuevasResenias = {
        comentario: comentarioUser,
        estrellas: cantidadEstrellas,
        dia: diaActual,
        mes: mesTexto,
        fechaFull: dataFecha.getTime()
    };

    // Agregar la nueva reseña al array
    resenias.push(nuevasResenias);

    localStorage.setItem('mis_resenias',JSON.stringify(resenias));

}

// Esta funcion aplica el orden segun el select actual
function aplicarOrdenActual() {
    const selector = document.getElementById('fechaEstadoComentario');
    const datosAlmacenados = JSON.parse(localStorage.getItem('mis_resenias')) || [];
    
    // Ordenamos según lo que diga el SELECT en ese momento
    if (selector.value === 'masAntiguos') {
        datosAlmacenados.sort((a, b) => a.fechaFull - b.fechaFull);
    } else {
        // Por defecto 'masReciente': el tiempo más grande (b) va primero
        datosAlmacenados.sort((a, b) => b.fechaFull - a.fechaFull);
    }

    // Le pasamos la lista ya ordenada al pintor
    renderzarDatos(datosAlmacenados);
}

// Funcion escuchadora del select de estados de comentarios
function fechaEstadoComentario() {
    // Escucha el select de estados de comentarios, y aplica el orden cuando cambie
    let seleccionTiempoComents = document.getElementById('fechaEstadoComentario');
    seleccionTiempoComents.addEventListener('change', () => {
        aplicarOrdenActual();
    });
}

// Esta funcion dibuja las reseñas en el HTML
function renderzarDatos(datos = null) {
    const lista = document.querySelector(".container_mostrar_comentarios");
    
    // Si no se pasan datos, toma los del localStorage
    const datosAMostrar = datos || JSON.parse(localStorage.getItem('mis_resenias')) || [];

    lista.innerHTML = ""; // Limpia para no duplicar

    /* Recorre el array de reseñas para mostrar los datos en pantalla */
    datosAMostrar.forEach(resenia => {
        let iconosEstrellas = '';
        // Genera las estrellas según la cantidad de estrellas de la reseña
        for(let i = 0; i < resenia.estrellas; i++){
            iconosEstrellas += '<i class="fa-solid fa-star" style="color: gold; font-size: 15px;"></i>';
        }

        // crea un contenedor por cada reseña
        let contenedor = document.createElement('div');
        contenedor.className = 'contenedorComentarios';
        
        // inserta en el HTML los datos de la reseña
        contenedor.innerHTML = `
            <div class="estrellasCantidadPublic">${iconosEstrellas}
                <p class="fechaPublic">El ${resenia.dia} dia de ${resenia.mes}</p>
            </div>
            <p class="comentarioPublic">${resenia.comentario}</p>
        `;
        lista.append(contenedor); // Importante: .append respeta el orden del array
    });
}