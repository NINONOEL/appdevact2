const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

let items = [];
let nextId = 1;

app.get('/', (req, res) => {
  res.render('index', { items });
});

app.get('/create', (req, res) => {
  res.render('create');
});

app.post('/create', (req, res) => {
  const { name } = req.body;
  items.push({ id: nextId++, name });
  res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (item) {
    res.render('edit', { item });
  } else {
    res.status(404).send('Item not found');
  }
});

app.post('/edit/:id', (req, res) => {
  const { name } = req.body;
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (item) {
    item.name = name;
    res.redirect('/');
  } else {
    res.status(404).send('Item not found');
  }
});

app.post('/delete/:id', (req, res) => {
  items = items.filter(i => i.id !== parseInt(req.params.id));
  res.redirect('/');
});

app.get('/view/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (item) {
    res.render('view', { item });
  } else {
    res.status(404).send('Item not found');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.use(express.static(path.join(__dirname, 'public')));