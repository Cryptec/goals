const router = require('express').Router()
var db = require('../Database')

require('dotenv').config()


// Routes
router.get('/ping', function (req, res) {
    return res.send('pong');
});

router.post('/settask', function(req,res){
  var data = {
    task: req.body.task,
    done: req.body.done,
    stichtag: req.body.stichtag,
    timeframe: req.body.timeframe,
    id: req.body.id
}
  var params = [data.task, data.done, data.stichtag, data.timeframe, data.id]
  db.serialize(()=>{
      db.run('INSERT INTO Tasks (task, done, stichtag, timeframe, id) VALUES (?, ?, ?, ?, ?)', params, function(err){
      if(err){
        res.send("Error encountered while updating");
        return res.status(400).json({ error: true });
      }
      return res.send({"answer": "success"});
    });
  });
});

router.get("/tasks", (req, res, next) => {
  var sql = "select * from Tasks"
  var params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.status(200).json(rows);
  });
});

router.delete("/task/:id", (req, res, next) => {
  db.run(
      'DELETE FROM Tasks WHERE id = ?',
      req.params.id,
      function (err, result) {
          if (err){
              res.status(400).json({"error": res.message})
              return;
          }
          res.status(200).json({"message":"deleted", changes: this.changes})
  });
})

router.post('/setstate/:id', function (req, res) {
  var data = {
    done: req.body.done,
    id: req.body.id
  }
  var params = [data.done, data.id]
    db.run('UPDATE Tasks SET done = ? WHERE id = ?', params, function (err) {
      if (err) {
        res.send("Error encountered while updating");
        return res.status(400).json({ error: true });
      }
      return res.send({"answer": "success"});
    });
});



module.exports = router;