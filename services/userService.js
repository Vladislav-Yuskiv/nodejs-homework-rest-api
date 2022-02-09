const { User } = require('../db/userModal');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {NotAuthorizedError} = require('../helpers/error')

const register = async (email, password) => {
     
       const user = new User({
            email, password
      });
    
      await user.save();

}

const login = async (email , password) => {
    const user = await User.findOne({ email });
    

  if (!user) {
    throw new NotAuthorizedError(`No user with email '${email}' found`);
    }

  if (!await bcrypt.compare(password, user.password)) {
    throw new NotAuthorizedError(`Wrong password`);
  }

 const token = jwt.sign({
            _id: user._id,
 }, process.env.JWT_SECRET);
    

   await User.updateOne({ email}, { token } )
    
  return token;

}

const logout = async (userId) => {

  const user = await User.findOneAndUpdate({ _id: userId }, { token: '' })
  
   if (!user) {
    throw new NotAuthorizedError(`No user  found`);
    }

}

const current = async (userId) => {

  const user = await User.findOne({ _id: userId } , {email: 1 , subscription: 1});

   if (!user) {
    throw new NotAuthorizedError('No Unauthorized');
    }

  return user
   
}

module.exports = {
    register,
    login,
    logout,
    current
}

