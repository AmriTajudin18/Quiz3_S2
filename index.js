const express = require('express') 
const app = express() 
const port = 3000 
 
app.use(express.json()) 
 
app.post('/login', (req, res) => { 
    console.log(req.body) 

    let result = login(req.body.username,req.body.password)
    let token = generateToken(result)
      
    res.send(token)
}) 

app.get('/', (req, res) => { 
    res.send('Hello World!') 
  }) 
 
app.get('/bye', verifyToken, (req, res) => { 
    res.send('Bye World!') 
  }) 
 
  app.post('/register', (req, res) => { 
    res.send('Account Created!') 
  }) 
 
app.listen(port, () => { 
  console.log(`Example app listening on port ${port}`) 
})

let dbUsers= 
[
  {
      username: "Alip",
      password: "11111",
      name: "Alif",
      email:"alip@gmail.com"
  },

  {
      username: "Riduan",
      password: "22222",
      name: "Wan",
      email:"riduan@gmail.com"
  },
  
  {
      username: "Merii",
      password: "180699",
      name: "Amri",
      email:"Merii@gmail.com"
  }
]

function login(reqUsername, reqPassword)
  {
      let matchUser = dbUsers.find(
      x=> x.username == reqUsername)

      if(!matchUser)return "User not found!"
      if(matchUser.password == reqPassword)
      {
          return matchUser
      }
      else 
      {
          return "Invalid password"
      }
  }

  function register(reqUsername, reqPassword, reqName, reqEmail)
  {
      dbUsers.push
      (
        {
          username:reqUsername,
          password:reqPassword,
          name: reqName,
          email: reqEmail
         }
      )
  }


const jwt = require('jsonwebtoken');
function generateToken(userData){
const token = jwt.sign(userData, 
  'inipassword');
  return token
}

function verifyToken(req, res, next){
  let header = req.headers.authorization
  console.log(header)

  let token = header.split('')[1]

  jwt.verify(token, 'inipassword', function(err, decoded){
    if(err){
      res.send("invalid Token")
    }

    req.user = decoded
    next()
  });
}