import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      likes: '10',
      author: 'Eldon Lin',
      title: 'Good Book',
      url: 'www.nonexistent.com',
    }

    component = render(<Blog blog={blog} />)
  })

  test('renders blog and only display title and author', () => {
    //   component.debug()
    expect(component.container).toHaveTextContent('Eldon Lin')
    expect(component.container).toHaveTextContent('Good Book')

    const div = component.container.querySelector('.details')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking button, details are displayed', () => {
    const button = component.container.querySelector('button')
    fireEvent.click(button)

    const div = component.container.querySelector('.details')
    expect(div).not.toHaveStyle('display: none')
  })
})
