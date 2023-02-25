import express from 'express';

const router = express.Router();

import todo from './todo';
router.use('/todos', todo);

export default router;