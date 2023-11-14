var { ModalityModels } = require("../models/modalidadesModels");


class ModalityController {
    static mostrar() {
        return new Promise((resolve, reject) => {
            let retorno = ModalityModels.todos();
            //console.log('controlers',retorno)
            const fun = async () => {
                console.log('async Promesa', await retorno.then((d)=>d[0].nombre_mode))
                try {
                    await retorno
                    console.log('async',retorno);
                } catch (error) {
                    console.error('async',error);
                }
            }
            //fun()
            if (retorno) {
                resolve(retorno);
            } else {
                reject('No se ha creado ninguna modalidad');
            }
        })
    }
    static mostrarCAT(modality) {
        console.log('En mostrarCAT',modality)
        return new Promise((resolve, reject) => {
            let retorno = ModalityModels.verCAT(modality);
            console.log('En COntroller',retorno);
            if (Array.isArray(retorno)) {
                resolve(retorno);
            } else {
                reject('No se encontró la modalidad indicada');
            }
        })
    }
    static validarNULL(datos) {
        if (datos == undefined) {
            return 'No se recibió información';
        }
        if (typeof datos !== "object") {
            return 'No es un objeto';
        }
        if (Object.keys(datos).length === 0 || datos.nombre == null) {
            return 'No se ingresó información';
        }
        return true;
    }
    static crear(data) {
        //let new_modality = data.nombre;
        //let ver = Usuario.guardar_usuario(nuevo_usuario);
        //res.send(ver);  
        //res.render('usersPOST', { registro: u.usuario, ident: u.id});
        console.log("en controller", data);
        return new Promise((resolve, reject) => {
            /*
            if (data == undefined) {
                return reject('No se recibió información');
            }
            if (typeof data !== "object") {
                return reject('No es un objeto');
            }
            if (Object.keys(data).length === 0 || data.nombre == null) {
                return reject('No se ingresó información');
            }
            */
            let validado = this.validarNULL(data);
            //console.log('de validar',validado)
            if (validado !== true) {
                //return reject(validado);
            }
            ModalityModels.crear(data)
                .then(() => { resolve(ModalityModels.todos()) })
                .catch((error) => { reject(error); })
        })
    }
    static crearCAT(data, modality) {
        console.log("en controller", data);
        return new Promise((resolve, reject) => {
            let validado = this.validarNULL(data);
            if (validado !== true) {
                return reject(validado);
            }
            if (modality != undefined && typeof modality == 'string') {
                ModalityModels.agregarCAT(data, modality)
                    .then(() => { resolve(ModalityModels.todos()) })
                    .catch((error) => { reject(error); })
            } else {
                return reject('No se ingresó una modalidad válida');
            }
        })
    }
    static editarCAT(data, modality, category) {
        console.log("en controller", data, modality, category);
        return new Promise((resolve, reject) => {
            let validado = this.validarNULL(data);
            if (validado !== true) {
                return reject(validado);
            }
            if (modality != undefined && typeof modality == 'string') {
                ModalityModels.modificarCAT(data, modality, category)
                    .then((retorno) => { resolve(retorno) })
                    .catch((error) => { reject(error); })
            } else {
                return reject('No se ingresó una modalidad válida');
            }
        })
    }
    static eliminarCAT(modality, category) {
        console.log("en controller", modality, category);
        return new Promise((resolve, reject) => {
            if (modality != undefined && typeof modality == 'string') {
                ModalityModels.quitarCAT(modality, category)
                    .then((retorno) => { resolve(retorno) })
                    .catch((error) => { reject(error); })
            } else {
                return reject('No se ingresó una modalidad válida');
            }
        })
    }
}

module.exports = ModalityController;