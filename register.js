// 1. Cambiamos el nombre de la función a 'guardarEnStorage' para evitar conflictos
function guardarEnStorage(name, email, password) {
    const sendData = JSON.parse(localStorage.getItem('data-user')) || [];
    
    const nuevoUsuario = {
        name: name,
        email: email,
        password: password,
    };

    sendData.push(nuevoUsuario);
    localStorage.setItem('data-user', JSON.stringify(sendData));
}

const perfilRegister = document.getElementById('register-panel');

perfilRegister.addEventListener('click', () => {
    // Evitamos duplicar el formulario si ya existe
    if(document.querySelector('.main-perfil')) return;

    const containerPerfil = document.createElement('div');
    containerPerfil.classList.add('main-perfil');

    containerPerfil.innerHTML = `
        <div class="container-form">

            <form id="form-user" class="class-form-user">
                <div class="text-introduction-form">
                    <h2 class="main-text-form">User Form</h2>
                    <i class="fa-solid fa-xmark" id="cerrarForm" style="font-size: 30px; cursor: pointer;"></i>             
                </div>
 
                <div class="cluster-input">
                    <label for="name">Name Complete</label>
                    <input type="text" id="name" required>
                </div>
                <div class="cluster-input">
                    <label for="email"> Email </label>
                    <input type="email" id="email" required>
                </div>
                <div class="cluster-input">
                    <label for="password">Writes Password</label>
                    <div class="input-wrapper">
                        <input type="password" id="password" class="pass" required>
                        <i class="fa-regular fa-eye-slash" id="icon-eyes-closed"></i>
                    </div>
                </div>
                <button type="submit" class="btn-send-data-user">Send</button>
            </form>
        </div>
    `;


    document.body.append(containerPerfil);

    const cerrarForm = document.getElementById('cerrarForm');
    cerrarForm.addEventListener('click', () => {
        containerPerfil.remove();
    })

    const pass = document.getElementById('password'),
    eyeClosed = document.getElementById('icon-eyes-closed');
    eyeClosed.addEventListener('click', () => {
        if (pass.type === 'password') {
            // 1. Mostramos el texto
            pass.type = "text";
            // 2. CAMBIO: Quitamos el ojo tachado y ponemos el ojo abierto
            eyeClosed.classList.replace('fa-eye-slash', 'fa-eye');
        } else {
            // 3. Ocultamos el texto
            pass.type = "password";
            // 4. CAMBIO: Quitamos el ojo abierto y ponemos el ojo tachado
            eyeClosed.classList.replace('fa-eye', 'fa-eye-slash');
        }
    });

    // Seleccionamos el FORM directamente por su ID
    const formUser = document.getElementById('form-user');
    
    formUser.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Llamamos a la función con el nuevo nombre
         const loader = document.createElement('div');
        loader.classList.add('loader-register');
        loader.innerHTML = `
            <div class="main-loader-register">
                <div class="loaderRegister"></div>   
            </div>
        `;

        containerPerfil.append(loader);

        setTimeout(() => {
            guardarEnStorage(name, email, password);

            // Recargamos para que se oculte el form y salga el panel
            location.reload();

        },6000);

    });

    // --- LÓGICA PARA MOSTRAR LOS DATOS ---
    const listadoUsuarios = JSON.parse(localStorage.getItem('data-user')) || [];

    if (listadoUsuarios.length > 0) {
        const containerForm = document.querySelector('.container-form');
        if (containerForm) containerForm.classList.add('hidden');

        listadoUsuarios.forEach(user => {
            

            const panelData = document.createElement('div');
            panelData.classList.add('panelDataUser');
            panelData.innerHTML = `
                <div class="panel_user_data"> 

                    <i class="fa-solid fa-xmark" id="cerrar" style="font-size: 30px; cursor: pointer;"></i>
                    
                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;">
                        <i class="fa-solid fa-circle-user" style="color: rgb(223, 224, 243); font-size: 45px;"></i>
                        <h2 style="margin: 0;">${user.name}</h2>                    
                    </div>


                    <div class="info-data-user">
                        <div class="data-info">
                            <span>Full Name: </span> 
                            <p>${user.name}</p>
                        </div>
                        <div class="data-info">
                            <span>You Email:</span> 
                            <p>${user.email}</p>
                        </div>
                        <div class="data-info">
                            <span>You Password:</span> 
                            <p>${user.password}</p>

                        </div>
                    </div>

                </div>
            `;
            containerPerfil.append(panelData);
        });

        let x = document.getElementById('cerrar');
        x.addEventListener('click', () => {
            containerPerfil.remove();
        })
    }
});
