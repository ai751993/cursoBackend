import express from 'express';
import ProductManager from './ProductManager.js';
import ShopCartManager from './ProductManager.js';
import path from 'path';
import { fileURLToPath } from 'url';
import __dirname from './utils.js';

import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/api/products', productsRouter);
app.use('/api/products/:id', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/carts/:id', cartsRouter);

app.use(express.static(`${__dirname}/public`));

app.listen(port, () => console.log('listening on port ' + port));