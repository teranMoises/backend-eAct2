const connection = require('../config/conexion');

class Equipo {
    constructor(representante, email, telefono, nombre_de_equipo, participantes, comentario) {
        this.representante = representante;
        this.email = email;
        this.telefono = telefono;
        this.nombre_de_equipo = nombre_de_equipo;
        this.participantes = participantes;
        this.comentario = comentario
    }
}

class Inscripcion {
    constructor(idCategoria, idEquipo) {
        this.idCategoria = idCategoria
        this.idEquipo = idEquipo
    }
}

class EquipoModel {
    ver_equipos() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM `equipos`', function (err, rows, fields) {
                if (err) {
                    reject(err)
                } else {
                    if (rows.length == 0) {
                        resolve('No existen equipos registrados')
                    } else {
                        resolve(rows)
                    }
                }
            })
        })
    }
    ver_cat_equipos(idTeam) {
        //console.log("Id Recibido", idTeam);
        return new Promise((resolve, reject) => {
            let query = connection.query('SELECT `id_equipo`, `nombre_de_equipo`, `nombre_categoria`, `nombre_modalidad` FROM `inscripciones` INNER JOIN `categorias` ON `id_categoria` = `idCategoria` INNER JOIN `modalidades` ON `id_modalidad` = `idModalidad` INNER JOIN `equipos` ON `id_equipo` = `idEquipo` WHERE `id_equipo` = ?;', [idTeam], function (err, rows, fields) {
                if (err) {
                    reject(err);
                } else {
                    if (rows.length == 0) {
                        reject(null);
                    } else {
                        //console.table(rows);
                        resolve(rows);
                    }
                }
            })
            //console.log(query.sql)
        })
    }
    ver_equipos_views() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT `id_equipo`, `nombre_de_equipo`, `representante`, `email`, `telefono`,  `participantes`, `comentario` FROM `equipos`', function (err, rows, fields) {
                if (err) {
                    reject(err)
                } else {
                    if (rows.length == 0) {
                        resolve(null)
                    } else {
                        resolve(rows)
                    }
                }
            })
        })
    }
    ver_padrinos() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT `id_equipo`,`representante`,`participantes`,`nombre_de_equipo`,`id_patrocinador`, `nombre_comercial`, `persona_de_contacto` FROM `padrinos` JOIN `equipos` ON `id_equipo` = `idEquipo` JOIN `patrocinadores` ON `id_patrocinador` = `idPatrocinador`', function (err, rows, fields) {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }
    ingresar_equipo(equipo) {
        return new Promise((resolve, reject) => {
            let Nuevo_equipo = new Equipo(equipo.representante, equipo.email, equipo.telefono, equipo.nombre_de_equipo, equipo.participantes, equipo.comentario)
            connection.query('INSERT INTO `equipos` SET ?', Nuevo_equipo, function (err, rows, fields) {
                if (err) {
                    reject(err)
                } else {
                    let retorna = { categorias: equipo.categorias, idDelEquipo: rows.insertId }
                    resolve(retorna)
                }
            })
        })
    }
    ingresar_inscripcion(inscripcion) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < inscripcion.categorias.length; i++) { //Insertar varias inscripciones
                let idDeCategoria = inscripcion.categorias[i]
                let Nueva_inscripcion = new Inscripcion(idDeCategoria, inscripcion.idDelEquipo)
                connection.query('INSERT INTO `inscripciones` SET ?', Nueva_inscripcion, function (errFinal, rowsFinal, fieldsFinals) {
                    if (errFinal) {
                        reject(err)
                    }
                })
            }
            resolve()
        })
    }
    editar_equipo(id, actualizar) {

    }
    eliminar_equipo(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM `equipos` WHERE `id_equipo` = ?', id, function (err, rows, fields) {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }
    eliminar_categoria_inscrita(idEquipo, idCategoria) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM `inscripciones` WHERE `idEquipo` = ? AND `idCategoria` = ?', [idEquipo, idCategoria], function (err, rows, fields) {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }
}

module.exports = new EquipoModel(); 