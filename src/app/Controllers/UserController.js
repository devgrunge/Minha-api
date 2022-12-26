const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const yup = require("yup");

class UserController {
  show(req, res) {
    let users = ["Kaio", "Larissa", "Denver"];

    return res.status(200).json({
      error: false,
      users,
    });
  }

  async store(req, res) {
    // validação através do yup
    // inicio
    let schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: true,
        message: "Dados inválidos",
      });
    }

    // validação através do yup
    // fim

    // Validação na database verifica se o usuário existe

    let userExist = await User.findOne({ email: req.body.email });

    if (userExist) {
      return res.status(400).json({
        error: true,
        message: "Este usuário já existe",
      });
    }

    //Criação da constante data

    const { name, email, password } = req.body;

    const data = { name, email, password };

    // Criptografia da password

    data.password = await bcrypt.hash(data.password, 8);

    // Inserção na Database

    await User.create(data, (err) => {
      if (err)
        return res.status(400).json({
          error: true,
          message: "Erro ao tentar inserir usuário no MongoDB",
        });
      return res.status(200).json({
        error: false,
        message: "Usuário cadastrado com sucesso",
      });
    });
  }
}

module.exports = new UserController();
