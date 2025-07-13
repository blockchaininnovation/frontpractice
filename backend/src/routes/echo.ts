import express from 'express';

const router = express.Router();

// Sample POST route
router.post('/', (req, res) => {
    const { message } = req.body;
    res.json({ echoed: message + ' echoed' });
});

export default router;