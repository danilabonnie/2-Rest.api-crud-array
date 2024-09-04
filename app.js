const express = require ('express')
const fs = require ('fs') //permite trabajar con archivos (file system). Viene incluida con node, no se instala
const app = express();
const port = 3000


//middleware
app.use(express.json()) 

const leeDatos = ()=>{
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
    fs.writeFileSync('./data/datos.json',json.stringify(datos))//convierte un objeto en js a json

    }catch(error){
        console.log(error)
    }
}

app.get('/productos', (req,res)=>{
    res.send('listado de productos')
})

app.post('/productos', (req,res)=>{
    res.send('cargo listado de productos')
})

app.put('/productos', (req,res)=>{
    res.send('put')
})

app.delete('/productos', (req,res)=>{
    res.send('borrando')
})

app.get('/productos', (req,res)=>{
    res.send('productos')
})

app.listen(3000, ()=>{
    console.log(`servidor corriendo en el puerto ${port}`)
}
)