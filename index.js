require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

//peach user schema
const userSchema = new mongoose.Schema({
    username: { type: String, default: 'musa'},
    points: { type: Number, default: 0}
})
const User = mongoose.model('User', userSchema)
app.use(cors())
app.use(express.json())
//PeRg3KM4yFGcAcjy
//mongodb://faixankhann5_db_user:PeRg3KM4yFGcAcjy@ac-u6lmhqs-shard-00-00.3u3sf0o.mongodb.net:27017,ac-u6lmhqs-shard-00-01.3u3sf0o.mongodb.net:27017,ac-u6lmhqs-shard-00-02.3u3sf0o.mongodb.net:27017/peach?ssl=true&replicaSet=atlas-fwopbs-shard-0&authSource=admin&appName=Cluster0
//mongodb+srv://faixankhann5_db_user:IbQBdCCHRqm6et90@cluster0.3u3sf0o.mongodb.net/peach?retryWrites=true&w=majority&appName=Cluster0
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('mongodb connected successfully'))
.catch(err => console.log('DB error', err))

app.get('/' , (req, res) => {
    res.json({message: 'app is working well'})
})
app.post('/peach/point', async (req, res) => {
    const {amount} = req.body
    let user = await User.findOne({ username: 'musa'})
    if (!user) user = await User.create({username: 'musa' , points: 0})

        //save
        user.points += amount
        await user.save()

    res.json({
        message:`Added ${amount} points to musa`,
        newTotal: user.points
    })
})
app.get('/peach/status' , async (req, res) => {
    let user = await User.findOne({ username: 'musa'})
    if (!user) return res.json({points: 0})
    res.json({
        username:user.username,
        points:user.points,
        Status : 'Working'
        
        
    })
})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`server on ${PORT}`))