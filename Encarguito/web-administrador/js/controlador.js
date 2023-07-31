//Arreglos de datos
var administradores = [
    {
      id: "1",
      nombre: "Juan",
      apellido: "Perez",
      correo: "jp@admin.com",
      contrasena: "1234"
    },
    {
      id: "2",
      nombre: "Maria",
      apellido: "Lopez",
      correo: "ml@admin.com",
      contrasena: "1234"
    },
    {
      id: "3",
      nombre: "Pedro",
      apellido: "Gonzalez",
      correo: "pg@admin.com",
      contrasena: "1234"
    }
  ];

var empresas = [
    {
        id: 1,
        nombreEmpresa: "Empresa 1",
        nombreContacto: "Contacto 1",
        telefono: "123456789",
        direccion: "Calle 1"
      },
      {
        id: 2,
        nombreEmpresa: "Empresa 2",
        nombreContacto: "Contacto 2",
        telefono: "123456789",
        direccion: "Calle 2"
      },
      {
        id: 3,
        nombreEmpresa: "Empresa 3",
        nombreContacto: "Contacto 3",
        telefono: "123456789",
        direccion: "Calle 3"
      }
    ];

var motoristas = [
    {
        id: 1,
        nombre: "Juan",
        apellido: "Perez",
        correo: "jperez@gmail.com",
        contrasena: "1234"
      },
      {
        id: 2,
        nombre: "Maria",
        apellido: "Lopez",
        correo: "mlopez@gmail.com",
        contrasena: "1234"
      },
      {
        id: 3,
        nombre: "Pedro",
        apellido: "Gonzalez",
        correo: "pgonzalez@gmail.com",
        contrasena: "1234"
      }
    ];

var ordenes = [
    {
      id: 1,
      nombre: "Juan",
      apellido: "Perez",
      telefono: "12345678",
      descripcion: "Orden 1",
      direccion: "Calle 1",
      estado: "Pendiente",
      fecha: "2020-10-10",
      hora: "10:00",
      motorista: "N/A"
    },
    {
      id: 2,
      nombre: "Maria",
      apellido: "Lopez",
      telefono: "87654321",
      descripcion: "Orden 2",
      direccion: "Calle 2",
      estado: "Pendiente",
      fecha: "2020-10-10",
      hora: "10:00",
      motorista: "N/A"
    },
    {
      id: 3,
      nombre: "Pedro",
      apellido: "Gonzalez",
      telefono: "12345678",
      descripcion: "Orden 3",
      direccion: "Calle 3",
      estado: "Pendiente",
      fecha: "2020-10-10",
      hora: "10:00",
      motorista: "N/A"
    },
    {
      id: 4,
      nombre: "Jose",
      apellido: "Garcia",
      telefono: "87654321",
      descripcion: "Orden 4",
      direccion: "Calle 4",
      estado: "En Proceso",
      fecha: "2020-10-10",
      hora: "10:00",
      motorista: "N/A"
    },
    {
      id: 5,
      nombre: "Carlos",
      apellido: "Rodriguez",
      telefono: "12345678",
      descripcion: "Orden 5",
      direccion: "Calle 5",
      estado: "En Proceso",
      fecha: "2020-10-10",
      hora: "10:00",
      motorista: "N/A"
    },
    {
      id: 6,
      nombre: "Luis",
      apellido: "Martinez",
      telefono: "87654321",
      descripcion: "Orden 6",
      direccion: "Calle 6",
      estado: "En Proceso",
      fecha: "2020-10-10",
      hora: "10:00",
      motorista: "N/A"
    },
    {
      id: 7,
      nombre: "Ana",
      apellido: "Hernandez",
      telefono: "12345678",
      descripcion: "Orden 7",
      direccion: "Calle 7",
      estado: "Finalizada",
      fecha: "2020-10-10",
      hora: "10:00",
      motorista: "N/A"
    },
    {
      id: 8,
      nombre: "Sofia",
      apellido: "Gomez",
      telefono: "87654321",
      descripcion: "Orden 8",
      direccion: "Calle 8",
      estado: "Finalizada",
      fecha: "2020-10-10",
      hora: "10:00",
      motorista: "N/A"
    }
  ];

var productos = [
    {
      id: 1,
      nombre: "Producto 1",
      precio: 1000,
      detalle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
    },
    {
      id: 2,
      nombre: "Producto 2",
      precio: 2000,
      detalle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
    },
    {
      id: 3,
      nombre: "Producto 3",
      precio: 3000,
      detalle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
    },
    {
      id: 4,
      nombre: "Producto 4",
      precio: 4000,
      detalle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
    },
    {
      id: 5,
      nombre: "Producto 5",
      precio: 5000,
      detalle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
    },
    {
      id: 6,
      nombre: "Producto 6",
      precio: 6000,
      detalle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
    },
    {
      id: 7,
      nombre: "Producto 7",
      precio: 7000,
      detalle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
    },
    {
      id: 8,
      nombre: "Producto 8",
      precio: 8000,
      detalle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
    },
    {
      id: 9,
      nombre: "Producto 9",
      precio: 9000,
      detalle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
    },
    {
      id: 10,
      nombre: "Producto 10",
      precio: 10000,
      detalle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
    }
  ];

//Funciones

//Funcion para validar el inicio de sesion del administrador
function enviarAdministrador() {
    var correo = document.getElementById("txtEmail").value;
    var contrasena = document.getElementById("txtPsswrd").value;
    var admin = administradores.find(
      (administrador) =>
        administrador.correo == correo && administrador.contrasena == contrasena
    );
    if (admin) {
      localStorage.setItem("sesion", admin.id);
      window.location.href = "administracion.html";
    } else {
      html = `<div class="alert alert-danger" role="alert">
                Usuario o contraseña incorrectos
                </div>`;
        document.getElementById("contrasenaerror").innerHTML = html;
    }
  };

//funcion para mostrar inicio
/*function mostrarInicio()*/
