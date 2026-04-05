import { zonas, condiciones, departamentos, municipios } from './datosPredial.js';

// Posiciones
const cajas = [
    { nombre:"Departamento", inicio:0, fin:2 },
    { nombre:"Municipio", inicio:2, fin:5 },
    { nombre:"Zona U/R", inicio:5, fin:7 },
    { nombre:"Sector", inicio:7, fin:9 },
    { nombre:"Comuna", inicio:9, fin:11 },
    { nombre:"Barrio", inicio:11, fin:13 },
    { nombre:"Vereda/Manzana", inicio:13, fin:17 },
    { nombre:"Terreno", inicio:17, fin:21 },
    { nombre:"Condición", inicio:21, fin:22 },
    { nombre:"Nº Edificio", inicio:22, fin:24 },
    { nombre:"Nº Piso", inicio:24, fin:26 },
    { nombre:"Unidad Predial", inicio:26, fin:30 }
];

// función analizar (igual que la tuya)
function analizar() {
    ...
}

// evento
document.getElementById("codigo").addEventListener("input", analizar);
