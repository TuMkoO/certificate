const User = require("../models/User");
const Role = require("../models/Role");
const Token = require("../models/Token");
const bcrypt = require("bcryptjs");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");

class UserService {
  async registration(email, password, name, role) {
    const candidate = await User.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }

    const userRole = await Role.findOne({ value: role });
    const hashPassword = await bcrypt.hash(password, 3);

    const user = await User.create({
      email,
      password: hashPassword,
      name,
      roles: [userRole.value],
    });

    return user;
  }

  async login(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким email не найден");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async update(id, email, name, role) {
    const user = await User.findByIdAndUpdate(
      id,
      { email, name, roles: [role] },
      { new: true }
    );

    return user;
  }

  async updatePassword(id, oldPassword, newPassword) {
    const user = await User.findById(id);
    const isPassEquals = await bcrypt.compare(oldPassword, user.password);
    const hashNewPassword = await bcrypt.hash(newPassword, 3);

    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный текущий пароль");
    } else {
      await User.findByIdAndUpdate(
        id,
        { password: hashNewPassword },
        { new: true }
      );

      return;
    }
  }

  async delete(id) {
    await User.findByIdAndDelete(id);

    return;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);

    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await User.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async getAllUsers() {
    const users = await User.find();

    const allUsers = users.map((user) => {
      return new UserDto(user);
    });

    return allUsers;
  }

  async getUserById(id) {
    const user = await User.findById({ _id: id });
    return user;
  }

  async getUserCurrent(refreshToken) {
    const user = await Token.findOne({ refreshToken });

    return user;
  }
}

module.exports = new UserService();
