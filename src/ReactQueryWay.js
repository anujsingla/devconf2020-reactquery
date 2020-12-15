import './App.css';
import { useQuery } from 'react-query';

import axios from 'axios';

const fetchUsers = async (key, searchUser) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    // if (true) {
    //     throw new Error('error message');
    // }
    return axios
        .get(
            `https://api.github.com/search/users?q=${searchUser}&per_page=10&access_token=b5b35fbb94691b518e8f36f67a42d8b101195372`
        )
        .then((res) => res?.data?.items ?? []);
};

function ReactQueryWay() {
    const { isLoading, isError, data, error } = useQuery('repoData', fetchUsers);

    if (isError) {
        return <>{error.message}</>;
    }

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

export default ReactQueryWay;
