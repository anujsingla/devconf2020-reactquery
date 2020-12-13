import './App.css';
import { useQuery } from 'react-query';

import axios from 'axios';
import { useState } from 'react';

const fetchNews = async (key, searchText) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return axios
        .get(
            `http://newsapi.org/v2/everything?q=${searchText}&sortBy=publishedAt&apiKey=f02b2a0ecd7a4e41977d296648ad94b7`
        )
        .then((res) => res?.data?.articles ?? []);
};

// fetch data on user search or state change
// dynamic query key as per search
// we can use debounce method
// enabled -> it help to disable this query from automatically running
function Example4() {
    const [searchText, setSearchText] = useState('');
    const { isLoading, data } = useQuery(['searchText', searchText], fetchNews, {
        enabled: searchText,
    });

    return (
        <div>
            <input value={searchText} onChange={(event) => setSearchText(event.target.value)} />
            {isLoading ? (
                <div>Loading data</div>
            ) : (
                <>
                    {data?.map((article, index) => (
                        <div key={index}>{article?.title}</div>
                    ))}
                </>
            )}
        </div>
    );
}

export default Example4;
