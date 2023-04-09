import express from "express"
import cors from "cors"

// Variables Globais in memory
const tweets = [
    {username: "bobesponja", tweet: "Eu amo hambúrguer de siri!"}
]

const users = []

// Inicialize express
const App = express()

//Configs
App.use(cors())
App.use(express.json())

// Server Working in Req and Res

App.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body

    if ( username && avatar ) {
        users.push({ username, avatar })

        res.status(201).send({ message: "ok" })
    } else {
        res.status(401)
    }
    
})

App.get("/tweets", (req, res) => {
    res.send(tweets)
})



// Open Server
const PORT = 5000
App.listen(PORT, () => {
    console.log("Running server in port: " + PORT)
})