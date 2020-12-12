import './App.css';
import TraditionalWayFetchData from './TraditionalWayFetchData';
import { ReactQueryDevtools } from "react-query-devtools";
import ReactQueryWay from './ReactQueryWay';

function App() {

    return (
        <div className="App">
            <TraditionalWayFetchData />
            <ReactQueryWay />
            <ReactQueryDevtools initialIsOpen />
        </div>
    );
}

export default App;
