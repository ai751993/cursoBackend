import express from 'express';
import ProductManager from './ProductManager.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 8080;

const prodMan = new ProductManager('./productos.json');

app.get('/products', async (req, res) => {

    const {limit} = req.query;

    //console.log("Esto es limit --> " + limit);
    const products = await prodMan.GetProducts();
    
    const html = products.slice(0, limit).map(objValue => {
    
        const prop = Object.keys(objValue);
        const listItems = prop.map(field => `<li><strong>${field}:</strong> ${objValue[field]}</li>`).join('');
        return `<ul>${listItems}</ul>`;
    
        }).join('');   
    
    res.send(`${html}`)

})

app.get('/products/:id', async (req, res) => {

    const products = await prodMan.GetProducts();
    const idGet = Number(req.params.id);
    const objValue = products.find(u => u.id === idGet);

    if(objValue != undefined)
    {
        const prop = Object.keys(objValue);
        const displayProd = prop.map(field => `<li><strong>${field}:</strong> ${objValue[field]}</li>`).join('');
    
        res.send(
            `${displayProd}`
        );
    }
    else
    res.send(
        `<H2>El producto consultado no existe</H2>`
    )

})

app.listen(port, () => console.log('listening on port '));
