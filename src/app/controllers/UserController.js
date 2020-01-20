import User from '../models/User';

class UserController {
  async store(req, res) {
    const { name, email, password_hash } = await User.create(req.body);

    return res.json({
      name,
      email,
      password_hash,
    });
  }
}

export default new UserController();
