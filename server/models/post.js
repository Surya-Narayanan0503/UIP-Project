const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  post_id: { type: String, unique: true, required: true},
  title: { type: String, required: true},
  created_by: { type: String, required: true},
  description: { type: String}
})

const Post = mongoose.model("Post", postSchema);

async function create(title, created_by, description) {

  
  const newPost = await Post.create({
    title: title,
    created_by: created_by,
    description: description
  });

  return newPost;
}

async function updatePost(id, title, description) {
  const post = await Post.updateOne({"post_id": id}, {$set: { title: title, description: description}});
  return post;
}

async function deletePost(id) {
  await Post.deleteOne({"post_id": id});
};

async function getPost(post_id) {
  return await Post.findOne({ "post_id": post_id});
}

module.exports = { 
  create, updatePost, deletePost ,getPost
};