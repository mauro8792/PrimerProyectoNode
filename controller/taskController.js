const db = require('../DAO/connection');
exports.index = ( req, res ) => {
  let sql = 'SELECT * FROM tasks';
  if (req.query.status){
    if (req.query.status == 'pending') {
      sql ='SELECT * FROM tasks where done = 0'      
    }else{
      if(req.query.status == 'finish')
      sql ='SELECT * FROM tasks where done = 1'
    }
  }
      
  
  db.connection.query(sql, (err,rows) => {
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
  const {name, description, done} = req.body;
  
  db.connection.query(`INSERT INTO tasks (name, description, done)
                       value ('${name}', '${description}',${done})`,
  (err,rows)=>{
    if(err){
      throw err;
    } 
    res.json('se agrego')
  });
}
exports.update = (req, res)=>{
  const { name, description} = req.body;
  db.connection.query(`UPDATE  tasks SET name='${name}', description = '${description}' where id =${req.params.id} `,
  (err,rows)=>{
    if(err){
      throw err;
    } 
    res.json('se actualizó')
  });
}
exports.delete=(req,res)=>{
  db.connection.query(`DELETE FROM tasks WHERE ID=${req.params.id}`, (err,rows)=>{
    if(err) throw err;
    res.json('se elimino correctamente')
  })
}
exports.pending=(req, res)=>{
  db.connection.query('SELECT * FROM tasks WHERE done = 0', (err,rows)=>{
    if(err) throw err;
    console.log(rows);
    
    res.json({'tasks':rows})
  });
}

exports.changeDone=(req, res)=>{
  const { done} = req.body;
  console.log(req.body);
  
  db.connection.query(`UPDATE  tasks SET done='${done}' where id =${req.params.id} `,
  (err,rows)=>{
    if(err){
      throw err;
    } 
    res.json('se actualizó')
  });
}
