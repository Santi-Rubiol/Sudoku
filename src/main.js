const $tablero = document.querySelector(".tablero");

const tableroVirtual_filas = [];
const tableroVirtual_columnas = [];
const tableroVirtual_cuadros = [];

function inicio() {
  crearTablero();
  llenarTableroVirtual();
  llenarTablero();
}

function crearTablero() {
  let indiceCuadro = 0;
  for (let l = 0; l < 3; l++) {
    const $filaCuadro = document.createElement("div");
    $filaCuadro.className = "row";
    for (let k = 0; k < 3; k++) {
      const $cuadro = document.createElement("div");
      $cuadro.id = "cuadro-" + indiceCuadro;
      $cuadro.className = "col-4 cuadro";
      indiceCuadro++;
      for (let i = 0; i < 3; i++) {
        const $fila = document.createElement("div");
        $fila.className = "row f" + (i + l * 3);
        for (let j = 0; j < 3; j++) {
          const $celda = crearCelda();
          $celda.id = "celda-" + (i + l * 3) + "-" + (j + k * 3) + " ";
          $celda.className = "col-4 celda";
          $celda.value = indiceCuadro;
          $fila.appendChild($celda);
        }
        $cuadro.appendChild($fila);
      }
      $filaCuadro.appendChild($cuadro);
    }
    $tablero.appendChild($filaCuadro);
  }
}

function crearCelda() {
  const $celda = document.createElement("input");
  $celda.type = "number";
  $celda.max = 9;
  $celda.min = 1;
  $celda.maxlength = 1;

  $celda.ondblclick = () => {
    if (!$celda.classList.contains("fija")) {
      $celda.value = "";
    }
  };
  $celda.oninput = (e) => {
    const numValids = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const contenidoCelda = e.target.value;
    const ultimoCaracter = contenidoCelda.split("")[contenidoCelda.length - 1];
    let bandera = false
    if (!numValids.includes(Number(contenidoCelda))) {
      if (numValids.includes(Number(ultimoCaracter))) {
        $celda.value = ultimoCaracter;
        bandera = true
      } else {
        $celda.value = "";
      }
    } else {
      bandera = true
    }
    if(bandera){
      verRepetido($celda)
      comprobarSolucion()
    }
  };
  return $celda;
}

function posicionCelda($celda) {
  let fila =
    $celda.parentNode.className.split("")[
      $celda.parentNode.className.length - 1
    ];
  let columna = $celda.id.split("")[$celda.id.length - 2];
  let cuadro =
    $celda.parentNode.parentNode.id.split("")[
      $celda.parentNode.parentNode.id.length - 1
    ];

  return [fila, columna, cuadro];
}

function verRepetido($celda) {
  const posiciones = posicionCelda($celda);
  if (
    recorrerFila(posiciones[0]) ||
    recorrerColumna(posiciones[1]) ||
    recorrerCuadro(posiciones[2])
  ) {
    $celda.classList.add("numero-repetido");
  } else {
    $celda.classList.remove("numero-repetido");
  }
}

function recorrerFila(indice) {
  return hayRepetidos(tableroVirtual_filas[indice]);
}

function recorrerColumna(indice) {
  return hayRepetidos(tableroVirtual_columnas[indice]);
}

function recorrerCuadro(indice) {
  return hayRepetidos(tableroVirtual_cuadros[indice]);
}

function hayRepetidos(lista) {
  //Comprueba elementos repetidos de una lista
  const elementosUnicos = new Set();
  for (const elemento of lista) {
    if (elemento.value !== "") {
      if (elementosUnicos.has(elemento.value)) {
        return true;
      }
      elementosUnicos.add(elemento.value);
    }
  }
  return false;
}
/* const sudokuResuelto = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
  ]; */

function llenarTableroVirtual() {
  const $celdas = document.querySelectorAll(".celda");
  for (let i = 0; i < 9; i++) {
    let re = new RegExp("-" + i + "-");
    let lista = [];
    $celdas.forEach(($cel) => {
      if ($cel.id.search(re) === 5) {
        lista.push($cel);
      }
    });
    tableroVirtual_filas.push(lista);
  }

  for (let i = 0; i < 9; i++) {
    const col = [];
    for (let j = 0; j < 9; j++) {
      col.push(tableroVirtual_filas[j][i]);
    }
    tableroVirtual_columnas[i] = col;
  }
  let contador = 0;
  for (let i = 0; i < 9; i++) {
    let lista = [];
    for (let j = 0; j < 9; j++) {
      lista.push($celdas[contador]);
      contador++;
    }
    tableroVirtual_cuadros.push(lista);
  }
}

function llenarTablero() {
  const sudokuSinResolver = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ];

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (sudokuSinResolver[i][j] != 0) {
        tableroVirtual_filas[i][j].value = sudokuSinResolver[i][j];
        tableroVirtual_filas[i][j].classList.add("fija");
        tableroVirtual_filas[i][j].disabled = true;
      } else {
        tableroVirtual_filas[i][j].value = "";
      }
    }
  }
}

function limitarCaracteres($celdaActual) {
  console.log("Entra");
  if ($celdaActual.value.length > $celdaActual.maxLength) {
    $celdaActual.value = $celdaActual.value.slice(0, $celdaActual.maxLength);
  }
}

function comprobarSolucion(){
  const $celdas = document.querySelectorAll(".celda");
  let band = true
  $celdas.forEach(($celda) => {
    if($celda.value === "" || $celda.classList.contains("numero-repetido")){
      band = false
    }
  })
  if(band){
    $tablero.hidden = true
    document.querySelector(".lbl-win").hidden = false
  }
}

inicio();
