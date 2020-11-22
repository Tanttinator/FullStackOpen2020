const collection = require("lodash/collection")
const object = require("lodash/object")
const array = require("lodash/array")

const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.map(blog => blog.likes).reduce((total, likes) => total + likes, 0)
}

const favoriteBlog = (blogs) => {
    const sorted = blogs.sort((a, b) => a.likes - b.likes)
    if(sorted.length === 0) return {}
    return sorted[sorted.length - 1]
}

const mostBlogs = (blogs) => {
    const sorted = object.toPairs(collection.countBy(blogs, blog => blog.author)).sort((a, b) => a[1] - b[1])
    if(sorted.length === 0) return {}
    const most = array.last(sorted)
    return {
        author: most[0],
        blogs: most[1]
    }
}

const mostLikes = (blogs) => {
    const sorted = object.toPairs(
        object.mapValues(
            collection.groupBy(
                blogs,
                blog => blog.author
            ),
            arr => arr.reduce(
                (total, blog) => total + blog.likes,
                0
            )
        )
    ).sort((a, b) => a[1] - b[1])
    if(sorted.length === 0) return {}
    const most = array.last(sorted)
    return {
        author: most[0],
        likes: most[1]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}