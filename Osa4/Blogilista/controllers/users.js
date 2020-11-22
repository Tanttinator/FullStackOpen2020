const bcrypt = require("bcryptjs")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.get("/", async (request, response) => {
    const users = await User.find({}).populate("blogs")

    response.json(users)
})

usersRouter.post("/", async (request, response) => {
    const body = request.body

    const saltRounds = 10

    if(body.password === undefined || body.password.length < 3) {
        return response.status(400).send({ error: "password must be at least three characters long!" })
    }

    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash: passwordHash
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

module.exports = usersRouter