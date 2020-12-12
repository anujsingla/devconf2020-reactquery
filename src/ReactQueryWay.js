import './App.css';
import { useQuery } from 'react-query';

import axios from 'axios';

function ReactQueryWay() {
    const { isLoading, isError, data, error } = useQuery('repoData', async () => {
        // show isLoading state, dummy wait
        // await new Promise((resolve) => setTimeout(resolve, 500));
        // if (true) {
        //     throw new Error('error message');
        // }
        return axios
            .get('http://newsapi.org/v2/everything?q=world&sortBy=publishedAt&apiKey=f02b2a0ecd7a4e41977d296648ad94b7')
            .then((res) => res?.data?.articles ?? []);
    });

    if (isError) {
        return <>{error.message}</>;
    }

    return (
        <div>
            {isLoading ? (
                <div>Loading data</div>
            ) : (
                <>
                    {data.map((article, index) => (
                        <div key={index}>{article?.title}</div>
                    ))}
                </>
            )}
        </div>
    );
}

export default ReactQueryWay;
