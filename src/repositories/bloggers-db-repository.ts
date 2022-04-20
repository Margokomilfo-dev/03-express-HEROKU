import {bloggers} from './db'
import {BloggerType} from './bloggers-repository'

export const bloggersRepository = {

    async findBloggers(pageNumber:number, pageSize:number,SearchNameTerm: string | undefined) {
        let filter = {}
        if (SearchNameTerm) {
            filter = {name: {$regex: SearchNameTerm}}
        }
       return bloggers.find(filter, {projection:{_id:0}}).skip(pageSize*(pageNumber-1)).limit(pageSize).toArray()
    },

    async getAllBloggers(): Promise<Array<BloggerType>> {
        return bloggers.find({}).toArray()

    },
    async createBlogger(newBlogger: BloggerType): Promise<BloggerType | null> {
        const created = await bloggers.insertOne(newBlogger, {forceServerObjectId:true})
        if (created) {
            return newBlogger
        } else {
            return null
        }
    },

    async findBloggerById(id: number) {
        return  bloggers.findOne({id},{projection:{_id:0}})
    },

    async updateBlogger(id: number, name: string, url: string) {
        const myBlogger = await bloggers.findOneAndUpdate(
            {id},
            {$set: {name, youtubeUrl: url}},
            {upsert: true})
        return !!myBlogger
    },

    async deleteBlogger(id: number) {
        const deleted = await bloggers.deleteOne({id})
        return deleted.deletedCount > 0;
    }

}