import { Vehiculo } from "./Vehiculo.js";
import { Terrestre } from "./Terrestre.js";
import { Aereo } from "./Aereo.js";
import { actualizarTabla } from "./tabla.js";
import {validaAereo,validaTerrestre} from "./validaciones.js"
import {lista as listas} from "./lista.js"

const lista = JSON.parse(localStorage.getItem("lista")) || [];

const seccionTabla = document.getElementById("tabla");
const promedio = document.getElementById("promedio");
const dropdown = document.getElementById("drop");
const dropdownAbm = document.getElementById("dropAbm");
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const aceptarDatosButton = document.getElementById("agregar");
const aceptarAbmButton = document.getElementById('aceptarAbm');
const eliminarButton = document.getElementById('eliminarAbm');

const formulario = document.forms[0];
const formAbm = document.forms[1];
let listaElegida =[];

if (lista.length) {
  actualizarTabla(seccionTabla, lista);
}
else
{
  localStorage.setItem("lista",JSON.stringify(listas));
}

function actualizarStorage(clave, data) {
  localStorage.setItem(clave, JSON.stringify(data));
}

window.addEventListener("load", (e) => 
{
    document.getElementById("formAbm").style.display = "none";
    listaElegida = lista;
    checkboxes.forEach((checkbox) => {
      checkbox.checked = true;
    });
    actualizarTabla(seccionTabla, lista);
    //ordenar(lista);
    mostrarColumnas();
});


function mostrarColumnas() 
{
    const columnas = ["id","modelo",
      "anoFab",
      "velMax",
      "altMax",
      "autonomia",
      "cantPue",
      "cantRue",
    ];

    columnas.forEach((columna) => {
      const checkbox = document.querySelector(`input[name="check${columna}"]`);

      let estado;
      if (checkbox.checked) {
        estado = "table-cell";
      } else {
        estado = "none";
      }
      const celdas = document.querySelectorAll(`td.${columna}`);

      celdas.forEach((celda) => {
        celda.style.display = estado;
        const indice = celda.cellIndex;
        // Accede a la fila del encabezado y elimina la celda correspondiente
        const thRow = celda
          .closest("table")
          .querySelector("thead")
          .querySelector("tr");
        if (thRow.cells[indice]) {
          thRow.cells[indice].style.display = estado;
        }
      });
    });
}

checkboxes.forEach((checkbox) => 
{
    checkbox.addEventListener("change", mostrarColumnas);
});

dropdown.addEventListener("change", (event) => 
{
    const selectedValue = event.target.value;
    console.log("Valor seleccionado", selectedValue);
    switch (selectedValue) {
      case "1":
        listaElegida = lista;
        break;
      case "2":
        listaElegida = lista.filter((terrestre) =>
          terrestre.hasOwnProperty("cantPue")
        );
        break;
      case "3":
        listaElegida = lista.filter((aereo) =>
          aereo.hasOwnProperty("altMax")
        );
        break;
      default:
        listaElegida = [];
        alert("Error al cargar la lista");
        break;
    }
    console.log("Lista elegida", listaElegida);
    actualizarTabla(seccionTabla, listaElegida);
    ordenar(listaElegida);
});

promedio.addEventListener("click", () => 
{
    const promedioVel = calcularPromedioVel(listaElegida);
    const promedioText = document.getElementById("promedioVelocidad");
    promedioText.value = promedioVel.toFixed(3);
});
  
//calcula promedio
function calcularPromedioVel(lista) 
{
    if (lista != null) 
    {
      const vel = lista.map((item) => item.velMax);
      if (vel.length > 0) 
      {
        const sumaVel = vel.reduce((total, vel) => total + vel, 0);
        const promedioVel = sumaVel / vel.length;
        return promedioVel;
      }
      else 
      {
        alert("Error al sacar promedio de velocidades");
        return 0;
      }
    }
}

function ordenar(listaElegida)
{
  const theads = document.querySelectorAll("th");
  theads.forEach((encabezado) => 
  {
    encabezado.addEventListener('click', (e) => 
    {
      let head = e.target.textContent;
      console.log("th: ", head);
      if (head === "modelo") {
        listaElegida.sort((a, b) => a[head].localeCompare(b[head]));
        console.log(listaElegida);
      } 
      else 
      {
        listaElegida.sort((a, b) => a[head] - b[head]);
        console.log(listaElegida);
      }
      actualizarTabla(seccionTabla, listaElegida);
      mostrarColumnas();
    });
  });
}

dropdownAbm.addEventListener("change", (event) => 
{
    const selectedValue = event.target.value;
    const txtAltMax = document.getElementById("txtAltMax");
    const txtAutonomia = document.getElementById("txtAutonomia");
    const txtCantPue = document.getElementById("txtCantPue");
    const txtCantRue = document.getElementById("txtCantRue");
    const txtId = document.getElementById("textId");
    txtId.readOnly = true;

    txtAltMax.removeAttribute("disabled");
    txtAltMax.value = "";

    txtAutonomia.removeAttribute("disabled");
    txtAutonomia.value = "";

    txtCantPue.removeAttribute("disabled");
    txtCantPue.value = "";

    txtCantRue.removeAttribute("disabled");
    txtCantRue.value = "";

    txtId.removeAttribute("disabled");
    txtId.value = "";

    if (selectedValue === "terrestre")
    {
      txtAltMax.setAttribute("disabled", "disabled");
      txtAutonomia.setAttribute("disabled", "disabled");
    } 
    else if (selectedValue === "aereo") 
    {
      txtCantPue.setAttribute("disabled", "disabled");
      txtCantRue.setAttribute("disabled", "disabled");
    }
});


aceptarDatosButton.addEventListener('click',(event)=>
{
  event.preventDefault();
  document.getElementById('formDatos').style.display = 'none';
  document.getElementById('formAbm').style.display = 'block';
  const txtId = document.getElementById('textId');
  const txtAltMax = document.getElementById("txtAltMax");
  const txtAutonomia = document.getElementById("txtAutonomia");
  const txtCantPue = document.getElementById("txtCantPue");
  const txtCantRue = document.getElementById("txtCantRue");
  dropdownAbm.selectedValue = 'terrestre';
  txtId.readOnly = true;

  txtAltMax.removeAttribute('disabled');
  txtAltMax.value = '';
  
  txtAutonomia.removeAttribute('disabled');
  txtAutonomia.value = '';

  txtCantPue.removeAttribute('disabled');
  txtCantPue.value = '';

  txtCantRue.removeAttribute('disabled');
  txtCantRue.value = '';

  txtId.removeAttribute('disabled');
  txtId.value = '';
  if(dropdownAbm.selectedValue === 'terrestre')
  {
    txtAltMax.setAttribute('disabled','disabled');
    txtAutonomia.setAttribute('disabled','disabled');    
  }
  else if(dropdownAbm.selectedValue === 'aereo')
  {
    txtCantPue.setAttribute('disabled','disabled');
    txtCantRue.setAttribute('disabled','disabled');
  }
  
});

seccionTabla.addEventListener("dblclick", (e) => 
{
  if (e.target.matches("td")) 
  {
    activaBotones();
    // Oculta el formulario de datos y muestra el formulario de ABM con los datos cargados
    document.getElementById("formDatos").style.display = "none";
    document.getElementById("formAbm").style.display = "block";

    // Obtiene el ID 
    const id = e.target.parentElement.children[0].textContent;
    console.log(id);
    // Encuentra la persona seleccionada
    const vehiculoSelecionado = listaElegida.find((vehiculo) => vehiculo.id == id);
    console.log(vehiculoSelecionado);
    if (vehiculoSelecionado.hasOwnProperty("altMax")) {
      // Carga los datos en el formulario de ABM
      cargarFormAereo(vehiculoSelecionado);
      console.log("Entre en aereo");
    } else if (vehiculoSelecionado.hasOwnProperty("cantPue")) {
      cargarFormTerrestre(vehiculoSelecionado);
      console.log("Entre en terrestre");
    }
  }
});

//Handler Aceptar
function handlerAceptar(event) 
{
  event.preventDefault();
  const txtId = document.getElementById('textId');
  const txtModelo = document.getElementById('txtModelo');
  const txtAnoFab = document.getElementById('txtAnoFab');
  const txtVelMax = document.getElementById('txtVelMax');
  const txtAutonomia = document.getElementById("txtAutonomia");
  const txtAltMax = document.getElementById("txtAltMax");
  const txtCantPue = document.getElementById("txtCantPue");
  const txtCantRue = document.getElementById("txtCantRue");
  const dropAbm = document.getElementById('dropAbm');

  txtId.readOnly = true;
  console.log(txtId.value);

  if(aceptarDatosButton.value === "Agregar")
  {
      if(dropAbm.selectedIndex === 0)
      {
        const nuevoTerrestre= new Terrestre(0,txtModelo.value,parseInt(txtAnoFab.value),parseInt(txtVelMax.value),
        parseInt(txtCantPue.value),parseInt(txtCantRue.value));
        console.log( nuevoTerrestre);
        console.log(txtCantRue.value);
        if(validaTerrestre( nuevoTerrestre))
        {
          alta( nuevoTerrestre);
          console.log("nuevo Terrestre");
        }
      }
      else if(dropAbm.selectedIndex === 1)
      {
        const nuevoAereo = new Aereo(0,txtModelo.value,parseInt(txtAnoFab.value),parseInt(txtVelMax.value),
        parseFloat(txtAltMax.value),parseFloat(txtAutonomia.value));
        if(validaAereo(nuevoAereo))
        {
          alta(nuevoAereo);
          console.log("nuevo aereo");
        }
      }
      else
      {
        alert("Error al cargar los datos al sistema");
      }
  }
  else if(aceptarDatosButton.value === "Modificar")
  {
    if(dropAbm.selectedIndex === 0)
    {
      const modificadoTerrestre =new Terrestre(0,txtModelo.value,parseInt(txtAnoFab.value),parseInt(txtVelMax.value),
      parseInt(txtCantPue.value),parseInt(txtCantRue.value));
      modificadoTerrestre.setID(parseInt(txtId.value));
      console.log(modificadoTerrestre );
      if(validaTerrestre(modificadoTerrestre ))
      {
        modificar(modificadoTerrestre);
        console.log("modificado terrestre");
      }
    }
    else if(dropAbm.selectedIndex === 1)
    {
        const modAereo = new Aereo(0,txtModelo.value,parseInt(txtAnoFab.value),parseInt(txtVelMax.value),
        parseInt(txtAltMax.value),parseInt(txtAutonomia.value));
        modAereo.setID(parseInt(txtId.value));
        console.log(modAereo);
        if(validaAereo(modAereo))
        {
            modificar(modAereo);
            console.log("modificado aereo");
        }
    }
    else
    {
      alert("Error al cargar los datos al sistema");
    }

  }  
  // Oculta el formulario de ABM y muestra el formulario de datos
  document.getElementById('formAbm').style.display = 'none';
  document.getElementById('formDatos').style.display = 'block';
  resetBotones();
  formAbm.reset();
}

//carga form
function cargarFormTerrestre(listaTerrestre) 
{
    const txtId = document.getElementById('textId');
    const txtModelo = document.getElementById('txtModelo');
    const txtAnoFab = document.getElementById('txtAnoFab');
    const txtVelMax = document.getElementById('txtVelMax');
    const txtCantPue = document.getElementById("txtCantPue");
    const txtCantRue = document.getElementById("txtCantRue");
    const dropAbm = document.getElementById('dropAbm');
    const txtAltMax = document.getElementById("txtAltMax");
    const txtAutonomia = document.getElementById("txtAutonomia");

    dropAbm.selectedIndex = 1;
    dropAbm.setAttribute('disabled','disabled');
    txtAltMax.setAttribute('disabled','disabled');
    txtAutonomia.setAttribute('disabled','disabled');
    txtId.readOnly = true;

    if (txtId && txtModelo && txtAnoFab && txtVelMax && txtCantPue && txtCantRue) 
    {
        txtId.value = listaTerrestre.id;
        txtModelo.value = listaTerrestre.modelo;
        txtAnoFab.value = listaTerrestre.anoFab;
        txtVelMax.value = listaTerrestre.velMax;
        txtCantPue.value = listaTerrestre.cantPue;
        txtCantRue.value = listaTerrestre.cantRue;
    } 
    else 
    {
        console.error('Algunos campos del formulario de ABM no fueron encontrados.');
    }
}
  
function cargarFormAereo(listaAereo)
{
    const txtId = document.getElementById('textId');
    const txtModelo = document.getElementById('txtModelo');
    const txtAnoFab = document.getElementById('txtAnoFab');
    const txtVelMax = document.getElementById('txtVelMax');
    const txtCantPue = document.getElementById("txtCantPue");
    const txtCantRue = document.getElementById("txtCantRue");
    const dropAbm = document.getElementById('dropAbm');
    const txtAltMax = document.getElementById("txtAltMax");
    const txtAutonomia = document.getElementById("txtAutonomia");

    dropAbm.selectedIndex = 1;
    dropAbm.setAttribute('disabled','disabled');
    txtCantPue.setAttribute('disabled','disabled');
    txtCantRue.setAttribute('disabled','disabled');
    txtId.readOnly = true;

    if (txtId && txtModelo && txtAnoFab && txtVelMax && txtAutonomia && txtAltMax) 
    {
        txtId.value = listaAereo.id;
        txtModelo.value = listaAereo.modelo;
        txtAnoFab.value = listaAereo.anoFab;
        txtVelMax.value = listaAereo.velMax;
        txtAutonomia.value = listaAereo.autonomia;
        txtAltMax.value = listaAereo.altMax;
    } 
    else 
    {
        console.error('Algunos campos del formulario de ABM no fueron encontrados.');
    }
}

//evento aceptar y eliminar
aceptarAbmButton.addEventListener('click',handlerAceptar);
eliminarButton.addEventListener('click',handlerBorrar);



function activaBotones() {
  const botonModficar = document.querySelector("input[id='agregar']");
  botonModficar.value = "Modificar";
}

function resetBotones() {
  const botonModficar = document.querySelector("input[id='agregar']");
  //const botonEliminar = document.querySelector("input[name='Eliminar']");
  //botonEliminar.type = "hidden";
  botonModficar.value = "Agregar";
}

//funciones abm
//Funciones ABM 
function alta(nuevoVehiculo)
{
   if(nuevoVehiculo != null)
   {
      lista.push(nuevoVehiculo);
      actualizarStorage("lista",lista);
      actualizarTabla(seccionTabla,lista);
      formAbm.reset();
   }
}

function modificar(editVehiculo) 
{
  if (editVehiculo != null) {
    let index = lista.findIndex((vehiculo) => vehiculo.id == editVehiculo.id);
    lista.splice(index, 1, editVehiculo);
    actualizarStorage("lista",lista);
    actualizarTabla(seccionTabla,lista);
    formAbm.reset();
  }
}

function handlerBorrar(e) 
{
  e.preventDefault();
  const txtId = document.getElementById('textId');
  console.log(txtId.value);
  if(txtId.value)
  {
    let index = lista.findIndex((vehiculo) => vehiculo.id == txtId.value);
    lista.splice(index, 1);
    actualizarStorage("lista", lista);
    actualizarTabla(seccionTabla, lista);
    alert("Persona Eliminada");
    formAbm.reset();
    //formAbm.style.display = 'none';
    formulario.style.display = 'block';
  }
}

