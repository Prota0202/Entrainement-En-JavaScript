import express from 'express';
import Task from './models/Task.js';

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.post("/add", async function (req, res) {
  const task = new Task();
  task.Name = req.body.Name;
  task.Quantity = req.body.Quantity;
  task.Bought = 0;
  await task.save();
  res.redirect('/');
});

app.get("/", async function (req, res) {
  const liste = await Task.loadMany({Bought : 0});
  const tasks = await Task.loadMany({Bought : 1});
  res.render('listTasks.ejs', { liste, tasks});
});


app.get("/delete/:id", async function (req, res) {
  await Task.delete({ id: req.params.id });
  res.redirect('/');
});


app.get('/liste/:id', async (req, res) => {
  const id = req.params.id;
  const task = await Task.load({ id: id });
  task.Bought = 0;
  await task.save();
  res.redirect('/'); // Rediriger vers la page principale
});

app.get("/buy/:id", async function (req, res) {
  const task = await Task.load({ id: req.params.id });
  task.Bought = 1;
  await task.save();
  res.redirect('/')
});

app.listen(4000);

