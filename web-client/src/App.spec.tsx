import React from 'react'
import {render, screen, waitFor, within} from '@testing-library/react'
import App, {GET_WILDERS} from './App'
import { MockedProvider } from '@apollo/client/testing'
import { GraphQLError } from 'graphql';


const GET_WILDERS_UNFETCHED_MOCK = []
//fictive data
const GET_WILDERS_SUCCESS_MOCK =[ 
  {
    request: {
      query: GET_WILDERS,
    },
    result: {
      data: {
        wilders: [
          {
            id: '1',
            displayName: '[SXB] Lorie Laurette',
          },
          {
            id: '2',
            displayName: '[PAR] Laure Laurent',
          },
        ],
      },
    },
  }
];

const apolloError = new GraphQLError('Error!');


const GET_WILDERS_ERROR_MOCK = [
  {
    request: {
      query: GET_WILDERS,
    },

    // result: {
    //   errors: [apolloError],
    // },

    // result: {
    //   errors: [new GraphQLError('Error!')],
    // },

    // error: new Error('An error occurred'),

    // result: { 
    //   errors: [{ message: "An error occurre" }] 
    // }

    error: {
      name: 'GRAPHQL_VALIDATION_FAILED',
      message:
        'Cannot query field "wilders_error" on type "Query". Did you mean "wilders"?',
    },
  }
]


describe('App',() => {

  describe('while fetching wilders', () => {
    it('renders loading', () => {
      render(
        <MockedProvider mocks={GET_WILDERS_UNFETCHED_MOCK} addTypename={false}>
          <App />
        </MockedProvider>
        )
      expect(screen.getByText('Chargement en cours…')).toBeInTheDocument()
    })
  })

  describe('while fetching wilders failed', () => {
    it('renders error', async () => {
      render(
        <MockedProvider mocks={GET_WILDERS_ERROR_MOCK} addTypename={false}>
          <App />
        </MockedProvider>
        )

      // const ErrMsg = await waitFor(() => screen.getByText('Erreur de chargement.'))
      // expect(ErrMsg).toBeInTheDocument()

      await waitFor(() => screen.getByText('Erreur de chargement.'));
      expect(screen.getByText('Erreur de chargement.')).toBeInTheDocument();
    })
  })

  describe('while fetching wilders successed', () => {
    it('renders wilders', async () => {
      render(
        <MockedProvider mocks={GET_WILDERS_SUCCESS_MOCK} addTypename={false}>
          <App />
        </MockedProvider>
      );

      const list = await waitFor(() => screen.getByRole('list'));

      const listItems = within(list).getAllByRole('listitem');
      expect(listItems).toHaveLength(2);

      expect(listItems[0]).toHaveTextContent('[SXB] Lorie Laurette');
      expect(listItems[1]).toHaveTextContent('[PAR] Laure Laurent');
    });
  });
});
