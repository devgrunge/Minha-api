const { Router } = require("express");
const LoginController = require("./app/Controllers/LoginController");
const AuthMidlleware = require("./app/Midlewares/AuthMidleware");
const UserController = require("./app/Controllers/UserController");

const routes = new Router();

routes.post("/user", UserController.store);
routes.get("/user", AuthMidlleware, UserController.show);
routes.post("/login", LoginController.index);

module.exports = routes;
