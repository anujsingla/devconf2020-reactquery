import './App.css';
import { useQuery } from 'react-query';

import axios from 'axios';
import { useState } from 'react';

const fetchUsers = async (key, searchUser) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return axios
        .get(`https://api.github.com/search/users?q=${searchUser}&per_page=10&access_token=b5b35fbb94691b518e8f36f67a42d8b101195372`)
        .then((res) => res?.data?.items ?? []);
};

// refetchOnWindowFocus -> not fetch data on load
// staleTime -> how much time the data will fresh.
// we can set time  in milisecond or infinity, it will not stale the
// data.
function Example3() {
    const { isLoading, data } = useQuery('repoData', fetchUsers, {
        refetchOnWindowFocus: false,
        staleTime: 5000,
    });

    return (
        <div>
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

export default Example3;
