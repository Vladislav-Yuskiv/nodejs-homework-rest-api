const {
   register,
   login,
   logout,
   current
} = require('../services/userService');



const registrationController = async (req, res) => {
     const {
            email,
            password
    } = req.body;
    
   await register(email, password);

  res.status(201).json({status: 'success'});


}

const loginController = async (req, res) => {
    
     const {
            email,
            password
    } = req.body;
 
  const token = await login(email, password);

  res.json({status: 'success', token});

}

const logoutController =  async ( req , res ) => {
  const { _id: userId } = req.user;

  await logout(userId)
  
  res.status(204).json({status: 'success', message: 'token deleted'});

}

const currentController = async ( req , res ) => {
  const { _id: userId } = req.user;

  const user = await current(userId)
  
  res.status(200).json({user});
}

module.exports = {
    registrationController,
    loginController,
    logoutController,
    currentController
}
