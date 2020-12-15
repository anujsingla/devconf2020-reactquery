import './App.css';
import { usePaginatedQuery } from 'react-query';

import axios from 'axios';
import { useState } from 'react';

const fetchUsers = async (key, page = 1) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return axios
        .get(
            `https://api.github.com/search/users?q=anuj&page=${page}&per_page=10&access_token=b5b35fbb94691b518e8f36f67a42d8b101195372`
        )
        .then((res) => res?.data?.items ?? []);
};

// usePaginatedQuery - same like useQuery, but only 1 difference is,
// it maintain last data and next data
// useQuery - does not maintain last data.

function Example8() {
    const [page, setPageSize] = useState(1);
    const { isLoading, data, isFetching } = usePaginatedQuery(['getNames', page], fetchUsers);

    const nextPage = () => setPageSize(page + 1);
    const previousPage = () => setPageSize(page > 1 ? page - 1 : page);

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
                    {data?.map((user, index) => (
                        <div key={index}>{user?.login}</div>
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
