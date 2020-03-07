const db = require('../DAO/connection');
exports.index = ( req, res ) => {
  let sql = 'SELECT * FROM tasks where deleted_at is null';
  if (req.query.status){
    if (req.query.status == 'pending') {
      sql ='SELECT * FROM tasks where done = 0 and deleted_at is null '      
    }else{
      if(req.query.status == 'finish')
      sql ='SELECT * FROM tasks where done = 1 and deleted_at is null'
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
  const created = time();
  db.connection.query(`INSERT INTO tasks (name, description, done, created_at, update_at)
                       value ('${name}', '${description}',${done}, '${created}', '${created}')`,
  (err,rows)=>{
    if(err){
      throw err;
    } 
    res.json('se agrego')
  });
}

time =()=>{
  const hoy = new Date();
  var fecha = hoy.getFullYear() + '-'+ (hoy.getMonth()+1) +'-'+ hoy.getDate();
  var hora = hoy.getHours()+':'+ hoy.getMinutes()+':'+hoy.getSeconds();
  var created = fecha + ' ' + hora
  return created;
}
exports.update = (req, res)=>{
  const { name, description} = req.body;
  const update = time();
  db.connection.query(`UPDATE  tasks SET name='${name}', description = '${description}', update_at = '${update}' where id =${req.params.id} `,
  (err,rows)=>{
    if(err){
      throw err;
    } 
    res.json('se actualizó')
  });
}
exports.delete=(req,res)=>{
  const deteled = time()
  db.connection.query(`UPDATE  tasks SET  deleted_at = '${deteled}' where id =${req.params.id} `, (err,rows)=>{
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
