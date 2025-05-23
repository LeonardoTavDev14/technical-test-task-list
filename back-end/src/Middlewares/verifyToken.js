import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/errorResponse.js";
import "dotenv/config";

const verifyToken = (request, response, next) => {
  const authHeader = request.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return errorResponse(response, 403, "Token não encontrado ou formato");
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return errorResponse(response, 401, "Token inválido ou expirado");
      }

      request.userId = decoded.userId;
      next();
    });
  } catch (err) {
    console.error("Erro ao verificar o token ", err.message);
    return errorResponse(response, 500, "Falha ao verificar o token");
  }
};

export { verifyToken };
