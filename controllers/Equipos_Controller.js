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

    }
    ingresar_equipo(equipo){

    }
    ingresar_inscripcion(equipo, idDelEquipo){

    } 
    editar_equipo(id, actualizar){
    }
    eliminar_equipo(id){

    }
    eliminar_categoria_inscrita(id){
    }
}

module.exports = new EquipoController();