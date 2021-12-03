import {render, screen, waitFor} from '@testing-library/react';
import App from './App';
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

const mock = new MockAdapter(axios)

beforeAll(() => {
    mock.reset()
})

test('Tries to fetch data from API', async () => {

    mock.onGet(`${process.env.REACT_APP_BASE_URL}/config`)
        .reply(200, {heaters: [{id: 1, name: 'Salon'}]})

    const { queryByText, getByText } = render(<App />)
    expect(queryByText(/Pobieranie danych.../i)).toBeInTheDocument()
    expect(queryByText(/Salon/i)).not.toBeInTheDocument()

    await waitFor(() => getByText(/Salon/i))
    expect(queryByText(/Pobieranie danych.../i)).not.toBeInTheDocument()
    expect(queryByText(/Salon/i)).toBeInTheDocument()

})
