var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var swaggerJsdoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");
// Importación de rutas
var indexRouter = require("./routes");
var usersRouter = require("./routes/users");
var bicicletasAPIRouter = require("./routes/api/bicicletas");
// Creación de la instancia de Express
var app = express();

// 2. Configuraciones: Configuración del motor de vistas
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// 3. Middleware: Configuración de middleware para manejo de solicitudes
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// favicon
const favicon = require("serve-favicon");
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

// swagger
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Bicicletas API",
      version: "0.1.0",
      description: "API para gestionar bicicletas, usuarios y rutas.",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID del usuario",
            },
            nombre: {
              type: "string",
              description: "Nombre del usuario",
            },
            email: {
              type: "string",
              description: "Email del usuario",
            },
          },
        },
        Bicicleta: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID de la bicicleta",
            },
            nombre: {
              type: "string",
              description: "Nombre de la bicicleta",
            },
            descripcion: {
              type: "string",
              description: "Descripción de la bicicleta",
            },
          },
        },
      },
    },
  },
  apis: ["./routes/api/*.js", "./controllers/api/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// 4. Rutas: Definición de rutas principales
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/bicicletas", bicicletasAPIRouter);

// 5. Manejadores de errores
app.use(function (req, res, next) {
  next(createError(404));
});

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
