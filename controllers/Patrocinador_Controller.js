const Patrocinador_Model = require('../models/Patrocinador_model');

class PatrocinadorController{
    ver_patrocinador(){

    }
    ingresar_patrocinador(patrocinador){

    }
    ingresar_padrino(patrocinador, idPatrocinador){

    }
    ingresar_patrocinador_views(patrocinador){   
        return Patrocinador_Model.ingresar_patrocinador_views(patrocinador)
    }
    eliminar_patrocinador(id){

    }
}

module.exports = new PatrocinadorController();