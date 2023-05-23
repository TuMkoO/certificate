//Data Transfer Object
module.exports = class UserDto {
  email;
  name;
  id;
  roles;

  constructor(model) {
    this.email = model.email;
    this.name = model.name;
    this.id = model._id.valueOf();
    this.roles = model.roles;
  }
};
