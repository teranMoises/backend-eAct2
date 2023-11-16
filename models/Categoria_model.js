const connection = require('../config/conexion');

class Categoria {
    constructor(idModalidad, nombre_categoria, descripcion, reglas, premio) {
        this.idModalidad = idModalidad,
            this.nombre_categoria = nombre_categoria,
            this.descripcion = descripcion,
            this.reglas = reglas,
            this.premio = premio
    }
}

class CategoriaModel {
    ver_categorias() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM `categorias`', function (err, rows, fields) {
                if (err) {
                    reject("La conexión a la base de datos a fallado")
                } else {
                    resolve(rows)
                }
            })
        })
    }
    buscar_categoria(id_cat_URI, nom_cat_body) {
        //FALTA   Validar que sea un numero
        return new Promise((resolve, reject) => {
            if (nom_cat_body == null) { console.log('No por body'); resolve(id_cat_URI) }
            if (id_cat_URI == null) {
                let consulta = connection.query('SELECT * FROM `categorias` WHERE ?', nom_cat_body, function (error, results, fields) {
                    if (error) {
                        console.error("Error SQL: ", error);
                        reject(error);
                    };
                    if (results.length > 0) {
                        //console.log("ENCONTRADO", results);
                        console.log('ID ENCONTRADO:', results[0].id_categoria);
                        resolve(results[0].id_categoria);
                    } else {
                        //console.error("Error: No se encontraron coincidencias", results);
                        reject("Error: No se encontraron coincidencias");
                    };
                });
                //console.log(consulta.sql)
            } else {
                reject('No ingresó ningún dato');
            }
        })
    }
    ver_equipos_por_categoria(id_cat, nom_cat) {
        console.log('CAT models:', id_cat, nom_cat);
        return new Promise(async (resolve, reject) => {
            try {
                let id = await this.buscar_categoria(id_cat, nom_cat);
                console.log('CAT buscar:', id);
                if (isNaN(Number(id))) reject(id);
                connection.query('SELECT `nombre_categoria`,`id_equipo`,`representante`, `email`, `telefono`, `nombre_de_equipo`, `participantes`, `comentario` FROM `inscripciones` JOIN `categorias` ON `id_categoria` = `idCategoria` JOIN `equipos` ON `id_equipo` = `idEquipo` WHERE `id_categoria` = ?', id, function (err, rows, fields) {
                    if (err) {
                        reject(err);
                    } else {
                        //console.log('RESULTADOS',rows, rows.length)
                        if (rows.length < 1) {
                            //console.log('VACIO')
                            reject('No se encontró la información solicitada');
                        }
                        resolve(rows);
                    }
                })
            } catch (error) {
                console.log(error);
                reject(error);
            }
        })
    }
    ingresar_categoria(categoria) {

    }
    editar_categoria(id, actualizar) {

    }
    eliminar_categoria(id) {

    }
}

module.exports = new CategoriaModel();