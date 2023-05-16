import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducer'

import { container } from '@tictac/ioc'
import { routerMiddleware } from 'react-router-redux'
import history from '../util/history'

const router = routerMiddleware(history)
export const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            thunk: {
                extraArgument: container
            }
        })
        .concat(router)


})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store