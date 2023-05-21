const Role = require("../models/Role");
const userService = require("../service/user-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }
      const { email, password, name, role } = req.body;

      const userData = await userService.registration(
        email,
        password,
        name,
        role
      );

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        domain:
          process.env.NODE_ENV === "production"
            ? "naks-donbass.ru"
            : "localhost",
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res) {
    try {
      const { id, email, name, role } = req.body;
      const userData = await userService.update(id, email, name, role);

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async updatePassword(req, res) {
    try {
      const { id, oldPassword, newPassword } = req.body;
      const userData = await userService.updatePassword(
        id,
        oldPassword,
        newPassword
      );

      return res.status(201).json({ message: "Пароль успешно изменён" });
    } catch (e) {
      return res.status(500).json({ message: e });
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken", {
        httpOnly: true,
        domain:
          process.env.NODE_ENV === "production"
            ? "naks-donbass.ru"
            : "localhost",
      });
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const id = req.params.id;
      if (id) {
        await userService.delete(id);
        res.status(200).json({ message: "Пользователь успешно удален!" });
      }
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      const userData = await userService.refresh(refreshToken);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        domain:
          process.env.NODE_ENV === "production"
            ? "naks-donbass.ru"
            : "localhost",
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      //создание новых ролей
      // const userRole = new Role();
      // const adminRole = new Role({ value: "admin" });
      // const godRole = new Role({ value: "god" });
      // await userRole.save();
      // await adminRole.save();
      // await godRole.save();

      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async getUserById(req, res, next) {
    try {
      const id = req.params.id;
      const user = await userService.getUserById(id);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async getUserCurrent(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const user = await userService.getUserCurrent(refreshToken);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
