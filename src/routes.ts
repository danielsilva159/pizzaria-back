import { Router, Request, Response } from "express";

import { CreateUserController } from "./controllers/user/createUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAutenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import uploadConfig from "./config/multer";
import multer from "multer";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

//Rotas users
router.post("/users", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
router.get("/me", isAutenticated, new DetailUserController().handle);

//Rotas category
router.post("/category", isAutenticated, new CreateCategoryController().handle);
router.get("/category", isAutenticated, new ListCategoryController().handle);

//Rotas products
router.post(
  "/product",
  isAutenticated,
  upload.single("file"),
  new CreateProductController().handle
);

export { router };
