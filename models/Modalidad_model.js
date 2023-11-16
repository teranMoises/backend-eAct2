const connection = require('../config/conexion');

class Modalidad {
    constructor(nombre) {
        this.nombre_modalidad = nombre;
    }
}

class ModalidadModel {
    ver_modalidad() {
        //console.log('en models')
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM `modalidades`', function (error, results, fields) {
                if (error) {
                    reject(error)
                } else {
                    resolve(results)
                };

                console.log('models', results);
            });
        })
    }
    ingresar_modalidad(modalidad) {
        return new Promise((resolve, reject) => {
            console.log("en models", modalidad);
            let Nueva_modalidad = new Modalidad(modalidad.nombre_modalidad);
            let query = connection.query('INSERT INTO modalidades SET ?', Nueva_modalidad, function (error, results, fields) {
                if (error) {console.error(error); reject(error)};
                if (results) {
                    console.log('ID CREADO:', results.insertId);
                    resolve(results);
                };
            });
            console.log(query.sql);
        })
    }
}

module.exports = new ModalidadModel();