import { prisma } from "../loaders/db.js";
import { errorResponse } from "../utils/errorResponse.js";

class TaskControllers {
  async createTask(request, response) {
    try {
      const { title, description } = request.body;

      await prisma.task.create({
        data: {
          title,
          description,
          done: false,
          userId: request.userId,
        },
      });

      return response
        .status(201)
        .json({ message: "Tarefa criada com sucesso!" });
    } catch (err) {
      console.error("Erro ao cadastrar tarefa ", err.message);
      return errorResponse(response, 500, "Falha ao realizar requisição");
    }
  }

  async listTasks(request, response) {
    try {
      const tasks = await prisma.task.findMany({
        where: { userId: request.userId },
      });

      if (!tasks.length) {
        return errorResponse(response, 404, "Nenhuma tarefa encontrada");
      }

      return response.status(200).json(tasks);
    } catch (err) {
      console.error("Erro ao listar tarefas ", err.message);
      return errorResponse(response, 500, "Falha ao realizar requisição");
    }
  }

  async updateTasks(request, response) {
    try {
      const { id } = request.params;
      const { title, description, done } = request.body;
      const userId = request.userId;

      const taskUpdated = await prisma.task.findUnique({
        where: { id },
      });

      if (!taskUpdated) {
        return errorResponse(response, 404, "Tarefa não encontrada");
      }

      if (taskUpdated.userId !== userId) {
        return errorResponse(
          response,
          403,
          "Você não tem permissão para editar esta tarefa"
        );
      }

      await prisma.task.update({
        where: { id },
        data: {
          title,
          description,
          done,
        },
      });

      return response
        .status(200)
        .json({ message: "Tarefa atualizada com sucesso!" });
    } catch (err) {
      console.error("Erro ao atualizar tarefa ", err.message);
      return errorResponse(response, 500, "Falha ao realizar requisição");
    }
  }

  async deleteTasks(request, response) {
    try {
      const { id } = request.params;
      const userId = request.userId;

      const taskDeleted = await prisma.task.findUnique({
        where: { id },
      });

      if (!taskDeleted) {
        return errorResponse(response, 404, "Tarefa não encontrada");
      }

      if (taskDeleted.userId !== userId) {
        return errorResponse(
          response,
          403,
          "Você não tem permissão para deletar esta tarefa"
        );
      }

      await prisma.task.delete({
        where: { id },
      });

      return response.status(200).json({
        message: "Tarefa deletada com sucesso!",
      });
    } catch (err) {
      console.error("Erro ao deletar tarefa ", err.message);
      return errorResponse(response, 500, "Falha ao realizar requisição");
    }
  }
}

export default new TaskControllers();
