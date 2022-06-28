const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true},
  password: { type: String, required: true},
  followers: [String],
  following: [String]
})

const User = mongoose.model("User", userSchema);

async function register(username, password) {
  const user = await getUser(username);
  if(user) throw Error('Username already in use');

  const salt = await bcrypt.genSalt(10);  
  const hashedPassword = await bcrypt.hash(password,salt);

  const newUser = await User.create({
    username: username,
    password: hashedPassword,
    followers: [],
    following: []
  });

  return newUser;
}

async function login(username, password) {
  const user = await getUser(username);
  if(!user) throw Error('Error founding User');

  const checkedPassword = await bcrypt.compare(password, user.password);
  if(!checkedPassword){
      throw new Error('Incorrect Password');
  }
  return user;
}

async function updatePassword(id, password) {
  const user = await User.updateOne({"_id": id}, {$set: { password: password}});
  return user;
}

async function deleteUser(id) {
  await User.deleteOne({"_id": id});
};

async function getUser(username) {
  return await User.findOne({ "username": username});
}

module.exports = { 
  register, login, updatePassword, deleteUser 
};