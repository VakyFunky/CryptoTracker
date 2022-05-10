import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsApiHeaders = {
    'X-RapidAPI-Host': 'free-news.p.rapidapi.com',
    'X-RapidAPI-Key': '4f9143e646msh94638af137175cbp141d54jsn20b123b52fd2'
}

const baseUrl = 'https://free-news.p.rapidapi.com';

const createRequests = (url) => ({ url, headers: cryptoNewsApiHeaders });

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptosNews: builder.query({
            query: ({ newsCategory, count }) => createRequests(`/v1/search?q=${newsCategory}&lang=en&page=1&page_size=${count}`)
        })
    })
});

export const { useGetCryptosNewsQuery } = cryptoNewsApi;