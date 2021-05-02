const fs = require('fs');
const path = require('path');
// Recibo por parámetro la entidad para reutilizarlo



const model = function (name) {
    console.log('entre al modelo')
    console.log(name)
    return {
        tablePath: path.resolve(__dirname, '../data/', `${name}.json`),
      
 // Leo el archivo Json y lo transformo en Array de objeto literal     
        readFile: function ( ){
            let tableContents = fs.readFileSync(this.tablePath, 'utf-8');
            return JSON.parse(tableContents) || [];
        },
// Grabo el array que recibo por parámetro y lo paso a formato Json
        writeFile : function(contents) {
            let tableContents = JSON.stringify(contents, null, ' ');
            fs.writeFileSync(this.tablePath, tableContents);
        },
// Averiguo el próximo id
        nextId:function() {
            let rows = this.readFile();
            let lastRow = rows.pop();

            return lastRow.id ? ++lastRow.id : 1;
        },
// Leo todos los registros del archivo
        all: function() {
            console.log('Estoy buscando los productos ahora')
            return this.readFile();
        },
// Busco por id
        find:function(id) {
            let rows = this.readFile();
            return rows.find(product => product.id == id);
        },

// agrego un registro que paso por parámetro
        create:function(row) {
            let rows = this.readFile();
            // Averiguo el último id y lo actualizo
            row.id = this.nextId();
            // Agrego en el array
            rows.push(row);
            // grabo el array en el archivo
            this.writeFile(rows);
            //Retorno el último id generado
            return row.id;
        },
// Actualizo el archivo
        update:function(row) {
            let rows = this.readFile();

            let updatedRows = rows.map(oneRow => {
                if (oneRow.id == row.id) {
                    return row;
                }

                return oneRow;
            });
            // escribo el archivo
            console.log(updatedRows)
            this.writeFile(updatedRows);

            return row.id;
        },

     // Elimino el registro en el archivo según un id    
        delete: function(id) {

            console.log('Elimino :' + id)
            let rows = this.readFile();
            let updatedRows = rows.filter(row => {
                return row.id != id;
            });

            this.writeFile(updatedRows);
        }

      
    }
}

module.exports = model