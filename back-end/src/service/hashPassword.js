import bcrypt from "bcrypt";

const saltRounds = 12;

const passwordHash = async (password) => {
  return bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

export { passwordHash, comparePassword };
