const connection = require('../config/conexion');

class Equipo{
    constructor(representante, email, telefono, nombre_de_equipo, participantes, comentario){
        this.representante = representante,
        this.email = email,
        this.telefono = telefono,
        this.nombre_de_equipo = nombre_de_equipo,
        this.participantes = participantes,
        this.comentario = comentario
    }
}

class Inscripcion{
    constructor(idCategoria, idEquipo){
        this.idCategoria = idCategoria
        this.idEquipo = idEquipo
    }
}

class EquipoModel{
    ver_equipos(){
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM `equipos`', function(err, rows, fields) {
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
    ver_equipos_views(){
        if(equipos.length > 0){ 
            return equipos;
        }else{
            return equipos;
        }
    }  
    ver_padrinos(){
        return new Promise((resolve, reject) => {
            connection.query('SELECT `id_equipo`,`representante`,`participantes`,`nombre_de_equipo`,`id_patrocinador`, `nombre_comercial`, `persona_de_contacto` FROM `padrinos` JOIN `equipos` ON `id_equipo` = `idEquipo` JOIN `patrocinadores` ON `id_patrocinador` = `idPatrocinador`', function(err, rows, fields) {
                if (err){
                    reject("La conexión a la base de datos a fallado")
                }else {
                    resolve(rows)  
                }
            })
        })
    }
    ingresar_equipo(equipo){
        return new Promise((resolve, reject) => { 
            let Nuevo_equipo = new Equipo(equipo.representante, equipo.email, equipo.telefono, equipo.nombre_de_equipo, equipo.participantes, equipo.comentario)
            connection.query('INSERT INTO `equipos` SET ?',Nuevo_equipo, function(err, rows, fields) {
                if (err){
                    reject("La conexión a la base de datos a fallado")
                }else {
                    let retorna = {categorias: equipo.categorias, idDelEquipo: rows.insertId}
                    resolve(retorna)
                }
            }) 
        })
    }
    ingresar_inscripcion(inscripcion){
        return new Promise((resolve, reject) => { 
            for (let i = 0; i < inscripcion.categorias.length; i++) { //Insertar varias inscripciones
            let idDeCategoria = inscripcion.categorias[i]
            let Nueva_inscripcion = new Inscripcion(idDeCategoria, inscripcion.idDelEquipo)
                connection.query('INSERT INTO `inscripciones` SET ?',Nueva_inscripcion, function(errFinal, rowsFinal, fieldsFinals) {
                    if (errFinal){
                        reject("La conexión a la base de datos a fallado")
                    }
                })
            }   
            resolve()
        })
    }
    editar_equipo(id, actualizar){
        return new Promise((resolve, reject) => {
            connection.query('UPDATE `equipos` SET ? WHERE id_equipo = ?', [actualizar,id],function(err, rows, fields) {
                if (err){
                    reject(err)
                }else {
                    resolve()  
                }
            }) 
        })
    }
    eliminar_equipo(id){
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM `equipos` WHERE `id_equipo` = ?',id, function(err, rows, fields) {
                if (err){
                    reject("La conexión a la base de datos a fallado")
                }else {
                    resolve()  
                }
            })
        })
    }
    eliminar_categoria_inscrita(idEquipo, idCategoria){
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM `inscripciones` WHERE `idEquipo` = ? AND `idCategoria` = ?',[idEquipo, idCategoria], function(err, rows, fields) {
                if (err){
                    reject("La conexión a la base de datos a fallado")
                }else {
                    resolve()  
                }
            })
        })
    } 
}

module.exports = new EquipoModel(); 