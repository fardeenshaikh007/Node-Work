//http module

const http=require('http')
const fs=require('fs')
const path=require('path')

const app=http.createServer((req, res) =>{
   // console.log(req.url)
   res.writeHead(200,{
    'Content-Type': 'text/html'
})
    // if(req.url ==='/'){
    //    fs.readFile(path.join(__dirname,'public','index.html'),(err,content) =>{
    //        if(err){
    //            throw err
    //        }
    //        res.end(content)
   //})

    // }else if(req.url ='/about'){
    //    fs.readFile(path.join(__dirname,'public','about.html'),(err,content) =>{
    //        if(err){
    //            throw err
    //        }
    //        res.end(content)
   //})
   // }
   
   // res.end('<h1>hello from server </h1>')

   let filepath=path.join(__dirname,'public',req.url ==='/' ? 'index.html' : req.url )
   let ext=path.extname(filepath)
   let contentType='text/html'
   if(!ext){
       filepath +='html'
   }
   switch(ext){
       case '.css':
           contentType='text/css'
           break

        case '.js':
        contentType='text/javascript'
        break
        default:
            contentType='text/html'

   }

   fs.readFile(filepath,(err,content)=>{
        if(err){
            fs.readFile(path.join(__dirname,'public','Error.html'),(err,data)=>{
                if(err){
                    res.writeHead(500)
                      res.end('error')
                }else{
                    res.writeHead(404,{
                        'content-Type':contentType
                    })
                    res.end(data)

                }
                

            })
        }else{
            res.writeHead(200,{
                'content-Type':contentType
            })
            res.end(content)
        }

     //  if(err){
     //      res.writeHead(500)
     //      res.end('error')
      // }

   })
})

const PORT=process.env.PORT || 3000
app.listen(PORT,() =>{
       console.log(`listing on ${PORT}`)
})