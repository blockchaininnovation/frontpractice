import express from 'express';

const router = express.Router();

// Sample GET route
router.get('/', (req, res) => {
    res.json({ message: 'pong' });
});

// Sample POST route
router.post('/', (req, res) => {
    const { message } = req.body;
    res.json({ echoed: message + ' echoed' });
});

export default router;