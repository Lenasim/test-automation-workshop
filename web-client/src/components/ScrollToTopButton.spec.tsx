import React from 'react'
import {render, screen, fireEvent, getByRole} from '@testing-library/react'
import ScrollToTopButton from './ScrollToTopButton'

describe('ScrollToTopButton',() => {
  beforeEach(() => {
    render(<ScrollToTopButton />)
  })

  it('renders button to scroll to top', () => {
    expect(screen.getByRole('button')).toHaveTextContent('Revenir en haut')
  })


  describe('when clicked', () => {
    it('scroll to top', () => {
      //이거 더 찾아봐야해
      window.scrollTo = jest.fn()
      fireEvent.click(screen.getByRole('button'))
      
      expect(window.scrollTo).toHaveBeenCalledTimes(1)

      //argument은 다 적어줘야 한다
      expect(window.scrollTo).toHaveBeenCalledWith({top:0, behavior:'smooth'})

    })
  })
})