const Equipo_model = require('../models/Equipo_model');

class EquipoController {
    ver_equipos() {
        return new Promise((resolve, reject) => {
            Equipo_model.ver_equipos().then((resultado) => { resolve(resultado) }).catch((error) => { reject(error) });
        })
    }
    ver_equipos_views() {
        return new Promise((resolve, reject) => {
            Equipo_model.ver_equipos_views()
                .then(async (resultado) => {
                    if (resultado == null) { resolve(resultado); return }
                    //console.table(resultado)
                    for (const equipo of resultado) {
                        //console.log('ESTAMOS EN:',equipo.nombre_de_equipo)
                        let modalidad = "";
                        //console.table(resultado)
                        try {
                            let catEqu = await Equipo_model.ver_cat_equipos(equipo.id_equipo);
                            //console.table(catEqu);
                            if (catEqu === null) { reject("Error: " + equipo.nombre_de_equipo + " no tiene categorías/modalidad"); return };
                            if (!catEqu[0].nombre_categoria || !catEqu[0].nombre_modalidad) { reject("Error categorías/modalidad"); return };
                            for (const cat of catEqu) {
                                modalidad += `${cat.nombre_categoria} (${cat.nombre_modalidad}); `;
                            }
                            modalidad = modalidad.substring(0, modalidad.length - 2);
                            equipo.nombre_modalidad = modalidad;
                            //console.log(equipo.nombre_modalidad);
                        } catch (error) {
                            console.error("Error leyendo cat");
                            reject(error);
                        }
                    }
                    //console.table(resultado)
                    resolve(resultado);
                })
                .catch((error) => { reject(error) });
        })
    }
    ver_padrinos() {
        return new Promise((resolve, reject) => {
            Equipo_model.ver_padrinos().then((resultado) => { resolve(resultado) }).catch((error) => { reject(error) });
        })
    }
    ingresar_equipo(equipo) {
        return new Promise((resolve, reject) => {
            Equipo_model.ingresar_equipo(equipo).then((resultado) => { resolve(resultado) }).catch((error) => { reject(error) });
        })
    }
    ingresar_inscripcion(inscripcion) {
        return new Promise((resolve, reject) => {
            Equipo_model.ingresar_inscripcion(inscripcion).then(resolve()).catch((error) => { reject(error) });
        })
    }
    editar_equipo(id, actualizar) {
    }
    eliminar_equipo(id) {
        return new Promise((resolve, reject) => {
            Equipo_model.eliminar_equipo(id).then(resolve()).catch((error) => { reject(error) });
        })
    }
    eliminar_categoria_inscrita(idEquipo, idCategoria) {
        return new Promise((resolve, reject) => {
            Equipo_model.eliminar_categoria_inscrita(idEquipo, idCategoria).then(resolve()).catch((error) => { reject(error) });
        })
    }
}

module.exports = new EquipoController();