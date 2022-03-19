const router = require("express").Router(); 
const res = require("express/lib/response");
const Post = require("../models/Post");
const User = require("../models/User");

// create new post
router.post('/', async (req,res) => {
  try{
    const newPost = new Post(req.body)
    const post = await newPost.save()
    res.status(200 ).json(post)

  }catch(err){
    res.status(500).json(err)
  }
})

// update a post
router.put('/:id', async (req,res) => {
  try {
    const post = await Post.findOne({_id: req.params.id})
    if(post.userId === req.body.userId) {
      await post.updateOne({$set: req.body})
      res.status(200).json("the post was updated")
    } else {res.status(403).json("You are not the owner of this post")} 
  } catch(err) {
    res.status(500).json("the post doesn't exist")
  }
})

//delete a post
router.delete('/:id', async (req,res) => {
  try {
    const post = await Post.findOne({_id:req.params.id})
    if (post.userId === req.body._id) {
      await Post.deleteOne({_id:req.params.id})
      res.status(200).json('post deleted')
    } else {
      res.status(403).json("you can't delete posts of other users")
    }
  } catch(err){
    res.status(500).json(err);
  }
})

// like a post
router.put('/:id/like', async (req,res) => {
  try{
    const post = await Post.findOne({_id: req.params.id})
    if (!post.likes.includes(req.body.userId)){
      await post.updateOne({$push: {likes: req.body.userId}})
      res.status(200).json("you liked the post")
    } else {
      await post.updateOne({$pull: {likes: req.body.userId}})
      res.status(200).json("you disliked the post")
    }
  } catch(err) {
    res.status(500).json(err)
  }
})


// get a post
router.get('/:id', async (req,res) => {
  try {
    const post = await Post.findById(req.params.id)
    const {createdAt, updatedAt,__v, ...filteredPost} = post._doc
    res.status(200).json(filteredPost)
  } catch(err) {
    res.status(500).json(err)
  }
})

// get timeline posts
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId)
    const userPosts = await Post.find({userId:currentUser._id})
    const friendPosts = await Promise.all(
      currentUser.followings.map(friendId=>{
        return Post.find({userId: friendId})
      })
    )
    res.json(userPosts.concat(...friendPosts))
  } catch(err) {
    res.status(500).json(err)
  }
})
module.exports = router; 