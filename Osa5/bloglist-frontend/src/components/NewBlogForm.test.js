import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import NewBlogForm from "./NewBlogForm"

describe("<NewBlogForm />", () => {

    test("calls the callback-function with correct parameters", () => {
        const createBlog = jest.fn()

        const component = render(<NewBlogForm addBlog={createBlog} />)

        const form = component.container.querySelector("form")
        const [title, author, url] = component.container.querySelectorAll("input")

        fireEvent.change(title, { target: { value: "Test blog" } })
        fireEvent.change(author, { target: { value: "Test author" } })
        fireEvent.change(url, { target: { value: "www.test.com" } })

        fireEvent.submit(form)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toBe("Test blog")
        expect(createBlog.mock.calls[0][0].author).toBe("Test author")
        expect(createBlog.mock.calls[0][0].url).toBe("www.test.com")
    })

})