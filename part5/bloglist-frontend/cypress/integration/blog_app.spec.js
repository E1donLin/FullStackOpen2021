describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'Eldon',
      name: 'Eldon Lin',
      password: '12345',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('Eldon')
      cy.get('#password').type('12345')
      cy.get('#login-button').click()

      cy.contains('Eldon Lin logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('Eldon')
      cy.get('#password').type('123456')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'Eldon', password: '12345' })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('Good Book')
      cy.get('#author').type('Eldon Lin')
      cy.get('#url').type('www.nonexisting.com')

      cy.get('#create-button').click()
      cy.contains('a new blog Good Book by Eldon Lin')
    })
    describe('with several blogs', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'First blog',
          author: 'Eldon Lin',
          url: 'www.nonexisting.com',
          likes: 0,
        })
        cy.createBlog({
          title: 'Second blog',
          author: 'Eldon Lin',
          url: 'www.nonexisting.com',
          likes: 5,
        })
        cy.createBlog({
          title: 'Third blog',
          author: 'Eldon Lin',
          url: 'www.nonexisting.com',
          likes: 10,
        })
      })

      it('can like a blog', function () {
        cy.contains('view').click()
        cy.get('#like-button').click()
        cy.get('#like-counts').contains('likes: 1')
      })

      it('can delete a blog created by the user', function () {
        cy.contains('view').click()
        cy.get('#remove-button').click()

        cy.should('not.contain', 'First')
      })

      it('blogs are ordered by likes', function () {
        cy.get('.blog').should((items) => {
          expect(items[0]).to.contain('Third blog')
          expect(items[1]).to.contain('Second blog')
          expect(items[2]).to.contain('First blog')
        })
      })
    })
  })
})
