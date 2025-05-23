import { prisma } from "../loaders/db.js";
import { errorResponse } from "../utils/errorResponse.js";
import { comparePassword, passwordHash } from "../service/hashPassword.js";
import jwt from "jsonwebtoken";
import "dotenv/config.js";

class UsersControllers {
  async createUser(request, response) {
    try {
      const { email, password } = request.body;

      const userAlreadyExists = await prisma.user.findUnique({
        where: { email },
      });

      if (userAlreadyExists) {
        return errorResponse(response, 400, "Este e-mail já foi cadastrado");
      }

      const hashedPassword = await passwordHash(password);

      await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      return response.status(201).json({
        message: "Sua conta foi criada com sucesso!",
      });
    } catch (err) {
      console.error("Erro ao cadastrar usuário ", err.message);
      return errorResponse(response, 500, "Falha ao realizar requisição");
    }
  }

  async login(request, response) {
    try {
      const { email, password } = request.body;

      const userAlreadyExists = await prisma.user.findUnique({
        where: { email },
      });

      if (!userAlreadyExists) {
        return errorResponse(response, 400, "E-mail ou senha incorretos!");
      }

      const isValidPassword = await comparePassword(
        password,
        userAlreadyExists.password
      );

      if (!isValidPassword) {
        return errorResponse(response, 400, "E-mail ou senha incorretos!");
      }

      const token = jwt.sign(
        { userId: userAlreadyExists.id },
        process.env.SECRET_KEY,
        {
          expiresIn: "7d",
        }
      );

      return response
        .status(200)
        .json({ token, message: "Você foi logado com sucesso!" });
    } catch (err) {
      console.error("Erro ao logar com o usuário ", err.message);
      return errorResponse(response, 500, "Falha ao realizar requisição");
    }
  }
}

export default new UsersControllers();
