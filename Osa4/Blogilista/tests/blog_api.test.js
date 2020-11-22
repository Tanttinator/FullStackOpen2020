const mongoose = require("mongoose")
const supertest = require("supertest")
const bcrypt = require("bcryptjs")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")
const User = require("../models/user")

const initialBlogs = [
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

describe("Blog GET", () => {

    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(initialBlogs)
    })

    test("blogs are returned as json", async () => {
        await api.get("/api/blogs").expect(200).expect("Content-Type", /application\/json/)
    })

    test("correct number of blogs are returned", async () => {
        const res = await api.get("/api/blogs")
        expect(res.body).toHaveLength(initialBlogs.length)
    })

    test("blogs contain field 'id'", async () => {
        const res = await api.get("/api/blogs")
        res.body.forEach(blog => expect(blog.id).toBeDefined())
    })

})

describe("Blog POST", () => {

    let token = undefined

    beforeAll(async () => {
        await User.deleteMany({})
        const user = new User({
            username: "testuser",
            name: "Test User",
            passwordHash: await bcrypt.hash("password1", 10)
        })
        await user.save()
        const login = await api.post("/api/login").send({ username: "testuser", password: "password1" })
        token = "bearer " + login.body.token
    })

    beforeEach(async () => {
        await Blog.deleteMany({})
    })

    test("a valid blog can be added", async () => {
        const newBlog = {
            title: "New Blog",
            author: "Test",
            url: "www.blog.com",
            likes: 5
        }

        await api.post("/api/blogs").set("Authorization", token).send(newBlog).expect(201).expect("Content-Type", /application\/json/)

        const res = await api.get("/api/blogs")

        expect(res.body).toHaveLength(1)
        expect(res.body.map(blog => blog.title)).toContain("New Blog")
    })

    test("likes default to zero", async () => {
        const newBlog = {
            title: "New Blog",
            author: "Test",
            url: "www.blog.com"
        }

        const res = await api.post("/api/blogs").set("Authorization", token).send(newBlog).expect(201).expect("Content-Type", /application\/json/)

        expect(res.body.likes).toBe(0)
    })

    test("an invalid blog is not added", async () => {
        const newBlog = {
            author: "Test"
        }

        await api.post("/api/blogs").set("Authorization", token).send(newBlog).expect(400)

        const res = await api.get("/api/blogs")

        expect(res.body).toHaveLength(0)
    })

    test("blog cannot be added without valid token", async () => {
        const newBlog = {
            title: "New Blog",
            author: "Test",
            url: "www.blog.com",
            likes: 5
        }

        await api.post("/api/blogs").send(newBlog).expect(401)
    })

})

afterAll(() => {
    mongoose.connection.close()
})