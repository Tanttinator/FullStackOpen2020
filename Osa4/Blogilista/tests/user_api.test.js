const mongoose = require("mongoose")
const app = require("../app")
const supertest = require("supertest")
const bcrypt = require("bcryptjs")
const User = require("../models/user")

const initialUsers = [
    {
        username: "user1",
        name: "User 1",
        password: bcrypt.hash("password1", 10)
    },
    {
        username: "user2",
        name: "User 2",
        password: bcrypt.hash("password2", 10)
    }
]

const api = supertest(app)

describe("User POST", () => {

    beforeEach(async () => {
        await User.deleteMany({})
        await User.insertMany(initialUsers)
    })

    test("new valid user can be added", async () => {

        const user = {
            username: "user3",
            name: "User 3",
            password: "password3"
        }

        await api.post("/api/users").send(user).expect(200).expect("Content-Type", /application\/json/)

        const result = await api.get("/api/users")

        expect(result.body).toHaveLength(initialUsers.length + 1)

    })

    test("invalid user cannot be added", async () => {

        const user = {
            username: "user3",
            name: "User 3"
        }

        await api.post("/api/users").send(user).expect(400)

        const result = await api.get("/api/users")

        expect(result.body).toHaveLength(initialUsers.length)

    })

})

afterAll(() => {
    mongoose.connection.close()
})