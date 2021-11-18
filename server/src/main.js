import { app } from './modules/app.module.js'
import { load } from './modules/database.module.js'
import { UserRouter } from './routers/user.router.js'
import { PostRouter } from './routers/post.router.js'

async function main () {
    try{
        await load()
        UserRouter('/user')
        PostRouter('/post')
        app.listen(process.env.PORT,() => console.log('Listening on : ' + process.env.PORT))
    }catch(e){ console.log(e) }
}

export { main }