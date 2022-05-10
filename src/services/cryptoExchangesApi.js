import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const cryptoExchangesApiHeaders = {
    'X-RapidAPI-Host': 'coinpaprika1.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.REACT_APP_EXCHANGES_KEY
}

const baseUrl = 'https://coinpaprika1.p.rapidapi.com';

const createRequests = (url) => ({url, headers:cryptoExchangesApiHeaders});

export const cryptoExchangesApi = createApi({
    reducerPath: 'cryptoExchangesApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptoExchanges: builder.query({
            query: () => createRequests(`/exchanges`)
        })
    })
});

export const {useGetCryptoExchangesQuery} = cryptoExchangesApi;