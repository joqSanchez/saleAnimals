import { accesoriosMascotas } from "./jsonAccesorios.js";

document.addEventListener('DOMContentLoaded', () =>{

    if(document.querySelector('.containerAccesorios')){
        mostradorDataAccesorios();
    }


})
const containerAccesorios = document.querySelector('.containerAccesorios');

function mostradorDataAccesorios () {
    
    containerAccesorios.innerHTML = '';

    accesoriosMascotas.forEach(accesorios => {    
        const cardAccesorios = document.createElement('div');
        cardAccesorios.classList.add('card-accesorios');

        cardAccesorios.innerHTML = `
            <div class="div_accesorios">
                <img src="${accesorios.image}" draggable="false" alt="${accesorios.name}" style="mix-blend-mode: multiply; padding: 10px; width: 200px; display: block; margin-left: auto; margin-right: auto;">
            </div>
            <div class="card-information">
                <div style="box-shadow: 1px 2px 3px 2px #4323; background-color: rgb(252, 242, 236); border-radius: 12px; padding: 5px;">
                    <p style="font-weight: bolder;"> ${accesorios.name} <span style="font-weight: bolder;">$${accesorios.precio}</span> </p>    
                </div>

                <div style="box-shadow: 1px 2px 3px 2px #4323; margin-top: 14px; background-color: rgb(252, 242, 236); padding: 1px; border-radius: 10px;">
                    <p style="font-weight: bolder; text-align: center; padding: 10px; color: #414040f5;">Category</p>
                    <p style="font-weight: bold; text-align: center;">${accesorios.categoria}</p>
                </div>

                <div style="box-shadow: 1px 2px 3px 2px #4323; border-radius: 12px; background-color: rgb(252, 242, 236); padding: 2px; margin-top: 20px;">
                    <p style="text-align: center; font-weight: bolder; padding: 10px; color: #414040f5;">Descripcion:</p>
                    <p style="font-weight: bold; text-align: center;">${accesorios.descripcion}</p>     
                </div>
            </div>    
            


        `;

        containerAccesorios.append(cardAccesorios);
    })
}