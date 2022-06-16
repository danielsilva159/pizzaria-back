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
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrdersController } from "./controllers/order/ListOrdersController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderControler } from "./controllers/order/FinishOrderControler";

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
router.get(
  "category/product",
  isAutenticated,
  new ListByCategoryController().handle
);

//Rotas order
router.post("/order", isAutenticated, new CreateOrderController().handle);
router.delete("/order", isAutenticated, new RemoveOrderController().handle);
router.post("/order/add", isAutenticated, new AddItemController().handle);
router.delete(
  "/order/remove",
  isAutenticated,
  new RemoveItemController().handle
);
router.put("/order/send", isAutenticated, new SendOrderController().handle);
router.get("/orders", isAutenticated, new ListOrdersController().handle);
router.get("/order/detail", isAutenticated, new DetailOrderController().handle);
router.put("/order/finish", isAutenticated, new FinishOrderControler().handle);

export { router };
