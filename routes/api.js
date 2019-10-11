const router = require('express').Router();
const Command = require('../utils/command');
const User = require('../db/models/user');

const UserRepository = require('../modules/user/repository/userRepository');

router.all('/*', async (req, res, next) => {
  const method = req.body.method.toLowerCase();
  const module = req.body.module;
  const command = req.body.command;
  const payload = req.body.payload;
  let user;

  if (req.user) {
    const userProp = await User.findOne({where: {id: req.user}});
    user = {id: userProp.id, role: userProp.role};
  } else {
    user = {id: null, role: null};
  }
  try {
    if (method === 'post') {
      const postResponse = await new Command(module, command).postHandler(payload, user);

      res.status(201).json(postResponse);
    } else if (method === 'get') {
      const getResponse = await new Command(module, command).getHandler(payload, user);

      res.status(200).json(getResponse);
    } else {
      next();
    }
  } catch (e) {
    res.status(500).json({error_msg: e.message});
  }
});

module.exports = router;
