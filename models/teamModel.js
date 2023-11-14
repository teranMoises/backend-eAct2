var { modalityBD, ModalityModels } = require('./modalidadesModels');

class teamModelC {
    showTeams() {
        return teamsOn
    };
    find(idCAT) {
        let i1 = -1;
        let i2 = -1;
        let name = "";
        let found = false;
        //console.log('Categorias:',idCAT)
        //console.log('Categorias:',modalityBD)
        if (modalityBD.length <= 0) {
            return null;
        }
        modalityBD.forEach((mode, indexMode, arreglo) => {
            mode.categorias.forEach((cat, indexCat, arreglo) => {
                //console.log(indexMode,indexCat,cat);
                //console.log('Comparar',idCAT,cat['id'])
                if (Object.hasOwnProperty.call(cat, 'id')) {
                    if (cat['id'] == idCAT) {
                        i1 = indexMode;
                        i2 = indexCat;
                        name = cat['nombre'];
                        found = true;
                    } else {
                        return false;
                    }
                }
            })
        });
        return [found, i1, i2, name]

    }
    findCATs(arrCAT) {
        console.log("findCATs", arrCAT)
        for (const catObj of arrCAT) {
            if (typeof catObj == "string") {
                let returnFind = this.find(catObj);
                console.log("findCATs FIND", returnFind)
                if (returnFind == false || (Array.isArray(returnFind) && returnFind[0] !== true)) {
                    return catObj;
                }
            }
        }
        return true;
    }
    addTeam(team) {
        //team.ID = uuidv4()
        if (team.ID != undefined && team.Equipo != undefined && team.Integrantes != undefined && team.Categorias != undefined) {
            let val = this.findCATs(team.Categorias);
            console.log(val)
            if (val !== true) {
                return 'Se ha encontrado un ID de categoría inválido: ' + val;
            }
            teamsOn.push(team);
            return this.showTeams();
        } else {
            //return this.find(usuario.algo)
            return "Error: faltan datos";
        }
    };
    editTeam(team) {
        let iEquipo = teamsOn.findIndex(equipo => equipo.ID == team.ID);
        if (team.ID != undefined && team.Equipo != undefined && team.Integrantes != undefined && team.Categorias != undefined) {
            if (iEquipo !== -1) {
                let val = this.findCATs(team.Categorias);
                if (val !== true) {
                    return 'Se ha encontrado un ID de categoría inválido: ' + val;
                }
                let add = {
                    ID: team.ID,
                    Equipo: team.Equipo,
                    Integrantes: team.Integrantes,
                    Categorias: team.Categorias
                }
                teamsOn[iEquipo] = add;
                return teamsOn[iEquipo];
            } else {
                return 'No existe el equipo indicado: ' + team.ID;
            }
        } else {
            return "Error: faltan datos";
        }
    };
    delTeam(uID) {
        let team = teamsOn.find((team) => team.ID == uID);
        if (team) {
            teamsOn.splice(teamsOn.indexOf(team), 1);
        }
    };
    showCategory() {
        let categories = {};
        if (modalityBD.length <= 0) {
            return null;
        }
        modalityBD.forEach((mode, indexMode, arreglo) => {
            mode.categorias.forEach((cat, indexCat, arreglo) => {
                if (Object.hasOwnProperty.call(cat, 'id')) {
                    if (typeof cat['id'] == "string") {
                        if (!Object.hasOwnProperty.call(categories, cat['id'])) {
                            categories[cat['id']] = { "nombre": cat.nombre, "equipos": [] };
                        }
                    }
                }
            })
        });
        console.log(categories)

        teamsOn.forEach((team, indexMode, arreglo) => {
            for (const catID of team.Categorias) {
                if (Object.hasOwnProperty.call(categories, catID)) {
                    categories[catID]['equipos'].push(team);
                }
            }

        });
        return categories
    };
    delCategory(idCAT, idTEAM) {
        console.log(idCAT, idTEAM)
        let i = teamsOn.findIndex(team => team.ID == idTEAM);
        if (i == -1) {
            return 'No existe el equipo indicado';
        }
        let iCAT = teamsOn[i].Categorias.findIndex(cat => cat == idCAT);
        if (iCAT == -1) {
            return 'No existe la categoría indicada';
        }
        return teamsOn[i].Categorias.splice(iCAT, 1);
    };
}



module.exports = new teamModelC;
