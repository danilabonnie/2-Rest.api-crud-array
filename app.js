const express = require ('express')
const fs = require ('fs') //permite trabajar con archivos (file system). Viene incluida con node, no se instala
const app = express();
const port = 4000


//middleware
app.use(express.json()) 



const leerDatos = ()=>{
    try{
    const datos = fs.readFileSync('./data/datos.json')
    return JSON.parse(datos)
    //console.log(JSON.parse(datos))
    }catch(error){
        console.log(error)
    }
}

//leeDatos()

const escribeDatos = (datos)=>{
    try{
    fs.writeFileSync('./data/datos.json',JSON.stringify(datos))//convierte un objeto en js a json

    }catch(error){
        console.log(error)
    }
}
//funcion para reindexar vector
function reIndexar(datos){
    let indice =1
    datos.productos.map((p)=>{
    p.id = indice;
    indice++;
})
}


app.get('/productos', (req,res)=>{
    //res.send('listado de productos') 
    const datos=leerDatos()
    res.json(datos.productos)
})

app.post('/productos', (req,res)=>{
    const datos=leerDatos()
    const nuevoProducto={id:datos.productos.length+1,
        ...req.body
    }
    datos.productos.push(nuevoProducto)
    escribeDatos(datos)
    res.json({mensaje:'Nuevo Producto Agregado',
        producto:nuevoProducto
})
    // res.send('cargo listado de productos')
})

app.put('/productos/:id', (req,res)=>{
    //res.send('put')
    const id = req.params.id
    const nuevosDatos = req.body
    const datos=leerDatos()
    const prodEncontrado = datos.productos.find((p)=>p.id==req.params.id)

        if(!prodEncontrado){
          return res.status(404),res.json('No se encuentra el producto')
        }

        datos.productos = datos.productos.map(p=>p.id==req.params.id?{...p,...nuevosDatos}:p)
        escribeDatos(datos)
        res.json({mensaje: 'productos actualizados'})
})

app.delete('/productos/:id', (req,res)=>{
    //res.send('borrando')
    const id = req.params.id
    const datos=leerDatos()
    const prodEncontrado = datos.productos.find((p)=>p.id==req.params.id)

        if(!prodEncontrado){
          return res.status(404),res.json('No se encuentra el producto')
        }

        datos.productos = datos.productos.filter((p)=>p.id!=req.params.id)
        reIndexar(datos)
        escribeDatos(datos)
        res.json({"Mensaje":'producto eliminado'})
})

app.get('/productos/:id', (req,res)=>{
    // res.send('productos')
    const datos=leerDatos()
    const prodEncontrado = datos.productos.find((p)=>p.id==req.params.id)

        if(!prodEncontrado){
          return res.status(404),res.json('No se encuentra el producto')
        }
        else{
         return res.json({
            "mensaje": "producto encontrado",
            "producto": prodEncontrado
        })
        }
})

app.listen(port, ()=>{
    console.log(`servidor corriendo en el puerto ${port}`)
}
)