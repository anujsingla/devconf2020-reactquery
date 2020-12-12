import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function TraditionalWayFetchData() {
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            setError(false);
            setLoading(true);

            try {
                const response = await axios('https://api.github.com/repos/anujsingla/patternfly-react');
                setData(response.data);
            } catch (error) {
                setError(true);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <div className="App">
            {isError && <div>not able to fetch data</div>}
            {isLoading ? (
                <div>Loading data</div>
            ) : (
                <div>
                    <h1>{data.name}</h1>
                    <p>{data.description}</p>
                </div>
            )}
        </div>
    );
}

export default TraditionalWayFetchData;
