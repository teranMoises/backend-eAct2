const Patrocinador_Model = require('../models/Patrocinador_model');

class PatrocinadorController{
    ver_patrocinador(){
        return new Promise((resolve, reject)=>{
            Patrocinador_Model.ver_patrocinador().then((resultado)=>{resolve(resultado)}).catch((error)=>{reject(error)});  
        })  
    }
    ingresar_patrocinador(patrocinador){
        return new Promise((resolve, reject)=>{
            Patrocinador_Model.ingresar_patrocinador(patrocinador).then(()=>{resolve()}).catch((error)=>{reject(error)}); 
        })
    }
    ingresar_padrino(patrocinador, idPatrocinador){
        return new Promise((resolve, reject)=>{
            Patrocinador_Model.ingresar_padrino(patrocinador, idPatrocinador).then(()=>{resolve()}).catch((error)=>{reject(error)}); 
        })
    }
    ingresar_patrocinador_views(patrocinador){   
        return Patrocinador_Model.ingresar_patrocinador_views(patrocinador)
    }
    eliminar_patrocinador(id){

    }
}

module.exports = new PatrocinadorController();