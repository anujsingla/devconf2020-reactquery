import './App.css';
// import TraditionalWayFetchData from './TraditionalWayFetchData';
import { ReactQueryDevtools } from "react-query-devtools";
// import ReactQueryWay from './ReactQueryWay';
// import Example3 from './Example3';
// import Example4 from './Example4';
// import Example5 from './Example5';
// import Example6 from './Example6';
// import Example7 from './Example7';
import Example8 from './Example8';

// https://newsapi.org/
// 'f02b2a0ecd7a4e41977d296648ad94b7'
// 'http://newsapi.org/v2/everything?q=world&sortBy=publishedAt&apiKey=f02b2a0ecd7a4e41977d296648ad94b7'

function App() {

    return (
        <div className="App">
            {/* <TraditionalWayFetchData /> */}
            {/* <ReactQueryWay /> */}
            {/* <Example3 /> */}
            {/* <Example4 /> */}
            {/* <Example5 /> */}
            {/* <Example6 /> */}
            {/* <Example7 /> */}
            <Example8 />
            <ReactQueryDevtools initialIsOpen />
        </div>
    );
}

export default App;
