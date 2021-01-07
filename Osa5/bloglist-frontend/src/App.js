import React, { useState, useEffect, useRef } from "react"

import Blog from "./components/Blog"
import Notification from "./components/Notification"
import NewBlogForm from "./components/NewBlogForm"
import Togglable from "./components/Togglable"

import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
    const [blogs, setBlogs] = useState([])

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null)

    const [statusMessage, setStatusMessage] = useState(null)

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password
            })

            window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user))
            login(user)
            setUsername("")
            setPassword("")
        } catch (exception) {
            setStatusMessage({ message: "wrong username or password", type: "error" })
            setTimeout(() => {
                setStatusMessage(null)
            }, 5000)
        }
    }

    const newBlogFormRef = useRef()

    const addBlog = async (blog) => {
        newBlogFormRef.current.toggleVisibility()
        const addedBlog = await blogService.create(blog)
        refreshBlogs(blogs.concat(addedBlog))
        setStatusMessage({ message: `a new blog ${addedBlog.title} by ${addedBlog.author} added`, type: "success" })
        setTimeout(() => {
            setStatusMessage(null)
        }, 5000)
    }

    const likeBlog = (blog) => {
        const updatedBlog = { ...blog, likes: blog.likes + 1 }
        blogService.update({ ...updatedBlog, user: blog.user.id })
        refreshBlogs(blogs.map(other => other.id === updatedBlog.id ? updatedBlog : other))
    }

    const removeBlog = (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
            blogService.remove(blog)
            refreshBlogs(blogs.filter(other => other.id !== blog.id))
        }
    }

    const login = user => {
        blogService.setToken(user.token)
        setUser(user)
    }

    const logout = () => {
        window.localStorage.removeItem("loggedBloglistUser")
        setUser(null)
    }

    const refreshBlogs = (blogs) => {
        setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    }

    useEffect(() => {
        blogService.getAll().then(blogs =>
            refreshBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser")
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            login(user)
        }
    }, [])

    const loginForm = () => (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        id="username"
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        id="password"
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button id="login-button" type="submit">login</button>
            </form>
        </div>
    )

    const blogForm = () => (
        <div>
            <h2>blogs</h2>
            <p>{user.name} logged in</p>
            <button type="button" onClick={logout}>logout</button>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} user={user} likeBlog={likeBlog} removeBlog={removeBlog} />
            )}
            <Togglable buttonLabel="new blog" ref={newBlogFormRef}>
                <NewBlogForm addBlog={addBlog} />
            </Togglable>
        </div>
    )

    return (
        <div>
            <Notification message={statusMessage} />
            {user === null ? loginForm() : blogForm()}
        </div>
    )
}

export default App