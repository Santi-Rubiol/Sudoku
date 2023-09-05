const $tablero = document.querySelector(".tablero");

const tableroVirtual = [];
const tableroVirtual_Cuadros = [];

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
        $fila.className = "row";
        for (let j = 0; j < 3; j++) {
          const $celda = document.createElement("input");
          $celda.id = "celda-" + (i + l * 3) + "-" + (j + k * 3) + " ";
          $celda.className = "col-4 celda";

          //$celda.value = i + l * 3 + " " + (j + k * 3);
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

function recorrerFila(indice) {
  comprobarRepetidos(tableroVirtual[indice]);
}

function recorrerColumna(indice) {
  let lista = [];
  for (let i = 0; i < 9; i++) {
    lista.push(tableroVirtual[indice][i]);
  }
  comprobarRepetidos(lista);
}

function recorrerCuadro(indice) {
  const $cuadros = document.querySelectorAll(".cuadro");
  let lista = [];
  $cuadros.forEach((c) => {
    if (c.id === "cuadro-" + indice) {
      const $celdas = c.querySelectorAll(".celda");
      $celdas.forEach(($cel) => {
        lista.push($cel.value);
      });
    }
  });
  return lista;
}

function comprobarRepetidos(lista) {
  const valoresVistos = {};
  const valoresRepetidos = [];
  const elementosRepetidos = [];

  for (const elemento of lista) {
    //elemento.classList.remove("numeroRepetido");
    if (valoresVistos[elemento.value]) {
      if (!valoresRepetidos.includes(elemento.value)) {
        console.log(elemento.value);
        valoresRepetidos.push(elemento.value);
        elemento.classList.add("numeroRepetido");

        //elementosRepetidos.push(elemento);
      }
    } else {
      valoresVistos[elemento.value] = true;
    }
  }

  if (valoresRepetidos.length > 0) {
    console.log("Elementos repetidos:", valoresRepetidos.join(", "));
    return true;
  } else {
    console.log("No hay elementos repetidos en la lista.");
    return false;
  }
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
    tableroVirtual.push(lista);
  }
  let contador = 0;
  for (let i = 0; i < 9; i++) {
    let lista = [];
    for (let j = 0; j < 9; j++) {
      lista.push($celdas[contador]);
      contador++;
    }
    tableroVirtual_Cuadros.push(lista);
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
    for(let j=0;j<9;j++){
      if(sudokuSinResolver[i][j] != 0){
        tableroVirtual[i][j].value = sudokuSinResolver[i][j]
        tableroVirtual[i][j].classList.add("fija")
      }else{
        tableroVirtual[i][j].value = ""
      }

    }
  }

}

inicio();
//recorrerFila(3);
