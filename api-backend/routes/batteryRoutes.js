const express = require('express');
const router = express.Router();
const Batterys = require('../models/battery');
const upload = require('../multerConfig');

// POST route to upload battery details and image
router.post('/batterysdetails', async (req, res) => {
    try {
        const { name, type, size, status, image } = req.body; // Ensure size is being extracted

        // Ensure all required fields are provided
        if (!name || !type || !size || !image) {
            return res.status(400).json({ error: 'Please provide all required fields: name, type, size, and image.' });
        }

          const batteryStatus = Number(status);
        // Create a new Battery entry
        const newData = new Batterys({
            name,
            type,
            size, // Ensure size is included here
            image,
            status: batteryStatus, // default false
        });

        const response = await newData.save();
        
        res.status(201).json({ message: 'Battery details and image uploaded successfully', battery: response });
    } catch (error) {
        console.error('Error while saving battery details:', error);
        res.status(500).json({ error: 'Server error while saving battery details' });
    }
});

// GET route to retrieve battery details
router.post('/', async (req, res) => {
    try {
        const batteryData = await Batterys.find();
        res.status(200).json(batteryData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/deletebatterybyid', async(req, res) => {
    try{
        const { id } = req.body;

        if(!id){
            return res.status(400).send({
                status: 400,
                message: "id is required"
            })
        }

        const deletedBattery = await Batterys.findByIdAndDelete(id)

        if(!deletedBattery) {
             return res.status(400).send({
                status: 400,
                message: "battery not found"
            });
        }
              res.status(200).json({
                statusCode: 200,
            message: 'battery deleted successfully',
            deletedBattery
        });
    } catch(error) {
        console.error('Error while deleting battery:', error);
        res.status(500).json({ error: 'Server error while deleting battery' });
    }
});

// Toggle Tyre Status (like MySQL NOT is_active)
router.post('/togglestatusbatterys', async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ status: 400, message: "id is required" });
        }

        // Find tyre first
        const battery = await Batterys.findById(id);
        if (!battery) {
            return res.status(404).json({ status: 404, message: "Tyre not found" });
        }

        const currentStatus = Number(battery.status) || 0;

        // ✅ Toggle (0 -> 1, 1 -> 0)
        const newStatus = currentStatus === 1 ? 0 : 1;

        battery.status = newStatus;
        await battery.save();

        res.status(200).json({
            statusCode: 200,
            message: "battery status toggled successfully",
            battery
        });

    } catch (error) {
        console.error("Error while toggling battery status:", error);
        res.status(500).json({ error: "Server error while toggling tyre status" });
    }
});

module.exports = router;
