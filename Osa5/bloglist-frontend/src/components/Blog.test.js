import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import Blog from "./Blog"

describe("<Blog />", () => {

    const user = {
        name: "Test user",
        username: "testuser"
    }

    const blog = {
        title: "Test blog",
        author: "Test author",
        url: "www.test.com",
        user: user
    }

    test("renders collapsed content correctly", () => {
        const component = render(
            <Blog blog={blog} user={user} />
        )

        expect(component.container).toHaveTextContent("Test blog Test author")
        expect(component.container).not.toHaveTextContent("www.test.com")
        expect(component.container).not.toHaveTextContent("likes")
    })

    test("renders expanded content correctly", () => {
        const component = render(
            <Blog blog={blog} user={user} />
        )

        const button = component.getByText("show")
        fireEvent.click(button)

        expect(component.container).toHaveTextContent("www.test.com")
        expect(component.container).toHaveTextContent("likes")
    })

    test("like-button registers two clicks", () => {
        const mockHandler = jest.fn()

        const component = render(<Blog blog={blog} user={user} likeBlog={mockHandler} />)

        const expandButton = component.getByText("show")
        fireEvent.click(expandButton)

        const likeButton = component.getByText("like")
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})