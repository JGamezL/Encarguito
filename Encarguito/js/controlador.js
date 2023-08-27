//arreglos de datos
var usuario = [];
var productos = [];
var ordenes = [];
var empresas = [];

async function cargarEmpresas(){
    let resultado = await fetch("http://localhost:3000/empresas");
    let datos = await resultado.json();
    empresas = datos;
    console.log(empresas);
}

async function cargarOrdenes(){
    let resultado = await fetch("http://localhost:3000/ordenes");
    let datos = await resultado.json();
    ordenes = datos;
    //console.log(ordenes);
}
cargarOrdenes();

async function cargarDatos(){
    let resultado = await fetch("http://localhost:3000/users");
    let datos = await resultado.json();
    usuario = datos;
    //console.log(usuario);
    usuarioActualData();

}

cargarDatos();

async function cargarProductos(){
    let resultado = await fetch("http://localhost:3000/prods");
    let datos = await resultado.json();
    productos = datos;

    renderizarProductos();
}

function usuarioActualData(){
    let id = localStorage.getItem("sesion");
    parseInt(id);

    let usuarioActual = usuario[id-1];


    //muestra en el navbar el usuario actual
    navbarUserDiv = document.getElementById("navbarUser");
    cartNumberDiv = document.getElementById("cartnumbercontainer");
    navbarUserDiv.innerHTML = `<p style="color: #5ab780;padding-right: 27px;padding-top: 15px;">${usuarioActual.nombre + " "+ usuarioActual.apellido + " | " + usuarioActual.correo}</p>`;
    cartNumberDiv.innerHTML = `${usuarioActual.productosCarrito.length}`;
}

//funciones
async function login(){
    let correo = document.getElementById("email").value;
    let contrasena = document.getElementById("password").value;

    let resultado = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            correo: correo,
            contrasena: contrasena
        })
    });
    let respuesta = await resultado.json();
    usuario = respuesta;
    
    if (respuesta != "no encontrado"){
        localStorage.clear();
        localStorage.setItem("sesion", usuario.id);
        window.location.href = "page.html";
    }
    else{
        document.getElementById("psswdError").innerHTML = `<div style="align-items: center;" class="alert alert-danger" role="alert">
        Usuario o contraseña incorrectos
        </div>`;
    }
}

async function registro(){
    cargarDatos();
    let id = usuario.length + 1;
    let nombre = document.getElementById("name").value;
    let apellido = document.getElementById("apellido").value;
    let correo = document.getElementById("correo").value;
    let contrasena = document.getElementById("password").value;
    let telefono = document.getElementById("telefono").value;
    let direccion = document.getElementById("direccion").value;
    let productosCarrito = [];
    let ordenes = [];

    let resultado = await fetch("http://localhost:3000/users/registro", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id,
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            contrasena: contrasena,
            telefono: telefono,
            direccion: direccion,
            productosCarrito: productosCarrito,
            ordenes: ordenes
            })
    });

    let respuesta = await resultado.json();

    if(respuesta != "error"){
        alert("Usuario registrado correctamente");
        window.location.href = "login.html";
    }
    else{
        alert("Error al registrar usuario");
    }

    cargarDatos();
    
}

async function renderizarProductos(){
    cargarDatos();
    cargarEmpresas();
    console.log(productos);

    cardContainerDiv = document.getElementById("card-container");
    carritoContainerDiv = document.getElementById("carrito-container");
    carritoContainerDiv.style.display = "none";

    for(let i = 0; i < productos.length; i++){
        cardContainerDiv.innerHTML += `
        <div class="produt-card">
            <img src="https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" class="product-img">
            <div class="product-info">
                <div>
                <p>L. ${productos[i].precio}</p>
                <p>${productos[i].nombre}</p>
                <p>${productos[i].empresa}</p>
                </div>
                <figure>
                    <i onclick="anadirCarrito(${i+1})" class=" cart fa-solid fa-cart-shopping" style="color: #5ab780; cursor: pointer;"></i>
                </figure>
            </div>
        </div>
        `
    }
}


function filtrarProductosPorEmpresa() {
    let empresa = document.getElementById("empresa-select").value;
    cardContainerDiv = document.getElementById("card-container");
    cardContainerDiv.innerHTML = "";
    for(let i = 0; i < productos.length; i++){
        if(productos[i].empresa == empresa){
            cardContainerDiv.innerHTML += `
            <div class="produt-card">
                <img src="https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" class="product-img">
                <div class="product-info">
                    <div>
                    <p>L. ${productos[i].precio}</p>
                    <p>${productos[i].nombre}</p>
                    <p>${productos[i].empresa}</p>
                    </div>
                    <figure>
                        <i onclick="anadirCarrito(${i+1})" class=" cart fa-solid fa-cart-shopping" style="color: #5ab780; cursor: pointer;"></i>
                    </figure>
                </div>
            </div>
            `
        }
        if(empresa == "Todos"){
            renderizarProductos();
            break;
        }
  }
}

async function anadirCarrito(idProducto){
    let id = localStorage.getItem("sesion");
    let resultado = await fetch(`http://localhost:3000/users/carrito`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id,
            productosCarrito: {
                idProducto: idProducto,
            }
        })
    });
    let respuesta = await resultado.json();
    console.log(respuesta);
    cargarDatos();
}

async function renderizarCarrito(){
    cargarOrdenes();
    let id = localStorage.getItem("sesion");
    parseInt(id);
    let usuarioActual = usuario[id-1];
    let carrito = usuarioActual.productosCarrito;
    let carritoContainerDiv = document.getElementById("carrito-container");
    let carritoBodyDiv = document.getElementById("carrito-body");
    let totalCarritoDiv = document.getElementById("total-carrito-container");
    let total = 0;

    carritoContainerDiv.style.display = "flex";
   
    for(let i = 0; i < carrito.length; i++){
        let producto = productos[carrito[i].idProducto-1];
        total += producto.precio;
        carritoBodyDiv.innerHTML += `
        <div class="carrito-product">
            <img src="https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" class="product-img">
                <div class="product-info">
                <div>
                    <p class="product-price">L. ${producto.precio}</p>
                    <p class="product-name">${producto.nombre}</p>
                </div>
            <figure>
                <i onclick="eliminarCarrito(${i+1})" class="cart fa-solid fa-cart-shopping"></i>
            </figure>
            </div>
        </div>
        `
    }
    stringTotal = "L. " + total.toString();

    totalCarritoDiv.innerHTML = `${stringTotal}`;
}

function cerrarCarrito(){
    let carritoContainerDiv = document.getElementById("carrito-container");
    let carritoBodyDiv = document.getElementById("carrito-body");
    carritoContainerDiv.style.display = "none";
    carritoBodyDiv.innerHTML = "";
}

async function eliminarTodoCarrito(){
    let id = localStorage.getItem("sesion");
    let resultado = fetch(`http://localhost:3000/users/carrito`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id
        })
    });
    cargarDatos();
    cerrarCarrito();

    //abre page.html
    window.location.href = "page.html";
}

async function crearOrdenUsuario(){
    let id = localStorage.getItem("sesion");
    let idOrden = ordenes.length + 1;
    let resultado = await fetch(`http://localhost:3000/users/orden`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id,
            ordenes: {
                idOrden: idOrden
            }
        })
    });
    resultado = await resultado.json();
    
    let descripcion = "Orden " + idOrden;
    let estado = "Pendiente";
    let precio = document.getElementById("total-carrito-container").innerHTML;
    let fecha2 = new Date();
    fecha = `${fecha2.getFullYear()}-${fecha2.getMonth()}-${fecha2.getDate()}`;
    let hora = fecha2.getHours() + ":" + fecha2.getMinutes()
    precio = precio.slice(3);
    crearOrdenOrdenes(idOrden, resultado.nombre, resultado.apellido, resultado.telefono, descripcion, resultado.direccion, estado, fecha, precio, hora, resultado.productosCarrito);
    cargarDatos();
    cerrarCarrito();
}

async function crearOrdenOrdenes(idOrden, nombre, apellido, telefono, descripcion, direccion, estado, fecha, precio, hora, productosCarrito){
    let resultado = await fetch("http://localhost:3000/ordenes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: idOrden,
            nombre: nombre,
            apellido: apellido,
            telefono: telefono,
            descripcion: descripcion,
            direccion: direccion,
            estado: estado,
            fecha: fecha,
            precio: precio,
            hora: hora,
            productos: productosCarrito
        })
    });
    resultado = await resultado.json();
    console.log(resultado);
    if(resultado != "error"){
        eliminarTodoCarrito();
        cerrarCarrito();
    }
    else{
        alert("Error al crear orden");
    }
}

function renderOrdenesLoad(){
    cargarDatos();
    cargarOrdenes();

    if(ordenes.length > 0){
        renderOrdenes();
    }
    else{
        setTimeout(function(){
            renderOrdenesLoad();
        }, 1);
    }
}

function renderOrdenes(){
    let ordenesContainerDiv = document.getElementById("my-order-content");
    let id = localStorage.getItem("sesion");
    parseInt(id);
    let usuarioActual = usuario[id-1];
    console.log(usuarioActual);
    let idOrds = usuarioActual.ordenes;
    console.log(idOrds);
    console.log(ordenes);
    ordenesContainerDiv.innerHTML = "";
    for(let i = 0; i < ordenes.length; i++){
        for(let j = 0; j < idOrds.length; j++){
            if(idOrds[j].idOrden == ordenes[i].id){
                let orden = ordenes[i];
                //console.log(orden);
                ordenesContainerDiv.innerHTML += `
                <div onclick="mostrarDetalleOrden(${idOrds[j].idOrden})" class="orden">
                    <div class="orden-header">
                        <p>${orden.descripcion}</p>
                        <p class="estado">${orden.estado}</p>
                    </div>
                    <div class="orden-body">
                        <p class="fecha">${orden.fecha}</p>
                        <p class="hora">${orden.hora}</p>
                        <p class="precio">L. ${orden.precio}</p>
                    </div>
                </div>
                `
        }
    }
}

    ordenesContainerDiv.style.display = "flex";
    cargarOrdenes();
}

//funcion que muestra los detalles de la orden
function mostrarDetalleOrden(id){
    let myorderContainerDiv = document.getElementById("ver-detalles-body");

    parseInt(id);
    let orden = ordenes[id-1];
    console .log(orden);
    myorderContainerDiv.innerHTML += `
    <div class="my-order-detail">
        <div class="my-order-detail-header">
            <h2>${orden.descripcion}</h2>
            <p class="estado">${orden.estado}</p>
        </div>
        <div class="my-order-detail-body">
            <p class="fecha">Fecha: ${orden.fecha}</p>
            <p class="hora">Hora: ${orden.hora}</p>
            <p class="precio">Precio: L.${orden.precio}</p>
            <p class="fecha">Nombre: ${orden.nombre} ${orden.apellido}</p>
            <p class="fecha">Telefono: ${orden.telefono}</p>
            <p class="fecha">Direccion: ${orden.direccion}</p>
        </div>
    `
    document.getElementById('cancelarOrden').innerHTML = `<button class="ver-detalles-footer-buttons-cancelar" onclick="borrarOrden(${orden.id})">Borrar Orden</button>`;

    document.getElementById("ver-detalles-container").style.display = "flex";
}

function cerrarDetalleOrden(){
    document.getElementById("ver-detalles-container").style.display = "none";
    document.getElementById("ver-detalles-body").innerHTML = "";
}

async function borrarOrden(id){
    let idUsuario = localStorage.getItem("sesion");
    let ordenes = usuario[idUsuario-1].ordenes;

    let resultado = await fetch(`http://localhost:3000/users/orden`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuario: idUsuario,
            idOrden: id,
            ordenes: ordenes
        })
    });

    let resultado2 = await fetch(`http://localhost:3000/ordenes/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id
        })
    });

    cargarDatos();
    cerrarDetalleOrden();
    //recarga la pagina
    window.location.href = "mis.ordenes.html";
}

cargarDatos();

async function mostrarPerfilLoad(){
    let resultado = await fetch("http://localhost:3000/users");
    let datos = await resultado.json();
    usuario = datos;
    let id = localStorage.getItem("sesion");
    parseInt(id);
    let usuarioActual = usuario[id-1];

    mostrarPerfil(usuarioActual);
}

function mostrarPerfil(usuarioActual){
    id = localStorage.getItem("sesion");
    console.log(usuarioActual);
    let perfilContainerDiv = document.getElementById("form-container");

    perfilContainerDiv.innerHTML = `
    <div class="perfil-info">
    <label for="name" id="nombrePerfil" class="label">Nombre Completo</label>
    <p class="value">${usuarioActual.nombre} ${usuarioActual.apellido}</p>

    <label for="email" id="correoPerfil" class="label">Correo</label>
    <p class="value">${usuarioActual.correo}</p>

    <label for="telefono" id="telefonoPerfil" class="label">Telefono</label>
    <p class="value">${usuarioActual.telefono}</p>

    <label for="direccion" id="direccionPerfil" class="label">Direccion</label>
    <p class="value">${usuarioActual.direccion}</p>

    <button onclick="editarPerfil(usuario[${id-1}])" class="secondary-button login-button">Editar</button>
    </div>

    `
    perfilContainerDiv.style.display = "flex";
}

async function editarPerfil(usuarioActual){

    let perfilContainerDiv = document.getElementById("form-container");

    perfilContainerDiv.innerHTML = `
    <div class="perfil-info" style="display: flex; flex-direction: column;">
    <label for="name" id="nombreLabel" class="label">Nombre Completo</label>
    <input type="text" id="nombrePerfil" class="value" value="${usuarioActual.nombre}">
  
    <label for="email" id="apellidoLabel" class="label">Apellido</label>
    <input type="text" id="apellidoPerfil" class="value" value="${usuarioActual.apellido}">
  
    <label for="email" id="correoLabel" class="label">Correo</label>
    <input type="text" id="correoPerfil" class="value" value="${usuarioActual.correo}">
  
    <label for="telefono" id="telefonoLabel" class="label">Telefono</label>
    <input type="text" id="telefonoPerfil" class="value" value="${usuarioActual.telefono}">
  
    <label for="direccion" id="direccionLabel" class="label">Direccion</label>
    <input type="text" id="direccionPerfil" class="value" value="${usuarioActual.direccion}">
    
    <br>

    <button onclick="guardarPerfil()" class="large-button login-button">Guardar</button>
  </div>
  
    `
    perfilContainerDiv.style.display = "flex";
}

async function guardarPerfil(){
    let respuesta = await fetch("http://localhost:3000/users",
    {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: localStorage.getItem("sesion"),
            nombre: document.getElementById("nombrePerfil").value,
            apellido: document.getElementById("apellidoPerfil").value,
            correo: document.getElementById("correoPerfil").value,
            telefono: document.getElementById("telefonoPerfil").value,
            direccion: document.getElementById("direccionPerfil").value
        })
    });

    respuesta = await respuesta.json();
    console.log(respuesta);

    window.location.href = "edit.profile.html";
}