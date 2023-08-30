import { createFeatureSelector, createSelector} from '@ngrx/store'
import { BlogModel } from './blog.model'

const getblogstate = createFeatureSelector<BlogModel[]>('blog');

export const getblog = createSelector(getblogstate,(state)=>{
    return state
})