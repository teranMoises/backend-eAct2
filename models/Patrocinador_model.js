const connection = require('../config/conexion');

class Patrocinador{
    constructor(nombre_comercial, persona_de_contacto, telefono, idPatrocinio, comentario){
        this.nombre_comercial = nombre_comercial,
        this.persona_de_contacto = persona_de_contacto,
        this.telefono = telefono,
        this.idPatrocinio = idPatrocinio,
        this.comentario = comentario
    }
}

class Padrino{
    constructor(idEquipo, idPatrocinador){
        this.idEquipo = idEquipo,
        this.idPatrocinador = idPatrocinador
    }
}

class PatrocinadorModel{
    ver_patrocinador(){ 

    }
    ingresar_patrocinador(patrocinador){

    }
    ingresar_padrino(patrocinador, idPatrocinador){

    }
    ingresar_patrocinador_views(patrocinador){   
/*         patrocinador.id = uuidv4();
        let nuevo_patrocinador = new Patrocinador(patrocinador.id, patrocinador.nombre_comercial, patrocinador.persona_de_contacto, patrocinador.telefono, patrocinador.patrocinio, patrocinador.comentario);
        patrocinadores.push(nuevo_patrocinador);
        return patrocinadores */
    }
    eliminar_patrocinador(id){
 
    }
}

module.exports = new PatrocinadorModel();