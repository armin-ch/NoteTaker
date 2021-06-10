const express = require('express')
const app = express()
const { join } = require('path')
const { uid } = require('uid')
let db = require('./db/db.json')

app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.listen(process.env.PORT || 3000)

app.get('/notes', (req,res) =>{
  res.sendFile(join(__dirname, './public/notes.html'))
})
app.get('/api/notes', (req,res)=>{
  res.json(db)
})
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, './public/index.html'))
})
app.post('/api/notes', (req, res) => {
  db.push({'title': req.body.title, 'text': req.body.text, id: uid()})
  res.json(db)
  console.log(db)
})
app.delete('/api/notes/:id', (req,res)=>{
  console.log(req.params)
  for (let i=0; i<db.length; i++){
    if (db[i].id == req.params.id){
      db.splice(i,1)
      res.json(db)
    }
  }
})