import { zonas, condiciones, departamentos, municipios } from './datosPredial.js';

// =============================
// CONFIGURACIÓN DE CAJAS
// =============================
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

// =============================
// FUNCIÓN PRINCIPAL
// =============================
function analizar() {

    const codigo = document.getElementById("codigo").value.trim();
    const error = document.getElementById("error");
    const boxes = document.getElementById("boxes");
    const tbody = document.getElementById("resultado");
    const cardTabla = document.getElementById("cardTabla");
    const titulo = document.getElementById("resultadoTitulo");

    // Limpiar UI
    boxes.innerHTML = "";
    error.textContent = "";
    tbody.innerHTML = "";
    cardTabla.style.display = "none";
    titulo.style.display = "none";

    // Validación
    if (!codigo) return;

    if (!/^\d{30}$/.test(codigo)) {
        error.textContent = "Debe ingresar exactamente 30 dígitos numéricos";
        return;
    }

    titulo.style.display = "block";

    // =============================
    // EXTRAER PARTES
    // =============================
    const partes = {};

    cajas.forEach(c => {
        partes[c.nombre] = codigo.substring(c.inicio, c.fin);
    });

    const depCodigo = partes["Departamento"];
    const munCodigo = partes["Municipio"];
    const codigoMunCompleto = depCodigo + munCodigo;

    // =============================
    // CREAR CAJAS VISUALES
    // =============================
    cajas.forEach(c => {

        const valor = partes[c.nombre];
        const box = document.createElement("div");

        let descripcion = "";
        let clases = "box";

        switch(c.nombre) {

            case "Departamento":
                descripcion = departamentos[valor] || "Sin información";
                break;

            case "Municipio":
                descripcion = municipios[codigoMunCompleto] || "Sin información";
                if (!municipios[codigoMunCompleto]) {
                    box.style.border = "2px solid red";
                }
                break;

            case "Zona U/R":
                descripcion = zonas[valor] || "Sin información";
                clases += " " + (valor === "00" ? "zona-rural-box" : "zona-urbana-box");
                break;

            case "Condición":
                descripcion = condiciones[valor] || "Sin información";
                if (valor === "8" || valor === "9") {
                    clases += " condicion-chip";
                }
                break;

            default:
                descripcion = "";
        }

        // Tooltip solo si hay descripción
        if (descripcion) {
            clases += " tooltipped";
            box.setAttribute("data-position", "top");
            box.setAttribute("data-tooltip", descripcion);
        }

        box.className = clases;

        // Copiar valor al hacer clic
        box.addEventListener("click", () => {
            navigator.clipboard.writeText(valor);
        });

        box.innerHTML = `
            <span>${valor}</span>
            <div class="box-label">${c.nombre}</div>
        `;

        boxes.appendChild(box);
    });

    // =============================
    // REINICIAR TOOLTIPS
    // =============================
    const elems = document.querySelectorAll('.tooltipped');

    elems.forEach(el => {
        if (el.M_Tooltip) el.M_Tooltip.destroy();
    });

    M.Tooltip.init(elems);

    // =============================
    // TABLA DE RESULTADOS
    // =============================
    const res = {
        "Departamento": {
            valor: depCodigo,
            descripcion: departamentos[depCodigo]
        },
        "Municipio": {
            valor: munCodigo,
            descripcion: municipios[codigoMunCompleto]
        },
        "Zona U/R": {
            valor: partes["Zona U/R"],
            descripcion: zonas[partes["Zona U/R"]]
        },
        "Sector": {
            valor: partes["Sector"]
        },
        "Comuna": {
            valor: partes["Comuna"]
        },
        "Barrio": {
            valor: partes["Barrio"]
        },
        "Vereda/Manzana": {
            valor: partes["Vereda/Manzana"]
        },
        "Terreno": {
            valor: partes["Terreno"]
        },
        "Condición": {
            valor: partes["Condición"],
            descripcion: condiciones[partes["Condición"]]
        },
        "Nº Edificio": {
            valor: partes["Nº Edificio"]
        },
        "Nº Piso": {
            valor: partes["Nº Piso"]
        },
        "Unidad Predial": {
            valor: partes["Unidad Predial"]
        }
    };

    for (let campo in res) {
        const { valor, descripcion } = res[campo];

        tbody.innerHTML += `
            <tr>
                <td class="label">${campo}</td>
                <td>
                    ${valor} ${descripcion ? ' - ' + descripcion : ' - Sin información'}
                </td>
            </tr>
        `;
    }

    cardTabla.style.display = "block";
}

// =============================
// EVENTO INPUT
// =============================
document.getElementById("codigo")
    .addEventListener("input", analizar);
