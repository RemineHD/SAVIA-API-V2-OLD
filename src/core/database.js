import mongoose from 'mongoose'

mongoose.connect("mongodb+srv://", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => console.log('DB Conectada')).catch(error => console.log(error))