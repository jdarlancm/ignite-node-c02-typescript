import { Router } from "express";
import multer from "multer";
import { CreateUserController } from "../../../../modules/accounts/useCase/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../../../../modules/accounts/useCase/updateUserAvatar/UpdateUserAvatarController";

import uploadConfig from "../../../../config/upload";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";


const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserControle = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUserControle.handle);

usersRoutes.patch("/avatar", ensureAuthenticated, uploadAvatar.single("avatar"), updateUserAvatarController.handle);

export { usersRoutes };