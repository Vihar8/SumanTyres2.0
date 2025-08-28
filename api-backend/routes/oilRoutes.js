const express = require('express');
const router = express.Router();
const Oils = require('../models/oil'); // Import the Oils schema
const upload = require('../multerConfig'); // Multer configuration

// POST route to upload oil details and image
router.post('/oilsdetails', upload.single('image'), async (req, res) => {
    try {
        const { name, type, status, image} = req.body;

        // // Check if the image file was uploaded
        // const image = req.file ? req.file.originalname : '' // Store the file path or URL
        
        // Ensure all required fields are provided
        if (!name || !type || !image) {
            return res.status(400).json({ error: 'Please provide all required fields: name, type, and image.' });
        }

         const oilStatus = Number(status);
        // Create a new Oils entry
        const newData = new Oils({
            name,
            type,
            image,
            status: oilStatus, // default false
        });

        const response = await newData.save();
        
        res.status(201).json({ 
            statusCode: 200,
            message: 'Oil details and image uploaded successfully', oils: response 
        });
    } catch (error) {
        console.error('Error while saving oil details:', error);
        res.status(500).json({ error: 'Server error while saving oil details' });
    }
});

router.post('/', async(req, res) => {
    try{
        const oilData = await Oils.find();
        res.status(200).json(oilData)
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'internal server error' });
    }
});

router.post('/deleteoilbyid', async(req, res) => {
    try{
        const { id } = req.body;

        if(!id){
            return res.status(400).send({
                status: 400,
                message: "id is required"
            })
        }

        const deletedOil = await Oils.findByIdAndDelete(id)

        if(!deletedOil) {
             return res.status(400).send({
                status: 400,
                message: "oil not found"
            });
        }
              res.status(200).json({
                statusCode: 200,
            message: 'oil deleted successfully',
            deletedOil
        });
    } catch(error) {
        console.error('Error while deleting oil:', error);
        res.status(500).json({ error: 'Server error while deleting oil' });
    }
});

// Toggle Tyre Status (like MySQL NOT is_active)
router.post('/togglestatusoils', async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ status: 400, message: "id is required" });
        }

        // Find tyre first
        const oil = await Oils.findById(id);
        if (!oil) {
            return res.status(404).json({ status: 404, message: "Tyre not found" });
        }

        const currentStatus = Number(oil.status) || 0;

        // ✅ Toggle (0 -> 1, 1 -> 0)
        const newStatus = currentStatus === 1 ? 0 : 1;

        oil.status = newStatus;
        await oil.save();

        res.status(200).json({
            statusCode: 200,
            message: "oil status toggled successfully",
            oil
        });

    } catch (error) {
        console.error("Error while toggling oil status:", error);
        res.status(500).json({ error: "Server error while toggling tyre status" });
    }
});



module.exports = router;
