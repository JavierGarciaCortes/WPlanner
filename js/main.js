window.onload = inicio;
var fondos = ["Amigos","AccesoriosNovia","Boda","Casa","Coche","Catering","Compra","Flores","Decoracion", "Musica","DetallesBoda","Viaje","Familia","Vino"];
var a = 0;
var b = 0;
var c = 0;
var h;
var num, prev;
var nombres = [];
var elementos = [];

function inicio() {
    fondoslist();
    document.getElementById("botonadd").onclick = addlista;
    inicio_list();
    document.getElementById("ourlistas").onchange = choselist;
}
/* Crea caja de lista y le pone nombre */
function addlista() {
    nombre = document.getElementById("nombre").value.trim();
    nombre = capital(nombre);
    crearlista(nombre);
}

function crearlista(nombre) {
    nombres.push(nombre);
    addnombresst();
    addcajas(a);
    document.getElementById("nombre").value = "";
    document.getElementById(`elemento${a}`).focus();
    if (fondos.indexOf(nombre) >= 0) {
        document.getElementById(`listacompra${a}`).style.backgroundImage = `url(img/${nombre}.jpg)`;
    }
    a++;
}

function addcajas(k) {
    document.getElementById("caja").innerHTML += `<div id="cajalista${k}" class="cajalista"><div class="cajanom" id="cajanom${k}"></div><div id="cajaadd"><input id="elemento${k}" class="elemento" type="text" placeholder="Añadir elemento lista"/><div id="boton${k}" class="boton" onclick="numeroid(this)">➕</div></div><div id="listacompra${k}" class="listacompra" onkeydown="teclado2(this)"></div></div>`;
    document.getElementById(`cajanom${k}`).innerHTML = `<div id="elimlist" onclick="elimlist(this)">♻️</div><div id="titulo">${nombres[k]}</div>`;
    elementos.push([]);
}
/* Añade elemento a la lista */
function numeroid(leerboton) {
    x = leerboton.getAttribute("id").substring(5);
    leer(x);
}

function leer(x) {
    elemento = document.getElementById(`elemento${x}`).value.trim();
    elemento = capital(elemento);
    if (elemento.length > 0 && elemento != "Añadir elemento lista") {
        if (elementos[x].indexOf(elemento) == -1) {
            document.getElementById(`listacompra${x}`).innerHTML += `<div id="linea${b}" class="linea"><div id="producto">${elemento}</div><div id="b${b}" class="botoneliminar" onclick="eliminar(this)">🗑️</div></div>`;
            b++;
            elementos[x].push(elemento);
            addelementosst(x);
            document.getElementById(`elemento${x}`).focus();
            document.getElementById(`elemento${x}`).value = "";
            document.getElementById(`elemento${x}`).scrollTop = 5000;
        } else {
            document.getElementById(`elemento${x}`).focus();
            document.getElementById(`elemento${x}`).value = "";
        }
    } else {
        document.getElementById(`elemento${x}`).focus();
    }
}
/* Elimina elemento de la lista */
function eliminar(basura) {
    x = basura.parentNode.parentNode.getAttribute("id").substring(11);
    index = basura.getAttribute("id").substring(1);
    previ = basura.previousSibling.innerHTML;
    num = elementos[x].indexOf(previ);
    elementos[x].splice(num, 1);
    addelementosst(x);
    document.getElementById(`elemento${x}`).focus();
    basura.parentNode.remove();
}
/* Devuelve la primera letra de un string en mayuscula */
function capital(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
/* Lista de fondos*/
function fondoslist() { //////////////////////////////////////////////////////////////////////////////////
    for (k = 0; k < fondos.length; k++) {
        document.getElementById("ourlistas").innerHTML += `<option>${fondos[k]}</option>`;
        //onclick="nomlistcaj(this)";
    }
}

function choselist() {
    tipo_selecionado = document.getElementById("ourlistas").value;
    if (tipo_selecionado != "Elije una de nuestras listas") {
        crearlista(tipo_selecionado);
        document.getElementById("ourlistas").value = "Elije una de nuestras listas";
    }
}
// Al hacer click pone nombre y foto de fondo en lista
function nomlistcaj(e) {
    indice = Number(e.getAttribute("id").substr(1));
    crearlista(fondos[indice]);
}
// Al entrar carga los datos guardados
function inicio_list() {
    var x = localStorage.getItem("nombres_st");
    if (x != null && nombre != undefined) {
        nombres = x.split("/#/");
        for (k = 0; k < nombres.length; k++) {
            addcajas(k);
            a++;
            var x1 = localStorage.getItem(`elementos_st${k}`);
            if (x1 != null && elementos[k] != undefined && elementos[k][0] != "") {
                elementos[k] = x1.split("/#/");
                for (r = 0; r < elementos[k].length; r++) {
                    document.getElementById(`listacompra${k}`).innerHTML += `<div id="linea${c}" class="linea"><div id="producto">${elementos[k][r]}</div><div id="b${c}" class="botoneliminar" onclick="eliminar(this)">🗑️</div></div>`;
                    c++;
                }
            }
            if (fondos.indexOf(nombres[k]) >= 0) {
                document.getElementById(`listacompra${k}`).style.backgroundImage = `url(img/${nombres[k]}.jpg)`;
            }
        }
    }
}
// Elimina lista completa
function elimlist(e) {
    let x = Number(e.parentNode.getAttribute("id").substring(7));
    nombres.splice(x, 1);
    elementos.splice(x, 1);
    localStorage.removeItem(`elementos_st${x}`);
    addnombresst();
    e.parentNode.parentNode.remove();
    if (x <= nombres.length) {
        for (g = 0; g < elementos.length; g++) {
            localStorage.removeItem(`elementos_st${g}`);
            addelementosst(g);
        }
    }
    a = 0;
    document.getElementById("caja").innerHTML = ``;
    inicio_list();
}

function addnombresst() {
    let z = nombres.join("/#/");
    localStorage.setItem(`nombres_st`, z);
    if (nombres == 0) {
        localStorage.removeItem(`nombres_st`);
    }
}

function addelementosst(x) {
    let z = elementos[x].join("/#/");
    localStorage.setItem(`elementos_st${x}`, z);
    if (elementos[x] == 0) {
        localStorage.removeItem(`elementos_st${x}`);
    }
}
