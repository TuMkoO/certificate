//Data Transfer Object
module.exports = class UserDto {
  email;
  id;
  roles;

  constructor(model) {
    this.email = model.email;
    this.id = model._id.valueOf();
    this.roles = model.roles;
  }
};
