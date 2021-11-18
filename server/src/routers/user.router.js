import { app } from '../modules/app.module.js'
import UserController from '../controller/user.controller.js'
import { Auth } from '../modules/auth.module.js'
import { UploadFile } from '../modules/upload.module.js'

const UserRouter = (url) => {
    app.post(url, UserController.create)
    app.post(url + '/login', UserController.login)
    app.get(url,Auth(),UserController.findOneByToken)
    app.get(url + '/one/:id',UserController.findOneById)
    app.delete(url,Auth(),UserController.remove)
    app.patch(url + '/username',Auth(),UserController.updateUsername)
    app.patch(url + '/password',Auth(),UserController.updatePassword)
    app.patch(url + '/photo',Auth(),UploadFile('public/users','photo'),UserController.updatePicture)
}

export { UserRouter }