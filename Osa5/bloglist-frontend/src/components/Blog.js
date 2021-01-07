import React, { useState } from "react"
const Blog = ({ blog, user, likeBlog, removeBlog }) => {

    const [expanded, setExpanded] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5
    }

    if(expanded) {
        return (
            <div id="blog" style={blogStyle}>
                <p>{blog.title} {blog.author} <button onClick={ () => setExpanded(false) }>hide</button></p>
                <p>{blog.url}</p>
                <p>likes {blog.likes} <button id="like-button" onClick={() => likeBlog(blog)}>like</button></p>
                <p>{blog.user.name}</p>
                {user.username === blog.user.username && <button onClick={() => removeBlog(blog)}>remove</button>}
            </div>
        )
    }
    return (
        <div style={blogStyle}>
            <p>{blog.title} {blog.author} <button onClick={ () => setExpanded(true) }>show</button></p>
        </div>
    )
}

export default Blog
