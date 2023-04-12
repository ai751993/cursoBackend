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
                
                //console.log(this.products);
                
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

    AddProduct = async (title, desc, price, thumb, code, stock) =>
    {
        try
        {

            const producto = {
                title: title,
                description: desc,
                price: price,
                thumbnail: thumb,
                code: code,
                stock: stock
            }

            const productos = await this.GetProducts();

            if(productos.length === 0)
            {
                producto.id = 1;
            }
            else
            {
                producto.id = productos[productos.length - 1].id + 1;
            }

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
        try
        {
            const productos = await this.GetProducts();

            for(let x = 0; x < productos.length; x++)
            {
                if(productos[x].id === ide)
                {
                    return console.log(productos[x]);
                }
            }

            return console.log("El id indicado no existe");
        }
        catch(error)
        {
            console.log(error);
        }
    }
    
    UpdateProduct = async (titleInp, descrInp, priceInp, thumbInp, codeInp, stockInp, ide) => {
        try
        {
            const productos = await this.GetProducts();
           
            if(productos.length > 0)
            {
                //Tendría que haber otro if que valide el ID a eliminar
                   for(let x = 0; x < productos.length; x++)
                {
                    if(productos[x].id === ide)
                    {
                        productos[x].title = titleInp       !== null ? titleInp : productos.title;
                        productos[x].description = descrInp !== null ? descrInp : productos.description;
                        productos[x].price = priceInp       !== null ? priceInp : productos.price;
                        productos[x].thumbnail = thumbInp   !== null ? thumbInp : productos.thumbnail;
                        productos[x].code = codeInp         !== null ? codeInp  : productos.code;
                        productos[x].stock = stockInp       !== null ? stockInp : productos.stock;

                        await fs.promises.writeFile(this.path, JSON.stringify(productos, null, '\t'));
                        
                        return console.log(productos);
                    }
                }

                return console.log("No existen productos con ese ID")
            }
            else
            {
                return console.log("No existen productos a actualizar")
            }

        }
        catch(error)
        {
            console.log(error);
        }
        
    }

    DeleteProduct = async (ide) => {
        try
        {
            const productos = await this.GetProducts();

            if(productos.length > 0)
            {
                for(let x = 0; x < productos.length; x++)
                {
                    if(productos[x].id === ide)
                    {
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
                
                return console.log("No hay productos con el ID provisto!");
                
            }
            else
            {
                return console.log("No hay productos con el ID provisto!");
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
