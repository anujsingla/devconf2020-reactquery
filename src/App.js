import './App.css';
// import TraditionalWayFetchData from './TraditionalWayFetchData';
import { ReactQueryDevtools } from "react-query-devtools";
import ReactQueryWay from './ReactQueryWay';

// https://newsapi.org/
// 'f02b2a0ecd7a4e41977d296648ad94b7'
// 'http://newsapi.org/v2/everything?q=world&sortBy=publishedAt&apiKey=f02b2a0ecd7a4e41977d296648ad94b7'

function App() {

    return (
        <div>
            {/* <TraditionalWayFetchData /> */}
            <ReactQueryWay />
            <ReactQueryDevtools initialIsOpen />
        </div>
    );
}

export default App;
