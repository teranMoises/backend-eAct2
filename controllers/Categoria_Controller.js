const Categoria_model = require('../models/Categoria_model');

class CategoriaController {
    ver_categorias() {
        return new Promise((resolve, reject) => {
            Categoria_model.ver_categorias()
                .then((resultado) => { resolve(resultado) })
                .catch((error) => { reject(error) });
        })
    }
    ver_equipos_por_categoria(id, body) {
        console.log('CAT controller:', id, body);
        return new Promise((resolve, reject) => {
            Categoria_model.ver_equipos_por_categoria(id, body)
                .then((resultado) => { resolve(resultado) })
                .catch((error) => { reject(error) });
        })
    }
    ingresar_categoria(categoria) {
        return new Promise((resolve, reject) => {
            Categoria_model.ingresar_categoria(categoria)
                .then((ing) => { resolve(ing) })
                .catch((error) => { reject(error) });
        })
    }
    editar_categoria(id, actualizar) {
        //console.log("en controller", id, actualizar);
        return new Promise((resolve, reject) => {
            if (id != undefined && !isNaN(Number(id))) {
                Categoria_model.editar_categoria(id, actualizar)
                    .then((retorno) => { resolve(retorno) })
                    .catch((error) => { reject(error); })
            } else {
                return reject('No se ingresó una ID válido');
            }
        })
    }
    modificar_categoria(id, actualizar) {
        //console.log("en controller", id, actualizar);
        return new Promise((resolve, reject) => {
            if (id != undefined && !isNaN(Number(id))) {
                Categoria_model.modificar_categoria(id, actualizar)
                    .then((retorno) => { resolve(retorno) })
                    .catch((error) => { reject(error); })
            } else {
                return reject('No se ingresó una ID válido');
            }
        })
    }
    eliminar_categoria(id) {
    }
}

module.exports = new CategoriaController();