import { Router } from "express";
import UsersControllers from "./controllers/UsersControllers.js";
import TasksControllers from "./controllers/TasksControllers.js";
import { verifyToken } from "./Middlewares/verifyToken.js";

const routes = Router();

routes.post("/register", UsersControllers.createUser);
routes.post("/login", UsersControllers.login);

routes.post("/tasks", verifyToken, TasksControllers.createTask);
routes.delete("/tasks/:id", verifyToken, TasksControllers.deleteTasks);
routes.get("/tasks", verifyToken, TasksControllers.listTasks);
routes.put("/tasks/:id", verifyToken, TasksControllers.updateTasks);

export { routes };
