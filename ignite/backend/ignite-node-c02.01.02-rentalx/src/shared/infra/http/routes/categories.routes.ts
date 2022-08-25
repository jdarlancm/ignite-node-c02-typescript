import { Router } from "express";
import multer from "multer";
import { CreateCategoryController } from "../../../../modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "../../../../modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "../../../../modules/cars/useCases/listCategories/ListCategoriesController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";


const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

//Route
categoriesRoutes.post("/", ensureAuthenticated, ensureAdmin, createCategoryController.handle);

//Route
categoriesRoutes.get("/", listCategoriesController.handle);

//Route
categoriesRoutes.post("/import", upload.single("file"), ensureAuthenticated, ensureAdmin, importCategoryController.handle);

export { categoriesRoutes };