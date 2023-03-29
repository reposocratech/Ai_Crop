const connection = require('../../config/db');

class CropController {
    
    //Inserta en base de datos, nuevo cultivo
    //localhost:4000/crop/createCrop
    createCrop = (req, res) => {
        let {crop_name, crop_duration, crop_plant_variety, greenhouse_id, crop_size} = req.body;
        
        let sql = `INSERT INTO crop (crop_name,  crop_duration, crop_plant_variety, greenhouse_id,crop_size) VALUES ("${crop_name}", "${ crop_duration}", "${crop_plant_variety}", ${greenhouse_id},"${crop_size}")`;

        connection.query(sql, (error, result) => {
            error
            ? res.status(400).json({error})
        
            : res.status(201).json("SE CREó BIEN EL CROP");
        });
        
    };

    //2. Edit Crop
    //localhost:4000/Crop/editCrop/:crop_id
    editCrop = (req, res) => {
    
        const { crop_name, crop_duration, crop_plant_variety ,crop_size} = req.body;
        const crop_id = req.params.crop_id;

        let sql = `UPDATE crop SET crop_name ='${crop_name}', crop_duration ='${crop_duration}', crop_plant_variety = '${crop_plant_variety}, crop_size = '${crop_size}', WHERE crop_id = ${crop_id}`;
        
        connection.query(sql, (error, result) => {
        error 
        ? res.status(400).json({ error }) 
        : res.status(200).json(`El cultivo ${crop_id} ha sido modificado con éxito`);
        });

    };

    // 3.Borra de manera logica un cultivo
    //localhost:4000/crop/logicDeleteCrop/:crop_id
    logicDeleteCrop = (req, res) => {
        const crop_id = req.params.crop_id;
        
        let sql = `UPDATE crop SET is_deleted = true WHERE crop_id = ${crop_id}`;
        
        connection.query(sql, (error, result) => {
            error 
            ? res.status(400).json({ error }) 
            : res.status(200).json(`El cultivo ${crop_id} ha sido borrado`);
        });
        
    };

    // 3.1 Borrado REAL de un cultivo
    //localhost:4000/crop/deleteCrop/:crop_id
    deleteCrop = (req, res) => {
        const crop_id = req.params.crop_id;
        
        let sql = `DELETE FROM crop WHERE crop_id = ${crop_id}`;
        
        connection.query(sql, (error, result) => {
            error 
            ? res.status(400).json({ error }) 
            : res.status(200).json(`El cultivo ${crop_id} ha sido eliminado`);
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


    //6. trae todos los cultivos de un invernadero, activo e inactivo
    //localhost:4000/crop/getAllCrops/:greenhouse_id
    getAllCrops = (req, res) => {
    
        const greenhouse_id = req.params.greenhouse_id;
        
        let sql = `SELECT * FROM crop where greenhouse_id = ${greenhouse_id}`;
        
        connection.query(sql, (error, result) => {
        error 
        ? res.status(400).json({ error }) 
        : res.status(200).json(result);
        console.log(result);
        });
    };

    //7. trae  los cultivos de un invernadero (activo) 
    //localhost:4000/crop/getActiveCrops/:greenhouse_id
    getActiveCrops = (req, res) => {
    
        const greenhouse_id = req.params.greenhouse_id;
        
        let sql = `SELECT * FROM crop where greenhouse_id = ${greenhouse_id} and is_active = true`;
        
        connection.query(sql, (error, result) => {
        error 
        ? res.status(400).json({ error }) 
        : res.status(200).json(result);
        console.log(result);
        });
    };


}

module.exports = new CropController();