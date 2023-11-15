const connection = require('../config/conexion');

class Modalidad {
    constructor(nombre) {
        this.nombre_modalidad = nombre
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

                console.log('models',results);
            });
        })
    }
    ingresar_modalidad(modalidad) {

    }
}

module.exports = new ModalidadModel();