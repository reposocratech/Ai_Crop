
const obtenerNumeroAleatorio = (min, max) => {
    return parseInt(Math.random() * ((max + 1) - min) + min);
  }

let letras = ["C","G","K","M","O","E","Q","S","I","U","W","A","Y","x","d","l","h","z","j","n","r","f","b","t","v","p"];

const obtenerLetraAleatoria = () => {
  let m = obtenerNumeroAleatorio(0, 26);
  let res = letras[m];

  return res ;
}

const randomPasswordGenerator = () => {
  let res = "";
  res += obtenerLetraAleatoria();
  res += obtenerNumeroAleatorio(0,9);
  res += obtenerLetraAleatoria();
  res += obtenerNumeroAleatorio(0,9);
  res += '-';
  res += obtenerLetraAleatoria();
  res += obtenerNumeroAleatorio(0,9);
  res += obtenerLetraAleatoria();
  res += '_';
  res += obtenerNumeroAleatorio(0,9);
  let res2 = res.replace("undefined", "!");
  return res2;
}

module.exports = randomPasswordGenerator;

