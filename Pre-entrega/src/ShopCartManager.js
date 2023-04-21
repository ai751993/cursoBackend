import fs from 'fs';
import ProductManager from './ProductManager.js';

export default class ShopCartManager
{
    constructor()
    {
        this.path = '../files/Carrito.JSON'
        this.cart = [];
    }

    GetCarts = async () =>
    {
        try
        {
            if(fs.existsSync(this.path)){
                const data = await fs.promises.readFile(this.path, 'utf-8');
                this.carts = JSON.parse(data);
                
                return this.carts;
            }
            else{
                return [];
            }
        }
        catch(error)
        {
            console.log(error);
        }
    }

    CreateCart = async () => 
    {
        try
        {
            let newCart = [];
            const carts = await this.GetCarts();
            if(carts.length === 0)
            {
                newCart = {
                    id: 1,
                    products: []
                }
                carts.push(newCart);
            }
            else
            {
                newCart = {
                    id: carts.length + 1,
                    products: []
                }
                carts.push(newCart);
            }
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
            return carts;
        }
        catch(error){
            console.log(error);
        }
    }
    
    AddProductToCart = async (prodID, cartID) =>
    {
        try
        {
            const productFinder = new ProductManager();
            const product = await productFinder.GetProductById(prodID);
            console.log("Esto es product" + product);
            let cartProduct = {};
            let msg = "";
            switch(product){
                case 'PRSNSTCK': return msg = `<H1>No hay stock del producto seleccionado!</h1>`; 
                case 'PRIDINEX': return msg = `<H1>El ID ingresado no corresponde a un producto en existencia!</h1>`; 
                default:
                    cartProduct ={
                        id: product.id,
                        quantity: 1
                    }
            }

            const carts = await this.GetCarts();

            const pos = carts.findIndex(x => x.id === cartID);
            if (pos !== -1){
              const prodExist = carts[pos].products.find(el => el.id === cartProduct.id);
              if (prodExist) {
                prodExist.quantity ++;
              }else{
                carts[pos].products.push(cartProduct);
              }
            }
            else{
                return msg = `<H1>El carrito seleccionado no existe!</H1>`;
            }
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
            await productFinder.UpdateProductSale(prodID);
            
            return carts;
        }
        catch(error)
        {
            console.log(error);
        }

    }
}