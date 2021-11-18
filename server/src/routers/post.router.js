import { app } from '../modules/app.module.js'
import { Auth } from '../modules/auth.module.js'
import { UploadFile,UploadFiles } from '../modules/upload.module.js'
import PostController from '../controller/post.controller.js'

const PostRouter  = (url ) => {
    app.post(url,Auth(),PostController.create)
    app.patch(url + '/one/:id',Auth(),PostController.update)
    app.delete(url + '/one/:id',Auth(),PostController.remove)
    app.get(url + '/one/:id',PostController.findOne)
    app.get(url + '/all',PostController.findAll)
    app.get(url + '/search/:q',PostController.search)
    app.get(url + '/like/:id',Auth(),PostController.like)
    app.get(url + '/me',Auth(),PostController.findByUser)
    app.post(url + '/comment/:id',Auth(),PostController.comment)
    app.delete(url + '/comment/:id/:id_comment',Auth(),PostController.removeComment)
    app.patch(url + '/song/:id',Auth(),UploadFile('public/songs','song'),PostController.importSong)
    app.patch(url + '/pictures/:id',Auth(),UploadFiles('public/pictures','pictures',8),PostController.importPictures)
}

export { PostRouter }