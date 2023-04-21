import { Router } from "express";
import ShopCartManager from '../ShopCartManager.js';
import path from 'path';
import { fileURLToPath } from 'url';

const router = Router();

const cartMan = new ShopCartManager('./Carritos.json');

//const listProducts = products.GetProducts();

//Post: Genera el carrito si no existe el JSON. Si no agrega mas,
router.post('/', async (req, res) => {

    const result = await cartMan.CreateCart();

    res.send(result);

})

//Get del carrito
router.get('/:id', async (req, res) => {

    const carts = await cartMan.GetCarts();
    const idGet = Number(req.params.id);

    const objValue = carts.find(u => u.id === idGet);
    const objValueJSON = JSON.stringify(objValue);
    
    res.send(`${objValueJSON}`);
})

//Post agrego items al carrito
router.post('/:cid/product/:pid', async (req, res) => {
    const cartID = Number(req.params.cid);
    console.log("Esto es cartID " + cartID);
    const prodID = Number(req.params.pid);
    console.log("Esto es prodID " + prodID);

    res.send(await cartMan.AddProductToCart(prodID, cartID));
})

export default router;