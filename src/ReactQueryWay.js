import './App.css';
import { useQuery } from 'react-query';

import axios from 'axios';

function ReactQueryWay() {
    const { isLoading, isError, data } = useQuery('repoData', () =>
        axios('https://api.github.com/repos/anujsingla/patternfly-react')
    );

    return (
        <div className="App">
            {isError && <div>not able to fetch data</div>}
            {isLoading ? (
                <div>Loading data</div>
            ) : (
                <div>
                    <h1>{data.data.name}</h1>
                    <p>{data.data.description}</p>
                </div>
            )}
        </div>
    );
}

export default ReactQueryWay;
