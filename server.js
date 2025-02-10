const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000; // Choose any port you like
const Order = require('./models/Order'); // Assuming you store cart items in Order model

const router = express.Router();
// MongoDB URI
const mongoURI = 'mongodb://localhost:27017/auto_spare_management'; // Change to your MongoDB database name

const cartRoutes = require('./routes/order-route');
app.use('/api', cartRoutes);



// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());


// Inventory Schema and Model
const inventorySchema = new mongoose.Schema({
    partName: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    manufacturer: { type: String, required: true },
    price: { type: Number, required: true },
    stockLevel: { type: Number, required: true },
    image: { type: String } // URL or path to the image
});
const Inventory = mongoose.model('Inventory', inventorySchema);


// Account Schema and Model
const accountSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Inventory' }] // References items added to cart
});
const Account = mongoose.model('Account', accountSchema);

// Use the login routes

// Routes
// Add a new inventory item
app.post('/inventories', async (req, res) => {
    try {
        const inventoryItem = new Inventory(req.body);
        await inventoryItem.save();
        res.status(201).send({ message: 'Inventory item added successfully', data: inventoryItem });
    } catch (error) {
        console.error('Error adding inventory item:', error);
        res.status(400).send({ message: 'Error adding inventory item', error });
    }
});

// Get all inventory items
app.get('/api/items', async (req, res) => {
    try {
        const items = await Inventory.find();
        console.log("Items fetched successfully:", items);
        res.json(items);
    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({ message: "Error fetching items" });
    }
});

// Search inventory by criteria
app.get('/api/inventory/search', async (req, res) => {
    const { query, category, manufacturer } = req.query;

    try {
        const items = await Inventory.find({
            partName: new RegExp(query, 'i'),
            ...(category && { category }),
            ...(manufacturer && { manufacturer: new RegExp(manufacturer, 'i') })
        });

        res.json(items);
    } catch (error) {
        console.error("Error searching inventory:", error);
        res.status(500).json({ message: "Error searching inventory" });
    }
});
// Route to add item to cart
router.post('/cart', async (req, res) => {
    try {
        const { itemId } = req.body;

        if (!itemId) {
            return res.status(400).json({ error: 'Item ID is required' });
        }

        // Create a new order or add to an existing cart, as per your logic.
        const order = new Order({
            items: [{ itemId: itemId, quantity: 1 }], // Adjust as per your schema
        });

        await order.save(); // Save order to database
        res.status(201).json({ success: true, message: 'Item added to cart' });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

// User Registration Route



// Sample home route
app.get('/', (req, res) => {
    res.send('Hello, MongoDB!');
});

// Account Routes
const accountRoutes = require('./routes/accountRoutes');
app.use('/api/account', accountRoutes);
app.use('/api', require('./routes/order-route'));
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
