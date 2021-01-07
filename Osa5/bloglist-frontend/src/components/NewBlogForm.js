import React, { useState } from "react"

const NewBlogForm = ({ addBlog }) => {

    const [newBlogTitle, setNewBlogTitle] = useState("")
    const [newBlogAuthor, setNewBlogAuthor] = useState("")
    const [newBlogURL, setNewBlogURL] = useState("")

    const createBlog = (event) => {
        event.preventDefault()
        addBlog({
            title: newBlogTitle,
            author: newBlogAuthor,
            url: newBlogURL
        })
        setNewBlogTitle("")
        setNewBlogAuthor("")
        setNewBlogURL("")
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createBlog}>
                <div>
                title
                    <input id="title" type="text" value={newBlogTitle} name="Title" onChange={({ target }) => setNewBlogTitle(target.value)}></input>
                </div>
                <div>
                author
                    <input id="author" type="text" value={newBlogAuthor} name="Author" onChange={({ target }) => setNewBlogAuthor(target.value)}></input>
                </div>
                <div>
                url
                    <input id="url" type="text" value={newBlogURL} name="URL" onChange={({ target }) => setNewBlogURL(target.value)}></input>
                </div>
                <button id="create-blog-button" type="submit">create</button>
            </form>
        </div>
    )
}

export default NewBlogForm