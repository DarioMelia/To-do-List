

//Lo que añadamos en estos exports, es a lo que podemos acceder desde app.js, una vez requerido este módulo.

exports.getDate = function(lang) {                                        //función anonima que asignamos al objeto exports, en su key GetDate, o como quisieramos llamarlo
  const today = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  return today.toLocaleDateString(lang, options);
};

exports.weekday = function(lang) {                                         //lo mismo con weekday
  const today = new Date();
  const options = {
    weekday: "long",
  };
  return today.toLocaleDateString(lang, options);
};
