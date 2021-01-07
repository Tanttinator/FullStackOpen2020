describe("Blog app", function() {

    beforeEach(function() {
        cy.request("POST", "http://localhost:3001/api/testing/reset")
        const user = {
            name: "Test user",
            username: "testuser",
            password: "password"
        }
        cy.request("POST", "http://localhost:3001/api/users/", user)
        cy.visit("http://localhost:3000")
    })

    it("Login form is shown", function() {
        cy.contains("Login")
    })

    describe("Login", function() {

        it("succeeds with correct credentials", function() {
            cy.get("#username").type("testuser")
            cy.get("#password").type("password")
            cy.get("#login-button").click()

            cy.contains("Test user logged in")
        })

        it("fails with wrong credentials", function() {
            cy.get("#username").type("testuser2")
            cy.get("#password").type("wrongpw")
            cy.get("#login-button").click()

            cy.contains("wrong username or password")
        })

    })

    describe("When logged in", function() {

        beforeEach(function() {
            cy.request("POST", "http://localhost:3001/api/login", { username: "testuser", password: "password" }).then(response => {
                localStorage.setItem("loggedBloglistUser", JSON.stringify(response.body))
                cy.visit("http://localhost:3000")
                cy.contains("new blog").click()
                cy.get("#title").type("Test blog")
                cy.get("#author").type("Test author")
                cy.get("#url").type("www.test.com")
                cy.get("#create-blog-button").click()
            })
        })

        it("a blog can be created", function() {
            cy.contains("Test blog Test author")
        })

        it("a blog can be liked", function() {
            cy.contains("show").click()
            cy.get("#like-button").click()
            cy.contains("1")
        })

        it("a blog can be removed", function() {
            cy.contains("show").click()
            cy.contains("remove").click()
            cy.contains("Test blog Test author").should("not.exist")
        })

        it("blogs should be ordered by the amount of likes", function() {
            cy.contains("new blog").click()
            cy.get("#title").type("Test blog 2")
            cy.get("#author").type("Test author")
            cy.get("#url").type("www.test.com")
            cy.get("#create-blog-button").click()

            cy.contains("Test blog 2 Test author").contains("show").click()
            cy.contains("Test blog 2 Test author").get("#like-button").click()

            cy.get("#blog").first().contains("Test blog 2")
        })
    })
})