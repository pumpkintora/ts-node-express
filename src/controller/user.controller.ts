import { Request, Response, NextFunction } from "express";
import UserService from "../service/user.service";

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userService = new UserService();
    const newUser = await userService.createUser(req.body)
    res.send(newUser)
}

