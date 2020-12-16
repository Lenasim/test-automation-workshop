import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import CreateWilderForm from './CreateWilderForm'

//every it starts from '0' so, need to start from render something

describe('CreateWilderForm',() => {
    it('renders button to show form', () => {
      render(<CreateWilderForm />)
      expect(screen.getByRole('button')).toHaveTextContent('Montrer le formulaire')
    })

    it('does not render form', () => {
      render(<CreateWilderForm />)
      expect(screen.queryByRole('form')).not.toBeInTheDocument()
    }) 


    describe('when button to show form is clicked', () => {
        it('renders form', () => {
          render(<CreateWilderForm />)
          fireEvent.click(screen.getByRole('button'))
          expect(screen.queryByRole('form')).toBeInTheDocument()    
        })

        it('renders button to hide form', () => {
          render(<CreateWilderForm />)
          fireEvent.click(screen.getByRole('button'))
          expect(screen.getByRole('button')).toHaveTextContent('Cacher le formulaire')
        })


        describe('when button to hide is clicked', () => {
            it('hides form', () => {
              render(<CreateWilderForm />)
              fireEvent.click(screen.getByRole('button'))
              fireEvent.click(screen.getByRole('button'))
              expect(screen.queryByRole('form')).not.toBeInTheDocument()
            })
        })
    })

})
