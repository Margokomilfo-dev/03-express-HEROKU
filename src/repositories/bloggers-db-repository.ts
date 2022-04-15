import {bloggers} from './db'
import {BloggerType} from './bloggers-repository'

export const bloggersRepository = {

    async findBloggers(searchTerm: string | undefined): Promise<Array<BloggerType>> {
        let filter = {}
        if (searchTerm) {
            filter = {name: {$regex: name}}
        }
        return bloggers.find(filter).toArray()

    },
    async createBlogger(name: string, url: string): Promise<BloggerType | null> {
        const newBlogger: BloggerType = {
            id: +(new Date()),
            name: name,
            youtubeUrl: url,
        }
        const created = await bloggers.insertOne(newBlogger)
        if (created) {
            return newBlogger
        } else {
            return null
        }
    },

    async findBloggerById(id: number) {
        const blogger = await bloggers.findOne({id})
        if (blogger) {
            return blogger
        } else {
            return null
        }
    },

    async updateBlogger(id: number, name: string, url: string) {
        const isBlogger = await bloggers.findOne({id})
        if(!isBlogger){
            return false
        }
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