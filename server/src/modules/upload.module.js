import multer from 'multer'
import mimeTypes from 'mime-types'
import fs from 'fs'

const UploadFile = (dest,field) => {
    return (req,res,next) => {
        let upload = multer({dest : dest})
        upload.single(field)(req,res,() => {
            let file = req.file
            if(file && fs.existsSync(file.path)){
                let filename = dest + '/' + Date.now() + '.' + mimeTypes.extension(file.mimetype)
                fs.renameSync(file.path,filename)
                req.body[field] = filename
            }
            next()
        })
    }
}

const UploadFields = (dest,fields) => {
    return (req,res,next) => {
        let upload = multer({dest : dest})
        upload.fields(fields)(req,res,() => {
            let files = req.files
            if(files){
                for(let i = 0;i < fields.length;i++){
                    let field = fields[i]
                    let tmp = files[field.name]
                    if(tmp){
                        req.body[field.name] = []
                        let j = 0
                        tmp.map(file => {
                            let filename = dest + '/' + i + '_' + j + '_' + Date.now() + '.' + mimeTypes.extension(file.mimetype)
                            if(fs.existsSync(file.path)){
                                fs.renameSync(file.path,filename)
                                req.body[field.name].push(filename)
                            }
                            j++
                        })
                    }
                }
            }
            next()
        })
    }
}

const UploadFiles = (dest,field,maxCount) => {
    return (req,res,next) => {
        let upload = multer({dest : dest})
        upload.array(field,maxCount)(req,res,() => {
            let files = req.files
            let i = 0
            req.body[field] = []
            files.map(file => {
                let filename = dest + '/' + i + '_' + Date.now() + '.' + mimeTypes.extension(file.mimetype)
                fs.renameSync(file.path,filename)
                req.body[field].push(filename)
                i++
            })
            next()
        })
    }
}

export { UploadFile,UploadFields,UploadFiles }