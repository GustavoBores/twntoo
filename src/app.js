import express from "express"
import cors from "cors"

// Variables Globais in memory
const tweets = [
    {username: "bobesponja", tweet: "Eu amo hambúrguer de siri!"},
    {username: "hello", tweet: "borboletas"}
]

const users = [
    {
        username: "bobesponja",
        avatar: "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png",
    },
    {
        username: "hello",
        avatar: "https://imgsapp2.correiobraziliense.com.br/app/noticia_127983242361/2014/07/17/437813/20140717113845967200u.jpg"
    },
]

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

        res.status(201).send("ok")
    } else {
        res.status(401)
    }
    
})

App.get("/tweets", (req, res) => {
    const catchIndexTeen = tweets.filter((tweet, index) => {
        if ( index < 10 ) {
            return tweet
        }
    })

    const addAvatar = catchIndexTeen.map(tweet => {
        let cacthUser = users.find(user => user.username === tweet.username)

        return {
            username: tweet.username,
            tweet: tweet.tweet,
            avatar: cacthUser.avatar
        }
    })

    res.status(200).send("ok")
})

App.post("/tweets", (req, res) => {
    const { username, tweet } = req.body

    const includesUsername = users.find(user => user.username === username)

    if ( !username && !tweet || includesUsername === undefined) {
        return res.status(401).send("UNAUTHORIZED")
    }

    tweets.push({ username, tweet })

    res.status(201).send("ok")
})

// Open Server
const PORT = 5000
App.listen(PORT, () => {
    console.log("Running server in port: " + PORT)
})