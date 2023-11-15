const connection = require('../config/conexion');

class Equipo{
    constructor(representante, email, telefono, nombre_de_equipo, participantes, comentario){
        this.representante = representante,
        this.email = email,
        this.telefono = telefono,
        this.nombre_de_equipo = nombre_de_equipo,
        this.participantes = participantes,
        this.comentario = comentario
    }
}

class Inscripcion{
    constructor(idCategoria, idEquipo){
        this.idCategoria = idCategoria
        this.idEquipo = idEquipo
    }
}

class EquipoModel{
    ver_equipos(){
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM `equipos`', function(err, rows, fields) {
                if (err){
                    reject("La conexión a la base de datos a fallado")
                }else {
                    resolve(rows)  
                }
            })
        })
    } 
    ver_equipos_views(){
        if(equipos.length > 0){ 
            return equipos;
        }else{
            return equipos;
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

module.exports = new EquipoModel(); 