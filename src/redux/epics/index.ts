import { combineEpics } from 'redux-observable'
import {userEpic} from './user'


export const rootEpics = combineEpics(userEpic)