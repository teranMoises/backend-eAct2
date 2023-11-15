const connection = require('../config/conexion');

class Categoria{
    constructor(idModalidad, nombre_categoria, descripcion, reglas, premio){
        this.idModalidad = idModalidad,
        this.nombre_categoria = nombre_categoria,
        this.descripcion = descripcion,
        this.reglas = reglas,
        this.premio = premio
    }
}

class CategoriaModel{
    ver_categorias(){

    }
    ver_equipos_por_categoria(id){

    }
    ingresar_categoria(categoria){ 

    }
    editar_categoria(id, actualizar){

    }
    eliminar_categoria(id){

    }
}

module.exports = new CategoriaModel();