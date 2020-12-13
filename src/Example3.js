import './App.css';
import { useQuery } from 'react-query';

import axios from 'axios';
import { useState } from 'react';

// refetchOnWindowFocus -> not fetch data on load
// staleTime -> how much time the data will stale from fresh.
// we can set time  in milisecond or infinity, it will not stale the
// data.
function Example3() {
    const [showContent, setShowContent] = useState(true);
    const { isLoading, data } = useQuery(
        'repoData',
        async () => {
            await new Promise((resolve) => setTimeout(resolve, 100));
            return axios
                .get(
                    'http://newsapi.org/v2/everything?q=world&sortBy=publishedAt&apiKey=f02b2a0ecd7a4e41977d296648ad94b7'
                )
                .then((res) => res?.data?.articles ?? []);
        },
        {
            refetchOnWindowFocus: false,
            staleTime: 5000
        }
    );

    return (
        <div>
            <button onClick={() => setShowContent(!showContent)}>Hide Content</button>
            {isLoading ? (
                <div>Loading data</div>
            ) : (
                <>{showContent && data.map((article, index) => <div key={index}>{article?.title}</div>)}</>
            )}
        </div>
    );
}

export default Example3;
