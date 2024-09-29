var express = require('express');
var router = express.Router();

/**
 * Mock data
 * Delete this after implementing the database
 */
const posts = [
  { id: 1, title: 'Post 1', description: 'Description for post 1', authorName: 'Author 1', createDate: new Date(), updateDate: new Date() },
  { id: 2, title: 'Post 2', description: 'Description for post 2', authorName: 'Author 2', createDate: new Date(), updateDate: new Date() },
];

/** 
  * GET all posts
  * Endpoint: GET /api/posts
  */
router.get('/', (req, res) => {
  res.json(posts)
});

/**
 * GET a single post by ID
 * Endpoint: GET /api/posts/:id
 */
router.get('/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

/**
 * POST create a new post
 * Endpoint: POST /api/posts
 */
router.post('/', (req, res) => {
  const newPost = {
    id: posts.length + 1, // Mock ID
    title: req.body.title,
    description: req.body.description,
    authorName: req.body.authorName,
    createDate: new Date(),
    updateDate: new Date()
  };
  posts.push(newPost);
  res.status(201).json(newPost.id);
});

/**
 * PUT update an existing post
 * Endpoint: PUT /api/posts/:id
 */
router.put('/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (post) {
    post.title = req.body.title || post.title;
    post.description = req.body.description || post.description;
    post.authorName = req.body.authorName || post.authorName;
    post.updateDate = new Date();
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

/**
 * DELETE a post by ID
 * Endpoint: DELETE /api/posts/:id
 */
router.delete('/:id', (req, res) => {
  const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
  if (postIndex !== -1) {
    posts.splice(postIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

module.exports = router;