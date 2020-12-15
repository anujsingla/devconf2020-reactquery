import './App.css';
import { useQuery } from 'react-query';

import axios from 'axios';
import { useState } from 'react';

const fetchUsers = async (key, searchUser) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return axios
        .get(
            `https://api.github.com/search/users?q=${searchUser}&per_page=10&access_token=b5b35fbb94691b518e8f36f67a42d8b101195372`
        )
        .then((res) => res?.data?.items ?? []);
};

// Query side effect
//onSuccess ->call after query succes
//  onError -> call after query fail,
// onSettled -> call after every call either fail or pass,
// refetchInterval -> refetch data after mention time
// refetchIntervalInBackground -> refetch data if current tab is not active

function Example6() {
    const [searchText, setSearchText] = useState('');
    const { isLoading, data } = useQuery(['searchText', searchText], fetchUsers, {
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
                    {data?.map((user, index) => (
                        <div key={index}>{user?.login}</div>
                    ))}
                </>
            )}
        </div>
    );
}

export default Example6;
