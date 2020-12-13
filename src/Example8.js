import './App.css';
import { usePaginatedQuery } from 'react-query';

import axios from 'axios';
import { useState } from 'react';

const fetchNews = async (key, page) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return axios
        .get(
            `http://newsapi.org/v2/everything?q=world&sortBy=publishedAt&pageSize=10&page=${page}&apiKey=f02b2a0ecd7a4e41977d296648ad94b7`
        )
        .then((res) => res?.data?.articles ?? []);
};

// usePaginatedQuery - same like useQuery, but only 1 difference is,
// it maintain last data and next data
// useQuery - does not maintain last data.

function Example8() {
    const [page, setPageSize] = useState(1);
    const { isLoading, data, isFetching } = usePaginatedQuery(['getNews', page], fetchNews);

    const nextPage = () => setPageSize(page + 1);
    const previousPage = () => setPageSize(page > 1 ? page - 1 : page);

    return (
        <div>
            <br /><br />
            {isFetching && <b>Is fetching data</b>}
            <br />
            <br />
            {isLoading ? (
                <div>Loading data</div>
            ) : (
                <>
                    {data?.map((article, index) => (
                        <div key={index}>{article?.title}</div>
                    ))}
                </>
            )}
            <br />
            <br />
            <button onClick={previousPage}>Previous Post</button>
            <button onClick={nextPage}>Next Post</button>
        </div>
    );
}

export default Example8;
