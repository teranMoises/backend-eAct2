const connection = require('../config/conexion');

class Patrocinador{
    constructor(nombre_comercial, persona_de_contacto, telefono, idPatrocinio, comentario){
        this.nombre_comercial = nombre_comercial;
        this.persona_de_contacto = persona_de_contacto;
        this.telefono = telefono;
        this.idPatrocinio = idPatrocinio;
        this.comentario = comentario
    }
}

class Padrino{
    constructor(idEquipo, idPatrocinador){
        this.idEquipo = idEquipo,
        this.idPatrocinador = idPatrocinador
    }
}

class PatrocinadorModel{
    ver_patrocinador(){ 
        return new Promise((resolve, reject) => {
            connection.query('SELECT `id_patrocinador`,`nombre_comercial`,`persona_de_contacto`,`telefono`,`nombre_patrocinio`,`monto`, `comentario` FROM `patrocinadores` JOIN `patrocinios` ON `idPatrocinio` = `id_patrocinio`', function(err, rows, fields) {
                if (err){
                    reject("La conexión a la base de datos a fallado")
                }else {
                    if(rows.length == 0){
                        resolve('No se encontró la información solicitada')
                    }else{
                        resolve(rows)   
                    }
                }
            })
        })  
    }
    ingresar_patrocinador(patrocinador){
        return new Promise((resolve, reject) => {
            let Nuevo_patrocinador = new Patrocinador(patrocinador.nombre_comercial, patrocinador.persona_de_contacto, patrocinador.telefono, patrocinador.idPatrocinio, patrocinador.comentario)
            connection.query('INSERT INTO `patrocinadores` SET ?',Nuevo_patrocinador, function(err, rows, fields) {
                if (err){
                    reject("La conexión a la base de datos a fallado")
                }else {
                    if(patrocinador.idPatrocinio == 5){
                        let retorna = {idEquipo: patrocinador.idEquipo, idPatrocinador: rows.insertId}
                        resolve(retorna)  
                    }else{
                        resolve()
                    }
                }
            })
        })
    }
    ingresar_padrino(patrocinador){
        return new Promise((resolve, reject) => {
            let Nuevo_padrino = new Padrino(patrocinador.idEquipo, patrocinador.idPatrocinador)
            connection.query('INSERT INTO `padrinos` SET ?',Nuevo_padrino, function(errFinal, rowsFinal, fieldsFinal) {
                if (errFinal){
                    reject("La conexión a la base de datos a fallado")
                }else {
                    resolve()
                }
            })   
        })
    }
    ingresar_patrocinador_views(patrocinador){   
/*         patrocinador.id = uuidv4();
        let nuevo_patrocinador = new Patrocinador(patrocinador.id, patrocinador.nombre_comercial, patrocinador.persona_de_contacto, patrocinador.telefono, patrocinador.patrocinio, patrocinador.comentario);
        patrocinadores.push(nuevo_patrocinador);
        return patrocinadores */
    }
    eliminar_patrocinador(id){
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM `patrocinadores` WHERE `id_patrocinador` = ?',id, function(err, rows, fields) {
                if (err){
                    reject("La conexión a la base de datos a fallado")
                }else {
                    resolve()  
                }
            })
        })  
    }
    editar_patrocinador(id,actualizar){
        return new Promise((resolve,reject) => { 
            let Actualizar_patrocinador = new Patrocinador(actualizar.nombre_comercial, actualizar.persona_de_contacto, 
   actualizar.telefono, actualizar.idPatrocinio, actualizar.comentario)
            connection.query('UPDATE `patrocinadores` SET ? WHERE `id_patrocinador` = ?',[Actualizar_patrocinador,id], function
   (err, rows, fields) {
                if (err){
                    reject("La conexión a la base de datos a fallado")
                }else {
                    return resolve()
                }
            }) 
        })
    }
}

module.exports = new PatrocinadorModel();