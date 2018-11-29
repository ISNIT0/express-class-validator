import express from 'express'
import { json } from 'body-parser'
import { IsEmail } from 'class-validator'
import { makeValidateBody } from '../lib'

const app = express()
app.use(json())

class User {
    @IsEmail()
    public email!: string

    public hello(): string {
        return "World!"
    }
}

app.post(
    '/user',
    makeValidateBody(User),
    (req, res) => {
        console.info(`Got user:`, req.body)
        console.info(`user.hello():`, req.body.hello())
        res.send(req.body)
    }
)

app.listen(1337, () => {
    console.info(`Listening on port [1337]`)
})