import './App.css';
import { useQuery } from 'react-query';

import axios from 'axios';
import { useState } from 'react';

const fetchUsers = async (key, searchUser) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return axios
      .get(`https://api.github.com/search/users?q=${searchUser}&per_page=10`)
      .then((res) => res?.data?.items ?? []);
  };

// fetch data on user search or state change
// dynamic query key as per search
// we can use debounce method
// enabled -> it help to disable this query from automatically running
function Example4() {
    const [searchText, setSearchText] = useState("");
    const { isLoading, data } = useQuery(["searchText", searchText], fetchUsers, {
      enabled: searchText
    });

    return (
        <>
          <input
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
    
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
        </>
      );
}

export default Example4;
