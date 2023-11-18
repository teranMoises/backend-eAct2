const Equipo_model = require('../models/Equipo_model');

class EquipoController{
    ver_equipos(){
        return new Promise((resolve, reject)=>{
            Equipo_model.ver_equipos().then((resultado)=>{resolve(resultado)}).catch((error)=>{reject(error)}); 
        })  
    }
    ver_equipos_views(){
        let mostrarequipos= Equipo_model.ver_equipos_views();
        if(mostrarequipos){
            return mostrarequipos; 
        }else{
            return mostrarequipos;
        }   
    }
    ver_padrinos(){
        return new Promise((resolve, reject)=>{
            Equipo_model.ver_padrinos().then((resultado)=>{resolve(resultado)}).catch((error)=>{reject(error)}); 
        }) 
    }
    ingresar_equipo(equipo){
        return new Promise((resolve, reject)=>{
            Equipo_model.ingresar_equipo(equipo).then((resultado)=>{resolve(resultado)}).catch((error)=>{reject(error)});    
        }) 
    }
    ingresar_inscripcion(inscripcion){
        return new Promise((resolve, reject) => { 
            Equipo_model.ingresar_inscripcion(inscripcion).then(resolve()).catch((error)=>{reject(error)});  
        })
    } 
    editar_equipo(id, actualizar){
        return new Promise((resolve, reject) => {
            if (id != undefined && !isNaN(Number(id))) {
                Equipo_model.editar_equipo(id, actualizar)
                    .then((retorno) => { resolve(retorno) })
                    .catch((error) => { reject(error); })
            } else {
                return reject('No se ingresó una ID válido');
            }
        })
    }
    eliminar_equipo(id){
        return new Promise((resolve, reject)=>{
            Equipo_model.eliminar_equipo(id).then(resolve()).catch((error)=>{reject(error)});    
        }) 
    }
    eliminar_categoria_inscrita(idEquipo, idCategoria){
        return new Promise((resolve, reject)=>{ 
            Equipo_model.eliminar_categoria_inscrita(idEquipo, idCategoria).then(resolve()).catch((error)=>{reject(error)});    
        }) 
    } 
}

module.exports = new EquipoController();