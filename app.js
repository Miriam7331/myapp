// 1. Instancias: Importación de módulos y creación de la instancia de la aplicación
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// Importación de rutas
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
// Creación de la instancia de Express
var app = express();
// 2. Configuraciones: Configuración del motor de vistas
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// 3. Middleware: Configuración de middleware para manejo de solicitudes
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//favicon
const favicon = require("serve-favicon");
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
// 4. Rutas: Definición de rutas principales
app.use("/", indexRouter);
app.use("/users", usersRouter);
// 5. Manejadores de errores
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// 6. Arranque del servidor o exportación del servidor
module.exports = app;
