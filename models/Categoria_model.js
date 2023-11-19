const connection = require('../config/conexion');

class Categoria {
    constructor(idModalidad, nombre_categoria, descripcion, reglas, premio) {
        this.idModalidad = idModalidad;
        this.nombre_categoria = nombre_categoria;
        this.descripcion = descripcion;
        this.reglas = reglas;
        this.premio = premio;
    }
    get validar() {
        let faltantes = "No ingresó ningún valor en: ";
        for (const propiedad in this) {
            if (Object.hasOwnProperty.call(this, propiedad)) {
                const elemento = this[propiedad];
                if (!elemento) {
                    //console.log("FOR. No ingresó ningún valor en: " + propiedad)
                    faltantes += propiedad + "; ";
                }
            }
        }
        faltantes = faltantes.substring(0, faltantes.length - 2);
        if (faltantes.length > 26) { 
            //console.log("Error constructor.", faltantes); 
            return faltantes 
        }
        //console.log("Aprobado (constructor)."); 
        return true;
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
    buscar_categoria_id(id_cat) {
        return new Promise((resolve, reject) => {
            if (isNaN(Number(id_cat))) reject('Ingresó un ID inválido: ' + id_cat);
            connection.query('SELECT * FROM `categorias` WHERE ?', { id_categoria: id_cat }, function (error, results, fields) {
                if (error) {
                    console.error("Error SQL: ", error);
                    reject(error);
                };
                if (results.length > 0) {
                    //console.log("ENCONTRADO", results);
                    resolve(results);
                    //resolve(results[0].id_categoria);
                } else {
                    //console.error("Error: No se encontraron coincidencias", results);
                    reject("Error: No se encontraron coincidencias");
                };
            });
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
        return new Promise((resolve, reject) => {
            let Nueva_categoria = new Categoria(categoria.idModalidad, categoria.nombre_categoria, categoria.descripcion, categoria.reglas, categoria.premio)
            let validacion = Nueva_categoria.validar;
            console.log('Constructor.', validacion);
            if (validacion !== true) { reject(validacion); return };
            connection.query('INSERT INTO `categorias` SET ?', Nueva_categoria, function (err, rows, fields) {
                if (err) {
                    reject(err);
                } else {
                    console.table(rows);
                    resolve(rows);
                }
            })
        })
    }
    editar_categoria(id, categoria) {
        const buscar = async (id_cat_up, bien, mal) => {
            try {
                bien(await this.buscar_categoria_id(id_cat_up));
            } catch (error) {
                mal(error);
            }
        }
        return new Promise((resolve, reject) => {
            //console.log("en models", id, categoria);
            let act_categoria = new Categoria(categoria.idModalidad, categoria.nombre_categoria, categoria.descripcion, categoria.reglas, categoria.premio);
            let validacion = act_categoria.validar;
            console.log('Constructor.', validacion);
            if (validacion !== true) { reject(validacion); return };
            let query = connection.query('UPDATE `categorias` SET ? WHERE id_categoria = ?', [act_categoria, id], function (error, results, fields) {
                if (error) { reject(error); return }
                console.log('\n ACTUALIZAR: '); console.table(results);
                if (!results) { reject("Error!"); return };
                if (results.affectedRows < 1) {
                    console.log('La categoría "' + id + '" no existe');
                    reject('No existe ninguna categoría con el ID indicado: ' + id);
                }
                if (results.changedRows < 1) {
                    resolve('No se modificó la categoría "' + id + '", debido a que los datos ingresados son iguales.');
                }
                //resolve('Se ha modificado la categoría "' + id + '" (' + actualizar.nombre_categoria + ')');
                buscar(id, resolve, reject);
            });
            //console.log("consulta", query.sql);
        })
    }
    modificar_categoria(id, actualizar) {
        const buscar = async (id_cat_up, bien, mal) => {
            try {
                bien(await this.buscar_categoria_id(id_cat_up));
            } catch (error) {
                mal(error);
            }
        }
        return new Promise((resolve, reject) => {
            //console.log("en models", id, actualizar);
            let query = connection.query('UPDATE `categorias` SET ? WHERE id_categoria = ?', [actualizar, id], function (error, results, fields) {
                if (error) reject(error);
                //console.log('ACTUALIZAR: \n', results);
                if (results.affectedRows < 1) {
                    console.log('La categoría "' + id + '" no existe');
                    reject('No existe ninguna categoría con el ID indicado: ' + id);
                }
                if (results.changedRows < 1) {
                    resolve('No se modificó la categoría "' + id + '", debido a que los datos ingresados son iguales.');
                }
                //resolve('Se ha modificado la categoría "' + id + '" (' + actualizar.nombre_categoria + ')');
                buscar(id, resolve, reject);
            });
            //console.log("consulta", query.sql);
        })
    }
    eliminar_categoria(id){
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM `categorias` WHERE `id_categoria` = ?',id, function(err, rows, fields) {
                if (err){
                    reject("La conexión a la base de datos a fallado")
                }else {
                    resolve()  
                }
            })
        })
    }
}

module.exports = new CategoriaModel();