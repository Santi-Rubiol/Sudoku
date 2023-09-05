const $tablero = document.querySelector(".tablero");

function inicio() {
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
          $celda.value = indiceCuadro

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
  const $celdas = document.querySelectorAll(".celda");
  let re = new RegExp("-" + indice + "-");
  let lista = []
  $celdas.forEach(($cel) => {
    if ($cel.id.search(re) === 5) {
      lista.push($cel.value)
    }
  });
  return lista
}

function recorrerColumna(indice) {
  const $celdas = document.querySelectorAll(".celda");
  let re = new RegExp("-" + indice + " ");
  let lista = []
  $celdas.forEach(($cel) => {
    if ($cel.id.search(re) === 7) {
      lista.push($cel.value)
    }
  });
  return lista
}

function recorrerCuadro(indice) {
  const $cuadros = document.querySelectorAll(".cuadro");
  let lista = []
  $cuadros.forEach((c) => {
    if (c.id === "cuadro-" + indice) {
      const $celdas = c.querySelectorAll(".celda");
      $celdas.forEach(($cel) => {
        lista.push($cel.value)
      });
    }
  });
  return lista
}

function comprobarRepetidos(lista){
  const elementosVistos = {};

  for (const elemento of lista) {
    if (elementosVistos[elemento]) {
      console.log(`Elemento repetido: ${elemento}`);
      return false;
    }
    elementosVistos[elemento] = true;
  }
  return true;
}




inicio();

