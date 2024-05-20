import fs from "fs";
import chalk from "chalk";

const cargarNotas = () => {
  try {
    const dataBuffer = fs.readFileSync("notas.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const guardarNotas = (notas) => {
  const dataJSON = JSON.stringify(notas);
  fs.writeFileSync("notas.json", dataJSON);
};

const agregarNotas = (title, body) => {
  const notas = cargarNotas();
  const duplicateNote = notas.find((note) => note.title === title);

  if (!duplicateNote) {
    notas.push({ title, body });
    guardarNotas(notas);
    console.log(chalk.green.inverse("La nota fue agregada con exito"));
  } else {
    console.log(chalk.red.inverse("La nota no fue agregada"));
  }
};

const eliminarNota = (title) => {
  const notas = cargarNotas();
  const notesToKeep = notas.filter((note) => note.title !== title);

  if (notas.length > notesToKeep.length) {
    guardarNotas(notesToKeep);
    console.log(chalk.green.inverse("Nota eliminada con exito"));
  } else {
    console.log(chalk.red.inverse("No se encontro una nota con ese titulo"));
  }
};

const listarNotas = () => {
  const notas = cargarNotas();
  console.log(chalk.green.inverse("Tus notas"));
  notas.forEach((note) => {
    console.log(note.title);
  });
};

const leerNotas = (title) => {
  const notas = cargarNotas();
  const note = notas.find((note) => note.title === title);

  if (note) {
    console.log(chalk.inverse(note.title));
    console.log(chalk.blue(note.body));
  } else {
    console.log("Nota no encontrada");
  }
};

const editarNotas = (title, nuevaNota) => {
  const notas = cargarNotas();
  const note = notas.find((note) => note.title === title);
  if (note) {
    note.body = nuevaNota;
    guardarNotas(notas);
    console.log(chalk.green.inverse("La nota fue modificada con exito"));
  } else {
    console.log(chalk.red.inverse("La nota no fue encontrada"));
  }
};

export { agregarNotas, eliminarNota, listarNotas, leerNotas, editarNotas };
