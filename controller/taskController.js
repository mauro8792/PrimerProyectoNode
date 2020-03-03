const db = require('../DAO/connection');

exports.index = ( req, res ) => {
  db.connection.query('SELECT * FROM tasks', (err,rows) => {
    if(err) throw err;
    res.json( {'tasks': rows })
  });
}

exports.getTaskId = (req, res)=>{
  db.connection.query(`SELECT * FROM tasks WHERE ID=${req.params.id}`, (err,rows)=>{
    if(err) throw err;      
    res.json({'tasks':rows})
  });
}

exports.storeTask=(req, res)=>{
  db.connection.query(`INSERT INTO tasks (titulo, descripcion, isDone) value ('${req.query.titulo}', '${req.query.descripcion}','${req.query.isDone}')`, (err,rows)=>{
  if(err) throw err;
  res.json({'tasks':rows})
  });
}

exports.delete=(req,res)=>{
  db.connection.query(`DELETE FROM tasks WHERE ID=${req.params.id}`, (err,rows)=>{
    if(err) throw err;
    res.json('se elimino correctamente')
  })
}
