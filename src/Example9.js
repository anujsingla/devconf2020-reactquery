import './App.css';
import { useInfiniteQuery } from 'react-query';

import axios from 'axios';
import { Fragment } from 'react';

const fetchNews = async (key, page = 0) => {
    console.log('page', page);
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

function Example9() {
    const { isLoading, data, isFetching, fetchMore } = useInfiniteQuery('getNews', fetchNews, {
        getFetchMore: (lastGroup, allGroups) => {
            return lastGroup.nextPage
        },
    });

    console.log('data', data)

    return (
        <div>
            <br />
            <br />
            {isFetching && <b>Is fetching data</b>}
            <br />
            <br />
            {isLoading ? (
                <div>Loading data</div>
            ) : (
                <>
                    {data?.map((page, i) => {
                        return (
                        <Fragment key={i}>
                            {page?.map((article, index) => (
                                <div key={index}>{article?.title}</div>
                            ))}
                        </Fragment>
                    )})}
                </>
            )}
            <br />
            <br />
            <button onClick={() => fetchMore()}>Next Post</button>
        </div>
    );
}

export default Example9;
