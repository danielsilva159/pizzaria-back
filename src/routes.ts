import { Router, Request, Response } from "express";

import { CreateUserController } from "./controllers/user/createUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAutenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";

const router = Router();

//Rotas users
router.post("/users", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
router.get("/me", isAutenticated, new DetailUserController().handle);

//Rotas category
router.post("/category", isAutenticated, new CreateCategoryController().handle);

export { router };
