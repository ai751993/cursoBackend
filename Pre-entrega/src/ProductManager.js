//const fs = require('fs');
import fs from 'fs';

export default class ProductManager
{
    constructor()
    {
        this.path = '../files/Productos.JSON'
        this.products = [];
    }

    GetProducts = async () =>{
        try
        {
            if(fs.existsSync(this.path)){
                const data = await fs.promises.readFile(this.path, 'utf-8');
                this.products = JSON.parse(data);
                
                return this.products;
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
 
    AddProduct = async (product) =>
    {
        try{
            const producto = {
                title: product.title,
                description: product.description,
                price: product.price,
                thumbnail: product.thumbnail,
                code: product.code,
                category: product.category,
                stock: product.stock,
                status: true
            }

            //Validamos que no haya nulos excepto por thumbnail
            for(let x in producto){

                const valid = producto[x] === null ? (x === "thumbnail" ? true : false) : true;

                if(valid === false){
                    return `<H1>Debe cargar ${x}</H1>` ;
                }          
            }

            const productos = await this.GetProducts();

            productos.length === 0 ? producto.id = 1 : producto.id = productos[productos.length - 1].id + 1;

            productos.push(producto)

            await fs.promises.writeFile(this.path, JSON.stringify(productos, null, '\t'));

            return producto;
        }
        catch(error)
        {
            console.log(error);
        }

    }

    GetProductById = async (ide) =>
     {
        try{
            const productos = await this.GetProducts();
            const pos = productos.findIndex(x => x.id === ide) 

            return pos === -1 ? "PRIDINEX" : (productos[pos].stock > 0 ? productos[pos] : "PRSNSTCK");
        }
        catch(error)
        {
            console.log(error);
        }
    }
  
    UpdateProduct = async (ide, productUpdate) => {
        try{
            const productos = await this.GetProducts();
           
            if(productos.length > 0){

                const pos = productos.findIndex(x => x.id === ide) 

                if(pos != -1){

                    productos[pos].title = productUpdate.title             !== null ? productUpdate.title       : productos[pos].title;
                    productos[pos].description = productUpdate.description !== null ? productUpdate.description : productos[pos].description;
                    productos[pos].price = productUpdate.price             !== null ? productUpdate.price       : productos[pos].price;
                    productos[pos].thumbnail = productUpdate.thumbnail     !== null ? productUpdate.thumbnail   : productos[pos].thumbnail;
                    productos[pos].code = productUpdate.code               !== null ? productUpdate.code        : productos[pos].code ;
                    productos[pos].category = productUpdate.category       !== null ? productUpdate.category    : productos[pos].category;
                    productos[pos].stock = productUpdate.stock             !== null ? productUpdate.stock       : productos[pos].stock;
                    productos[pos].status = productUpdate.status           !== null ? productUpdate.status      : productos[pos].status;


                    await fs.promises.writeFile(this.path, JSON.stringify(productos, null, '\t'));
                    
                    return console.log(productos);
                }

                return `<H1>No hay productos con el ID provisto!</H1>`
            }
            else{
                return `<H1>No existen productos a actualizar!</H1>`
            }

        }
        catch(error)
        {
            console.log(error);
        }
        
    }

//Update de stock: Resta unidades al stock del json de productos
    UpdateProductSale = async (prodID) =>{
        try{
            const productos = await this.GetProducts();
            const pos = productos.findIndex(x => x.id === prodID);
            productos[pos].stock = productos[pos].stock - 1;
            await fs.promises.writeFile(this.path, JSON.stringify(productos, null, '\t'));
        }
        catch(error){
            console.log(error);
        }
    }

//Borrado de productos. Revisar luego
    DeleteProduct = async (ide) => {
        try{
            const productos = await this.GetProducts();

            if(productos.length > 0){

                for(let x = 0; x < productos.length; x++){

                    if(productos[x].id === ide){

                        let pos = x;
                        let newPos = pos+1; 
                        let finPos = productos.length - 1;

                        for(pos; pos < finPos; pos++) 
                        {
                            productos[pos] = productos[newPos]; 
                            newPos += 1;
                        }

                        productos.length = productos.length - 1;
            
                        console.log(productos);
                        await fs.promises.writeFile(this.path, JSON.stringify(productos, null, '\t'));

                        return;
                    }
                }
                
                return `<H1>No hay productos con el ID provisto!</H1>`;
                
            }
            else
            {
                return `<H1>No hay productos con el ID provisto!</H1>`;
            }

        }
        catch(error)
        {
            console.log(error);
        }
    }

}

const prod = new ProductManager();

//prod.AddProduct("Producto prueba 1", "esto es una prueba", 200, "no image", "abc123", 25);
//prod.GetProductById(9);
//prod.UpdateProduct('Producto Prueba 333', null, 29900, null, null, 25, 5);
//prod.DeleteProduct(1);
