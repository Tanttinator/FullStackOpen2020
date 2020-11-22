const listHelper = require("../utils/list_helper")

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

test("dummy return one", () => {
    const result = listHelper.dummy()
    expect(result).toBe(1)
})

describe("total likes", () => {

    test("of empty list is zero", () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test("of multiple blogs is the sum of the likes of each blog", () => {
        const result = listHelper.totalLikes(initialBlogs)
        expect(result).toBe(29)
    })
})

describe("favorite blog", () => {

    test("of empty list is an empty object", () => {
        const result = listHelper.favoriteBlog([])
        expect(result).toEqual({})
    })

    test("of multiple blogs is the one with most upvotes", () => {
        const result = listHelper.favoriteBlog(initialBlogs)
        expect(result).toEqual({
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        })
    })

})

describe("most blogs written", () => {

    test("in an empty list is an empty object", () => {
        const result = listHelper.mostBlogs([])
        expect(result).toEqual({})
    })

    test("in a list of multiple blogs is the author with most blogs written", () => {
        const result = listHelper.mostBlogs(initialBlogs)
        expect(result).toEqual({
            author: "Robert C. Martin",
            blogs: 3
        })
    })

})

describe("most likes", () => {

    test("in an empty list is an empty object", () => {
        const result = listHelper.mostLikes([])
        expect(result).toEqual({})
    })

    test("in a list of multiple blogs is the author with most likes", () => {
        const result = listHelper.mostLikes(initialBlogs)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 17
        })
    })

})
