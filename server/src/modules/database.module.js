import mongoose from 'mongoose'

async function load(){
    try{
        let db = await mongoose.connect(process.env.CS,{
            useNewUrlParser : true,
            useUnifiedTopology : true,
            useCreateIndex : true
        })
        return db
    }catch(e) { throw e }
}

export { load }