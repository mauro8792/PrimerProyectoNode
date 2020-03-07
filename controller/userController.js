const db = require('../DAO/connection');
exports.index = ( req, res ) => {
  let sql = 'SELECT * FROM users';  
  db.connection.query(sql, (err,rows) => {
    if(err) throw err;
    res.json( {'users': rows })
  });    
}

exports.getUser = (req, res)=>{
    db.connection.query(`SELECT * FROM users WHERE ID=${req.params.id}`, (err,rows)=>{
      if(err) throw err;      
      res.json({'users':rows})
    });
}

exports.store=(req, res)=>{
    const {name, last_name, userName, password} = req.body;
    const role = '1'
    const created = time();
    db.connection.query(`INSERT INTO users (name, last_name, userName, password, fk_id_role, created_at, update_at)
                         value ('${name}', '${last_name}','${userName}','${password}','${role}', '${created}', '${created}')`,
    (err,rows)=>{
      if(err){
        throw err;
      } 
      res.json('se agrego')
    });
}
exports.update = (req, res)=>{
    const { name, last_name} = req.body;
    const update = time();
    db.connection.query(`UPDATE  users SET name='${name}', last_name = '${last_name}', update_at = '${update}' where id =${req.params.id} `,
    (err,rows)=>{
      if(err){
        throw err;
      } 
      res.json('se actualizó')
    });
}

exports.delete=(req,res)=>{
    const deteled = time()
    db.connection.query(`UPDATE  users SET  deleted_at = '${deteled}' where id =${req.params.id} `, (err,rows)=>{
      if(err) throw err;
      res.json('se elimino correctamente')
    })
  }
exports.login=(req, res)=>{
  const { userName, password} = req.body;
  db.connection.query(`SELECT * FROM users where userName = '${userName}' and password='${password}'`, (err,rows)=>{
    if(err) throw err;    
    //console.log();
    
    res.json({'user': rows})
    //res.json({'user':rows})
  });
}

time =()=>{
    const hoy = new Date();
    var fecha = hoy.getFullYear() + '-'+ (hoy.getMonth()+1) +'-'+ hoy.getDate();
    var hora = hoy.getHours()+':'+ hoy.getMinutes()+':'+hoy.getSeconds();
    var created = fecha + ' ' + hora
    return created;
  }


