const connection = require('../../config/db');

class CropController {
    
    //Inserta en base de datos, nuevo cultivo
    //localhost:4000/greenhouse/oneGreenHouse/:greenhouseId/createCrop
    createCrop = (req, res) => {
    //TO DO:
    // DESCOMENTAR el destructuring del req.body
    // BORRAR el objeto "newCrop"
    // CAMBIAR sql para usar los datos del req.body destructurado
    // BORRAR consoleLogs

        // let {crop_name, crop_size, crop_plant_species, greenhouse_id} = req.body;
        // let sql = `INSERT INTO crop (crop_name, crop_size, crop_plant_species, greenhouse_id) VALUES ("${crop_name}", "${crop_size}", "${crop_plant_species}", ${greenhouse_id})`;

        let newCrop = {
            crop_name: "Cáñamo",
            crop_size: 50,
            crop_plant_species: "Cáñamus ricus",
            resposibility_acknowledge: 1,
            greenhouse_id: 2
        }

        console.log(newCrop);

        let sql = `INSERT INTO crop (greenhouse_id, crop_name, crop_size, crop_plant_variety, responsibility_acknowledged) VALUES (${newCrop.greenhouse_id}, '${newCrop.crop_name}', ${newCrop.crop_size}, '${newCrop.crop_plant_species}', ${newCrop.resposibility_acknowledge})`;

        connection.query(sql, (error, result) => {
            error
            ? res.status(400).json({error})
            : res.status(201).json("SE CREó BIEN EL CROP");
        });
    };

    //2. Edit Crop
    //localhost:4000/Crop/editCrop/:crop_id
    editCrop = (req, res) => {
    
        const { crop_name, crop_size, crop_duration, crop_plant_variety } = req.body;
        const crop_id = req.params.crop_id;

        let sql = `UPDATE crop SET crop_name ='${crop_name}', crop_size ='${crop_size}', crop_duration ='${crop_duration}', crop_plant_variety = '${crop_plant_variety}' WHERE crop_id = ${crop_id}`;
        
        connection.query(sql, (error, result) => {
        error 
        ? res.status(400).json({ error }) 
        : res.status(200).json(result);
        });

    };

    // 3.Borra de manera logica un cultivo
    //localhost:4000/crop/deleteCrop/:crop_id
    deleteCrop = (req, res) => {
    
        const crop_id = req.params.crop_id;
        
        let sql = `UPDATE crop SET is_deleted = true WHERE crop_id = ${crop_id}`;
        
        connection.query(sql, (error, result) => {
        error 
        ? res.status(400).json({ error }) 
        : res.status(200).json(`El cultivo ${crop_id} ha sido borrado`);
        });
    };

    // 4.desactiva un cultivo
    //localhost:4000/crop/endCrop/:crop_id
    endCrop = (req, res) => {
    
        const crop_id = req.params.crop_id;
        
        let sql = `UPDATE crop SET is_active = false WHERE crop_id = ${crop_id}`;
        
        connection.query(sql, (error, result) => {
        error 
        ? res.status(400).json({ error }) 
        : res.status(200).json(`El cultivo ${crop_id} ha sido desactivado`);
        });
    };

    // 5.Activa un cultivo
    //localhost:4000/crop/endCrop/:crop_id
    activateCrop = (req, res) => {
    
        const crop_id = req.params.crop_id;
        
        let sql = `UPDATE crop SET is_active = true WHERE crop_id = ${crop_id}`;
        
        connection.query(sql, (error, result) => {
        error 
        ? res.status(400).json({ error }) 
        : res.status(200).json(`El cultivo ${crop_id} ha sido activado`);
        });
    };



}

module.exports = new CropController();