const jwt = require("jsonwebtoken")
const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user")
    response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id) {
        return response.status(401).json({ error: "token missing or invalid" })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id
    })
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete("/:id", async (request, response) => {

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id) {
        return response.status(401).json({ error: "token missing or invalid" })
    }

    const blog = await Blog.findById(request.params.id)

    if(decodedToken.id.toString() !== blog.user.toString()) {
        return response.status(401).json({ error: "only the original poster of the blog can delete it" })
    }

    await blog.remove()
    response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
    const result = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
    response.json(result)
})

module.exports = blogsRouter