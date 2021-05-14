const express = require("express");
const app = express();
const date = require(__dirname + "/modules/date.js");     //direccion del archivo js que hace de modulo de node. Al requereir se corre una vez el contenido del módulo.

app.use(express.urlencoded());
app.use(express.static("public"));                        //carpeta, que podemos llamar com oqueramos, pero donde se guardan los archivos estáticos a utilizar en la web(.css, .js a nivel de navegador, imgs...)

app.set('view engine', 'ejs');                            //carfgamos el motor de renderizado de js que nos permite cambiar el codigo html desde el servidor

const items = [];                                         //array de tareas para el día
const workItems = [];                                     //array de tareas para el trabajo
const day = date.getDate("en-US");                        //uno de los metodos del modulo date, que nos devuelve el día y mes escritos, y el numero del día

app.get("/", function(req, res) {                         //Cuando get en home, renderizamos el ejs de lista, con las varivales listTitle y items para trabajr con ellas.
                                                          //En el segund oaergumento las especificamos
  res.render('list', {                                    //Renderizamos el mismo archiuvo.ejs, y según el titlulo diferenciamos al comnputar
    listTitle: day,
    items: items
  });
});

app.get("/Work", function(req, res) {                     //Lo mismo para la tura /Work, solo que ahora enviamos el array de trabajo y el título correspondiente
  res.render("list", {
    listTitle: "WorkList",                                //Este títul se usa para asignar valores en el .ejs, y posteriormente diferenciar entre las listas
    items: workItems
  })
})


app.post("/", function(req, res) {
  let item = req.body.toDoAction;                         //el input del usuarillo en la casilla de añadir
  let typeList = req.body.list;                           //el valor asignado al botón de añadir, que es el titulo de la lista, para diferenciar
  let delBtn = req.body.del;                              //el botón de borrar, cuyo valor es el índice en el array corerspondiente, para borrarlo

 //$$$$$$$$$$$$$$$$$$$$$//
 //Para añadir elementos//
 //$$$$$$$$$$$$$$$$$$$$$//

  if (typeList === "WorkList") {                         //Según el titulo de la lista, añadimos el objeto a un array otro, este array es el que se renderiza según la página.
    if (item) {
      workItems.push(item);
      res.redirect("/Work");                             //Y redirigimos a la página correspondiente para recargar y vere el nuevo contenido
    }

  } else if (typeList === day) {
    if (item != "" && item != undefined) {
      items.push(item);
      res.redirect("/");
    }
  }

  //$$$$$$$$$$$$$$$$$$$$$//
  //Para borrar elementos//
  //$$$$$$$$$$$$$$$$$$$$$//

  if (delBtn) {                                         //Si la post la activa el boton de borrar...

    let delIdx = Number(delBtn);                        //El valor del botón, que es el índice del item pulsado
    let page = req.body.delPage;                        //El valor de un input invisible dentro de la form del post, que guarda el titulo de la página

    if (page === "WorkList") {                          //Según el título, borra esl item con ese índice de larray correspondiente.
      workItems.splice(delIdx, 1);
      res.redirect("/Work");                            //Redirige a su página para recargarla y cargar el nuevo contenido
    } else if(page === day){
      items.splice(delIdx, 1);
      res.redirect("/");
    }

  };



});

app.listen(3000, function() {
  console.log("Server started on port 3000")
});
