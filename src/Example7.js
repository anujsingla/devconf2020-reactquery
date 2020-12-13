import './App.css';
import { useQuery, useMutation, queryCache } from 'react-query';

// import axios from 'axios';
import { useState } from 'react';
import { task } from './DummyData';

const getTasks = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // fake get call
    return task;
};

const postTasks = async (newTask) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // fake get call
    return task.push(newTask);
};

// useMutation - create/update/delete data
// invalidateQueries - it will mark query stale and refetch the data.

function Example7() {
    const [searchText, setSearchText] = useState('');
    const { isLoading, data } = useQuery('getTask', getTasks);
    const [addTask, { isLoading: isAddingTask }] = useMutation(postTasks, {
        onSettled: () => {
            setSearchText('');
        },
        onSuccess: () => {
            console.log('do any task or show successful message');
            // help to fetch the task again
            // it will mark query stale and refetch the data.
            queryCache.invalidateQueries('getTask');
        }
    });

    const submitTask = () => {
        addTask(searchText);
    };

    return (
        <div>
            {isAddingTask && <div>Adding task</div>}
            {isLoading ? (
                <div>Loading data</div>
            ) : (
                <>
                    {data?.map((task, index) => (
                        <div key={index}>{task}</div>
                    ))}
                </>
            )}
            <br />
            <br />
            <div>Add New Task</div>
            <input value={searchText} onChange={(event) => setSearchText(event.target.value)} />
            <button onClick={submitTask}>Submit Task</button>
        </div>
    );
}

export default Example7;
