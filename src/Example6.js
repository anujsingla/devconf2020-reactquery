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

// Query side effect
//onSuccess ->call after query succes
//  onError -> call after query fail,
// onSettled -> call after every call either fail or pass,
// refetchInterval -> refetch data after mention time
// refetchIntervalInBackground -> refetch data if current tab is not active

function Example6() {
    const [searchText, setSearchText] = useState('');
    const { isLoading, data } = useQuery(['searchText', searchText], fetchNews, {
        enabled: searchText,
        // refetchInterval: 5000,
        // refetchIntervalInBackground: true,
        onSuccess: () => {
            console.log('successfully fetched data');
        },
        onError: () => {
            console.log('error in fetching data data');
        },
        onSettled: () => {
            console.log('called after every call.');
        },
    });

    return (
        <div>
            <div>Search news:</div>
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

export default Example6;
