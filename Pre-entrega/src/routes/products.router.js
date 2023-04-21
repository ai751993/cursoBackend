import { Router } from "express";
import ProductManager from '../ProductManager.js';
import path from 'path';
import { fileURLToPath } from 'url';

const router = Router();

const prodMan = new ProductManager('./productos.json');

//Get de productos (Todos)
router.get('/', async (req, res) => {

    const {limit} = req.query;

    const products = await prodMan.GetProducts();
    
    const html = products.slice(0, limit).map(objValue => {
    
        const prop = Object.keys(objValue);
        const listItems = prop.map(field => `<li><strong>${field}:</strong> ${objValue[field]}</li>`).join('');
        return `<ul>${listItems}</ul>`;
    
        }).join('');   
    
    res.send(`${html}`)
})

//Get de producto (Por ID)
router.get('/:id', async (req, res) => {

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

//Post para agregar productos
router.post('/add', async (req, res) => {

    const newProduct = req.body;
    const result = await prodMan.AddProduct(newProduct);

    res.send(result);
})

//Put para actualizar productos por ID
router.put('/:id', async (req, res) =>{
    const products = await prodMan.GetProducts();
    const newProduct = req.body;
    const idGet = Number(req.params.id); 

    res.send(await prodMan.UpdateProduct(idGet, newProduct));

})

//Delete para borrar productos por ID
router.delete('/:id', async (req, res) => {
    const products = await prodMan.GetProducts();
    const idGet = Number(req.params.id);

    res.send(await prodMan.DeleteProduct(idGet));
})


export default router;