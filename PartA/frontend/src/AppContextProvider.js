import React from 'react';
import useGet from './hooks/useGet';
import axios from "axios";

const AppContext = React.createContext({
    todoList: []
});

function AppContextProvider({children}) {

    // Sets up the app to fetch the todos from a REST API.
    const {
        data: todoList,
        isLoading: todoListLoading,
        refresh: refreshTodoList
    } = useGet('/api/todos', []);

    async function addTodo(description, deadline) {
        // console.log('addTodo--->', description, deadline)
        const todoToAdd = {
            description: description,
            deadline: deadline,
            status: false
        };
        const todoResponse = await axios.post('/api/todos', todoToAdd, {
            retry: 5,
            retryDelay: 1000,
            timeout: 6000
        }).catch(function (err) {
            console.log('failed', err);
        });
        ;
        refreshTodoList();
        return todoResponse.data;
    }

    async function updateTodo(id, description, deadline, status) {
        if (id) {
            const todoToUpload = {
                description: description,
                deadline: deadline,
                status: status
            };
            const todoResponse = await axios.put('/api/todos/' + id, todoToUpload, {
                retry: 5,
                retryDelay: 1000,
                timeout: 6000
            }).catch(function (err) {
                console.log('failed', err);
            });
            refreshTodoList();
            return todoResponse.status === 204;
        } else {
            return false
        }
    }

    async function delTodo(id) {
        if (id) {
            const todoResponse = await axios.delete('/api/todos/' + id, {
                retry: 5,
                retryDelay: 1000,
                timeout: 6000
            }).catch(function (err) {
                console.log('failed', err);
            });
            refreshTodoList();
            return todoResponse.status === 204;
        } else {
            return false
        }
    }

    // The context value that will be supplied to any descendants of this component.
    const context = {
        todoList,
        todoListLoading,
        addTodo,
        updateTodo,
        delTodo
    }

    // Wraps the given child components in a Provider for the above context.
    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    );
}

export {
    AppContext,
    AppContextProvider
};

axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    const config = err.config;
    // If config does not exist or the retry option is not set, reject
    if (!config || !config.retry) return Promise.reject(err);

    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0;

    // Check if we've maxed out the total number of retries
    if (config.__retryCount >= config.retry) {
        // Reject with the error
        return Promise.reject(err);
    }

    // Increase the retry count
    config.__retryCount += 1;

    // Create new promise to handle exponential backoff
    const backoff = new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, config.retryDelay || 1);
    });

    // Return the promise in which recalls axios to retry the request
    return backoff.then(function () {
        return axios(config);
    });
});