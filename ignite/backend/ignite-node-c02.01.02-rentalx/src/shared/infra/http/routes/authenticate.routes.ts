import { Router } from "express";

import { AuthenticateUserController } from "../../../../modules/accounts/useCase/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "../../../../modules/accounts/useCase/refreshToken/RefreshTokenController";

const authenticateRoutes = Router();

const authenticateUserControler = new AuthenticateUserController();
const refreshTokenUserControler = new RefreshTokenController();

authenticateRoutes.post("/sessions", authenticateUserControler.handle);
authenticateRoutes.post("/refresh-token", refreshTokenUserControler.handle);

export { authenticateRoutes }