import readline from "readline";
import {
  agregarNotas,
  eliminarNota,
  listarNotas,
  editarNotas,
  leerNotas,
} from "./utiles/notas.js";
import chalk from "chalk";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//Funcion mostrar menu
const mostrarMenu = () => {
  console.log(`
  Seleccione una opción:
  1. Agregar una nueva nota
  2. Eliminar una nota
  3. Lista de notas
  4. Leer una nota
  5. Modificar una nota
  6. Salir
  `);
  rl.question("Ingrese una opcion: ", (opcion) => {
    switch (opcion) {
      case "1":
        rl.question("Titulo de la nota: ", (title) => {
          rl.question("Cuerpo de la nota: ", (body) => {
            agregarNotas(title, body);
            mostrarMenu();
          });
        });
        break;
      case "2":
        rl.question("Titulo de la nota a eliminar: ", (title) => {
          eliminarNota(title);
          mostrarMenu();
        });
        break;
      case "3":
        listarNotas();
        mostrarMenu();
        break;
      case "4":
        rl.question("Titulo de la nota: ", (title) => {
          leerNotas(title);
          mostrarMenu();
        });
        break;
      case "5":
        rl.question("Titulo de la nota a modificar: ", (title) => {
          rl.question("Nuevo contenido de la nota: ", (body) => {
            editarNotas(title, body);
            mostrarMenu();
          });
        });
        break;
      case "6":
        rl.close();
        break;
      default:
        console.log(chalk.inverse("Opcion no valida. Ingrese otra opcion"));
        mostrarMenu();
        break;
    }
  });
};
mostrarMenu();
