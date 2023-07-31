//arreglo de datos de los motoristas
var motoristas = [
    {
        id: 1,
        nombre: "Juan",
        apellido: "Perez",
        correo: "jperez@gmail.com",
        contrasena: "1234",

    },

    {
        id: 2,
        nombre: "Maria",
        apellido: "Lopez",
        correo: "mlopez@gmail.com",
        contrasena: "1234",
    },

    {
        id: 3,
        nombre: "Pedro",
        apellido: "Garcia",
        correo: "pgarcia@gmail.com",
        contrasena: "1234",
    },
];

//arreglo de datos de las ordenes
var ordenes = [
    {
        id: 1,
        nombre: "Juan",
        apellido: "Perez",
        telefono: "8888-8888",
        descripcion: "Orden 1",
        direccion: "San Salvador",
        estado: "Pendiente",
        fecha: "2020-10-10",
        hora: "10:00",
        motorista: "N/A"
    },

    {
        id: 2,
        nombre: "Maria",
        apellido: "Lopez",
        telefono: "7777-7777",
        descripcion: "Orden 2",
        direccion: "San Salvador",
        estado: "Pendiente",
        fecha: "2020-10-10",
        hora: "10:00",
        motorista: "N/A"
    },

    {
        id: 3,
        nombre: "Pedro",
        apellido: "Garcia",
        telefono: "6666-6666",
        descripcion: "Orden 3",
        direccion: "San Salvador",
        estado: "Pendiente",
        fecha: "2020-10-10",
        hora: "10:00",
        motorista: "N/A"
    },

    {
        id: 4,
        nombre: "Diana",
        apellido: "Duron",
        telefono: "8888-8888",
        descripcion: "Orden 4",
        direccion: "San Salvador",
        estado: "En proceso",
        fecha: "2020-10-10",
        hora: "10:00",
        motorista: "Juan Perez"
    },

    {
        id: 5,
        nombre: "Maria",
        apellido: "Lopez",
        telefono: "7777-7777",
        descripcion: "Orden 5",
        direccion: "San Salvador",
        estado: "Finalizada",
        fecha: "2020-10-10",
        hora: "10:00",
        motorista: "Juan Perez"
    }
];

function enviarMotorista() {
    var correo= document.getElementById("txtEmail").value
    var contrasena= document.getElementById("txtPsswrd").value;
    console.log(correo);
    console.log(contrasena);
    
    verificarUsuario(correo, contrasena);
};

//funcion para verificar si el usuario (motorista) esta en el arreglo de motoristas
function verificarUsuario(correo, contrasena) {
    var registrado = false;
    var contrasenaerror = false;

    for (var i = 0; i < motoristas.length; i++) {
        if (motoristas[i].correo == correo && motoristas[i].contrasena == contrasena) {
            registrado = true;

            localStorage.setItem('motoristaActual', String(i+1));
            var motoristaActual = localStorage.getItem('motoristaActual');
            console.log(motoristaActual);

            break;
        }

        if (motoristas[i].correo == correo && motoristas[i].contrasena != contrasena) {
            contrasenaerror = true;
            break;
        }

        else {
            registrado = false;
        }
    }

    //si el usuario esta registrado, se muestra la pagina de ordenes
    if (registrado==true) {
        window.location.href = "ordenes.html";
    }
    if (registrado==false && contrasenaerror==false) {
        var html = `<div id="errorMotorista" class="card text-white bg-danger mb-3" style="max-width: 20rem;">
                <div class="card-header">Error</div>
                <div class="card-body">
                    <h5 class="card-title">Tu cuenta no existe o fue inhabilitada</h5>
                    <p class="card-text">Comuníquese con soporte técnico si cree que esto es un error +504 2233-4455</p>
                </div>
            </div>`;

        var fondoElemento = document.getElementById("logoformcontainer");
        fondoElemento.innerHTML = html;
    }

    if (contrasenaerror==true) {
        var html = `
        <div id="contrasenaerror2">CONTRASEÑA INCORRECTA</div>
      `;
        var fondoElemento = document.getElementById("contrasenaerror");
        fondoElemento.innerHTML = html;
    }
};

function ocultarSesion() {
    var fondoElemento = document.getElementById("logoformcontainer");
    fondoElemento.innerHTML = "";
    fondoElemento.style.display = 'none';
}

function mostrarSesion() {
    location.href = "motoristas.html";
}

function ocultarRegistro() {
    var fondoElemento = document.getElementById("formularioRegistro");
    fondoElemento.innerHTML = "";
    fondoElemento.style.display = 'none';
}

//funcion para mostrar formulario de registro de motorista
function mostrarFormularioRegistro() {

    var fondoElemento = document.getElementById("formularioRegistro");
    fondoElemento.style.display = 'block';
    
  var html = `<div class="container">
    <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 form-container">
        <h1>REGISTRO</h1>
            <br>
            <br>
            <form>
                <div class="form-group">
                    <label for="txtNombre">Nombre</label>
                    <input type="text" class="form-control" id="txtNombre" placeholder="Nombre">
                </div>
                <div class="form-group">
                    <label for="txtApellido">Apellido</label>
                    <input type="text" class="form-control" id="txtApellido" placeholder="Apellido">
                </div>
                <div class="form-group">
                    <label for="txtCorreo">Correo</label>
                    <input type="text" class="form-control" id="txtCorreo" placeholder="Correo">
                </div>
                <div class="form-group">
                    <label for="txtContrasena">Contraseña</label>
                    <input type="password" class="form-control" id="txtContrasena" placeholder="Contraseña">
                </div>
                <div id="botonRegistro">
                    <button type="button" class="btn-login" onclick="registrarMotorista()" href="">Registrarme</button>
                </div>
            </form>
        </div>
    </div>
</div>`;

  fondoElemento.innerHTML = html;
};

function registrarMotorista() {
    var nombre = document.getElementById("txtNombre").value;
    var apellido = document.getElementById("txtApellido").value;
    var correo = document.getElementById("txtCorreo").value;
    var contrasena = document.getElementById("txtContrasena").value;

    var motorista = {
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        contrasena: contrasena,
    };

    motoristas.push(motorista);
    console.log(motoristas);
    ocultarRegistro();
    mostrarSesion();
}


//Ordenes


//funcion para ocultar la pagina de ordenes
function ocultarOrdenes() {
    var fondoElemento = document.getElementById("ordenesContainer");
    fondoElemento.innerHTML = "";
    fondoElemento.style.display = 'none';
}

//funcion para regresar a la pagina de ordenes sin recargar la pagina
function regresarOrdenes() {
    var html = `<div class="circle-container">
    <img src="img/logo.png" alt="Logo" class="logoOrdenes">
  </div>

<div class="button-container">
    <button onclick="mostrarOrdenesdisponibles()" class="order-button">
      <i class="fas fa-box"></i> Ordenes disponibles
    </button>
</div>

<div class="button-container">
    <button onclick="mostrarPendientes()" class="order-button">
        <i class="fas fa-truck"></i> Ordenes pendientes
    </button>
</div>

<div class="button-container">
    <button onclick="mostrarFinalizadas()" class="order-button">
        <i class="fas fa-list-ul"></i> Ordenes completadas
      </button>
</div>`
    var fondoElemento = document.getElementById("ordenesContainer");
    fondoElemento.innerHTML = html;
    var fondoElemento2 = document.getElementById("ordenesDisponibles");
    fondoElemento2.innerHTML = "";
    fondoElemento2.style.display = 'none';
    fondoElemento.style.display = 'block';
}

//funcion para mostrar las ordenes en la tabla
function mostrarOrdenesdisponibles() {
    var fondoElemento2 = document.getElementById("ordenesDisponibles");
    fondoElemento2.style.display = 'block';
    ocultarOrdenes();
    var html = `<div class="card-container">
    <div class="return-btn">
      <i class="fas fa-arrow-left" onclick="regresarOrdenes()"></i>
    </div>
    <h5>Ordenes Disponibles<\h5>
      `;
    for (var i = 0; i < ordenes.length; i++) {
        if (ordenes[i].estado == "Pendiente") {
        html += `<div class="card" id="cardOrdendisp">
        <div onclick="detallesOrden(${ordenes[i].id})" class="card-header">
          <h3>Orden #${ordenes[i].id}</h3>
        </div>
        <div class="card-body">
          <table>
            <tr>
              <td><strong>Nombre:</strong></td>
              <td>${ordenes[i].nombre} ${ordenes[i].apellido}</td>
            </tr>
            <tr>
              <td><strong>Teléfono:</strong></td>
              <td>${ordenes[i].telefono}</td>
            </tr>
            <tr>
              <td><strong>Descripción:</strong></td>
              <td>${ordenes[i].descripcion}</td>
            </tr>
            <tr>
              <td><strong>Dirección:</strong></td>
              <td>${ordenes[i].direccion}</td>
            </tr>
            <tr>
              <td><strong>Estado:</strong></td>
              <td>${ordenes[i].estado}</td>
            </tr>
            <tr>
              <td><strong>Fecha:</strong></td>
              <td>${ordenes[i].fecha}</td>
            </tr>
            <tr>
              <td><strong>Hora:</strong></td>
              <td>${ordenes[i].hora}</td>
            </tr>
            <tr>
              <td><strong>Motorista:</strong></td>
              <td>${ordenes[i].motorista}</td>
            </tr>
            <tr>
              <td colspan="2">
                <button type="button" class="btn-login" onclick="aceptarOrden(${ordenes[i].id})">Aceptar</button>
              </td>
            </tr>
          </table>
        </div>
      </div>
      `;
        }
    }

    html += `
  </div>`;

    var fondoElemento = document.getElementById("ordenesDisponibles");
    fondoElemento.innerHTML = html;
}

//aceptar orden
function aceptarOrden(id) {
    var orden = ordenes.find(function (orden) {
        return orden.id == id;
    });

    var motoristaActual = localStorage.getItem('motoristaActual');
    //convertir a entero
    motoristaActual = parseInt(motoristaActual);

    orden.estado = "En proceso";
    orden.motorista = motoristas.find(function (motorista) {
        return motorista.id == motoristaActual;
    }).nombre + " " + motoristas.find(function (motorista) {
        return motorista.id == motoristaActual
        }).apellido;

    mostrarOrdenesdisponibles();

    var html = ` <div class="floating-button">
    <button onclick="mostrarPendientes();">Órdenes Pendientes</button>
  </div>`;
    var fondoElemento = document.getElementById("ordenesDisponibles");
    fondoElemento.innerHTML += html;

}

//funcion para mostrar las ordenes pendientes
function mostrarPendientes() {
    var fondoElemento2 = document.getElementById("ordenesDisponibles");
    fondoElemento2.style.display = 'block';
    ocultarOrdenes();
    var html = `<div class="card-container">
    <div class="return-btn">
      <i class="fas fa-arrow-left" onclick="regresarOrdenes()"></i>
    </div>
    <h5>Ordenes Pendientes<\h5>
      `;
    for (var i = 0; i < ordenes.length; i++) {
        if (ordenes[i].estado == "En proceso") {
        html += `<div class="card" id="cardOrdendisp">
        <div class="card-header" onclick="detallesOrden(${ordenes[i].id})">
          <h3>Orden #${ordenes[i].id}</h3>
        </div>
        <div class="card-body">
          <table>
            <tr>
              <td><strong>Nombre:</strong></td>
              <td>${ordenes[i].nombre} ${ordenes[i].apellido}</td>
            </tr>
            <tr>
              <td><strong>Teléfono:</strong></td>
              <td>${ordenes[i].telefono}</td>
            </tr>
            <tr>
              <td><strong>Descripción:</strong></td>
              <td>${ordenes[i].descripcion}</td>
            </tr>
            <tr>
              <td><strong>Dirección:</strong></td>
              <td>${ordenes[i].direccion}</td>
            </tr>
            <tr>
              <td><strong>Estado:</strong></td>
              <td>${ordenes[i].estado}</td>
            </tr>
            <tr>
              <td><strong>Fecha:</strong></td>
              <td>${ordenes[i].fecha}</td>
            </tr>
            <tr>
              <td><strong>Hora:</strong></td>
              <td>${ordenes[i].hora}</td>
            </tr>
            <tr>
              <td><strong>Motorista:</strong></td>
              <td>${ordenes[i].motorista}</td>
            </tr>
            <tr>
              <td colspan="2">
                <button type="button" class="btn-login" onclick="finalizarOrden(${ordenes[i].id})">Finalizar</button>
              </td>
            </tr>
          </table>
        </div>
      </div>
      `;
        }
    }

    html += `
  </div>`;

    var fondoElemento = document.getElementById("ordenesDisponibles");
    fondoElemento.innerHTML = html;
}

//funcion para finalizar orden
function finalizarOrden(id) {
    var orden = ordenes.find(function (orden) {
        return orden.id == id;
    });

    orden.estado = "Finalizada";

    mostrarPendientes();

    var html = ` <div class="floating-button">
    <button onclick="mostrarFinalizadas();">Órdenes Finalizadas</button>
    </div>`;
    var fondoElemento = document.getElementById("ordenesDisponibles");
    fondoElemento.innerHTML += html;

}

//funcion para mostrar las ordenes finalizadas
function mostrarFinalizadas() {
    var fondoElemento2 = document.getElementById("ordenesDisponibles");
    fondoElemento2.style.display = 'block';
    ocultarOrdenes();
    var html = `<div class="card-container">
    <div class="return-btn">
      <i class="fas fa-arrow-left" onclick="regresarOrdenes()"></i>
    </div>
    <h5>Ordenes Finalizadas<\h5>
      `;
    for (var i = 0; i < ordenes.length; i++) {
        if (ordenes[i].estado == "Finalizada") {
        html += `<div class="card" id="cardOrdendisp">
        <div class="card-header" onclick="detallesOrden(${ordenes[i].id})">
          <h3>Orden #${ordenes[i].id}</h3>
        </div>
        <div class="card-body">
          <table>
            <tr>
              <td><strong>Nombre:</strong></td>
              <td>${ordenes[i].nombre} ${ordenes[i].apellido}</td>
            </tr>
            <tr>
              <td><strong>Teléfono:</strong></td>
              <td>${ordenes[i].telefono}</td>
            </tr>
            <tr>
              <td><strong>Descripción:</strong></td>
              <td>${ordenes[i].descripcion}</td>
            </tr>
            <tr>
              <td><strong>Dirección:</strong></td>
              <td>${ordenes[i].direccion}</td>
            </tr>
            <tr>
              <td><strong>Estado:</strong></td>
              <td>${ordenes[i].estado}</td>
            </tr>
            <tr>
              <td><strong>Fecha:</strong></td>
              <td>${ordenes[i].fecha}</td>
            </tr>
            <tr>
              <td><strong>Hora:</strong></td>
              <td>${ordenes[i].hora}</td>
            </tr>
            <tr>
              <td><strong>Motorista:</strong></td>
              <td>${ordenes[i].motorista}</td>
            </tr>
          </table>
        </div>
      </div>
      `;
        }
    }

    html += `
  </div>`;

    var fondoElemento = document.getElementById("ordenesDisponibles");
    fondoElemento.innerHTML = html;
}

//funcion para mostrar los detalles de la orden
function detallesOrden(id) {
    ocultarOrdenes();
    var orden = ordenes.find(function (orden) {
        return orden.id == id;
    });

    var html = `<div class="card-container">
    <div class="return-btn">
      <i class="fas fa-arrow-left" onclick="regresarOrdenes()"></i>
    </div>
    <h5>Detalles de la Orden<\h5>
      `;
    html += `<div class="card" id="cardOrdendisp">
        <div class="card-header">
          <h3>Orden #${orden.id}</h3>
        </div>
        <div class="card-body">
          <table>
            <tr>
              <td><strong>Nombre:</strong></td>
              <td>${orden.nombre} ${orden.apellido}</td>
            </tr>
            <tr>
              <td><strong>Teléfono:</strong></td>
              <td>${orden.telefono}</td>
            </tr>
            <tr>
              <td><strong>Descripción:</strong></td>
              <td>${orden.descripcion}</td>
            </tr>
            <tr>
              <td><strong>Dirección:</strong></td>
              <td>${orden.direccion}</td>
            </tr>
            <tr>
              <td><strong>Estado:</strong></td>
              <td>${orden.estado}</td>
            </tr>
            <tr>
              <td><strong>Fecha:</strong></td>
              <td>${orden.fecha}</td>
            </tr>
            <tr>
              <td><strong>Hora:</strong></td>
              <td>${orden.hora}</td>
            </tr>
            <tr>
              <td><strong>Motorista:</strong></td>
              <td>${orden.motorista}</td>
            </tr>
          </table>
        </div>
      </div>
      `;

    html += `
  </div>`;

    var fondoElemento = document.getElementById("ordenesDisponibles");
    fondoElemento.innerHTML = html;
}
    