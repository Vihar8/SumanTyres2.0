const express = require('express');
const router = express.Router();
const Tyres = require('../models/tyres'); // Import the Tyres schema
const upload = require('../multerConfig'); // Multer configuration

router.post('/tyresdetails', upload.single('image'), async (req, res) => {
    try {
        const { name, width, height, radius, brand, type, status, image } = req.body;

        // Get the uploaded image filename
        // const image = req.file ? req.file.filename : '';

        // Construct size object directly
        const size = { width, height, radius };

           // Convert status to number (0 or 1)
        const tyreStatus = Number(status);

        const existingTyre = await Tyres.findOne({
            name: name,
            'size.width': width,
            'size.height': height,
            'size.radius': radius
        });

        if (existingTyre) {
            return res.status(400).json({ error: 'Tyre with same name and size already exists' });
        }

        // Create a new Tyres document
        const newTyre = new Tyres({
            name,
            brand,
            type,
            size,
            image,
            status : tyreStatus
        });


        // Save to database
        await newTyre.save();

        res.status(201).json({
            message: 'Tyre details and image uploaded successfully',
            tyre: newTyre
        });

    } catch (error) {
        console.error('Error while saving tyre details:', error);
        res.status(500).json({ error: 'Server error while saving tyre details' });
    }
});

router.post('/', async(req, res) => {
    try{
        const tyreData = await Tyres.find();
        console.log('data Fetched')
        res.status(200).json(tyreData)
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'internal server error' });
    }
})

router.post('/deletetyrebyid', async(req, res) => {
    try{
        const { id } = req.body;

        if(!id){
            return res.status(400).send({
                status: 400,
                message: "id is required"
            })
        }

        const deletedTyre = await Tyres.findByIdAndDelete(id)

        if(!deletedTyre) {
             return res.status(400).send({
                status: 400,
                message: "Tyre not found"
            });
        }
              res.status(200).json({
                statusCode: 200,
            message: 'Tyre deleted successfully',
            deletedTyre
        });
    } catch(error) {
        console.error('Error while deleting tyre:', error);
        res.status(500).json({ error: 'Server error while deleting tyre' });
    }
});

// Toggle Tyre Status (like MySQL NOT is_active)
router.post('/togglestatus', async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ status: 400, message: "id is required" });
        }

        // Find tyre first
        const tyre = await Tyres.findById(id);
        if (!tyre) {
            return res.status(404).json({ status: 404, message: "Tyre not found" });
        }

        const currentStatus = Number(tyre.status) || 0;

        // ✅ Toggle (0 -> 1, 1 -> 0)
        const newStatus = currentStatus === 1 ? 0 : 1;

        tyre.status = newStatus;
        await tyre.save();

        res.status(200).json({
            statusCode: 200,
            message: "Tyre status toggled successfully",
            tyre
        });

    } catch (error) {
        console.error("Error while toggling tyre status:", error);
        res.status(500).json({ error: "Server error while toggling tyre status" });
    }
});

// Get tyre by ID
router.post('/gettyre/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const tyre = await Tyres.findById(id);

        if (!tyre) {
            return res.status(404).json({ status: 404, message: "Tyre not found" });
        }

        res.status(200).json({
            statusCode: 200,
            message: "Tyre fetched successfully",
            tyre
        });
    } catch (error) {
        console.error("Error fetching tyre by id:", error);
        res.status(500).json({ error: "Server error while fetching tyre" });
    }
});

// Update Tyre by ID
router.post('/updatetyre/:id', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, width, height, radius, brand, type, status } = req.body;

        // Find tyre first
        const tyre = await Tyres.findById(id);
        if (!tyre) {
            return res.status(404).json({ status: 404, message: "Tyre not found" });
        }

        // Update fields only if provided
        if (name) tyre.name = name;
        if (brand) tyre.brand = brand;
        if (type) tyre.type = type;

        // Status (convert to number if provided)
        if (status !== undefined) {
            tyre.status = Number(status);
        }

        // Size update
        if (width || height || radius) {
            tyre.size = {
                width: width || tyre.size.width,
                height: height || tyre.size.height,
                radius: radius || tyre.size.radius
            };
        }

        // Image update (if new image uploaded)
        if (req.file) {
            tyre.image = req.file.filename;
        }

        // Save changes
        await tyre.save();

        res.status(200).json({
            statusCode: 200,
            message: "Tyre updated successfully",
            tyre
        });

    } catch (error) {
        console.error("Error while updating tyre:", error);
        res.status(500).json({ error: "Server error while updating tyre" });
    }
});


module.exports = router;
