const Modalidad_Model = require('../models/Modalidad_model');

class ModalidadController {
    ver_modalidad() {
        //console.log('controlers GET')
        return new Promise((resolve, reject) => {
            let retorno = Modalidad_Model.ver_modalidad();
            //console.log('controlers',retorno)
            const fun = async () => {
                console.log('async Promesa', await retorno.then((d) => d[0].nombre_modalidad))
                try {
                    await retorno
                    console.log('async', retorno);
                } catch (error) {
                    console.error('async', error);
                }
            }
            //fun()
            if (retorno) {
                resolve(retorno);
            } else {
                reject('Ha ocurrido un error al consultar los datos');
            }
        })
    }
    ingresar_modalidad(modalidad) {
        console.log("en controller", modalidad);
        return new Promise((resolve, reject) => {
            if (modalidad == undefined) return reject('No se recibió información');
            if (typeof modalidad !== "object") return reject('Formato inválido');
            if (Object.keys(modalidad).length === 0) return reject('No se ingresó información');

            Modalidad_Model.ingresar_modalidad(modalidad)
                .then(() => { resolve(Modalidad_Model.ver_modalidad()) })
                .catch((error) => { reject(error); })
        })
    }
}

module.exports = new ModalidadController();