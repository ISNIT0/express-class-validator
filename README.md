# Express Class Validator

This is a very simple middleware for using simplifying the use of [class-validator](https://github.com/typestack/class-validator) in express routes.

> It may not be worth **installing** this package
> 
> Please consider copy-pasting the source from [./lib/index.ts](https://github.com/ISNIT0/express-class-validator/blob/master/lib/index.ts)

## Install
```
npm i express-class-validator
```

## Usage
See [./sample/index.ts](https://github.com/ISNIT0/express-class-validator/blob/master/sample/index.ts) for a working example (`npx ts-node sample/index.ts`)
```typescript
import { makeValidateBody } from 'express-class-validator'

class User {
    @IsEmail()
    public email!: string

    public hello(): string {
        return "World!"
    }
}

app.post(
    '/user',
    makeValidateBody(User), // Will validate req.body against the User class
    (req, res) => {
        console.info(`Got user:`, req.body)
        console.info(`user.hello():`, req.body.hello())
        res.send(req.body)
    }
)
```

### Working Query
```bash
curl -X POST \
  http://localhost:1337/user \
  -H 'Content-Type: application/json' \
  -d '{"email":"bob@bob.com"}'
```

### Failing Query
```bash
curl -X POST \
  http://localhost:1337/user \
  -H 'Content-Type: application/json' \
  -d '{"email":"NOTANEMAIL"}'
```

The `makeValidateBody` method takes two arguments:
1. [REQUIRED] Class to validate (using [class-validator](https://github.com/typestack/class-validator) decorators)
2. [OPTIONAL] Custom error handler: `(err:{}, req, res, next) => void`


## License
See [./LICENSE](https://github.com/ISNIT0/express-class-validator/blob/master/LICENSE)