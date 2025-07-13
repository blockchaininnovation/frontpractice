import express from 'express';

const router = express.Router();

// Sample GET route
router.get('/', (req, res) => {
    res.json({ message: 'pong' });
});


export default router;