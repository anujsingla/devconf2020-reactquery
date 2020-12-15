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

// dependent query
// dynamic query key as per search
// fetch data from 1 query and pass to second query
// enabled -> it help to disable this query from automatically running
function Example5() {
    const [searchText, setSearchText] = useState('');
    const { isLoading, data } = useQuery(['searchText', searchText], fetchUsers, {
        enabled: searchText,
    });

    const { data: secondData } = useQuery(['secondQuery', data && data[2]?.login], fetchUsers, {
        enabled: data && data[2]?.login,
    });

    console.log('data', data);
    return (
        <>
            <input value={searchText} onChange={(event) => setSearchText(event.target.value)} />

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
                {secondData && (
                    <div>
                        <br />
                        <b>second query data:</b>
                        {secondData?.map((user, index) => (
                            <div key={index}>{user?.login}</div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default Example5;
