import bcrypt from "bcryptjs";
export const Users = [
  {
    name: "Admin User",
    email: "admin@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "Rachel Green",
    email: "rachel@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];
