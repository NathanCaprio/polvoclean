
  const items =  () =>{
    
    fetch('http://localhost:3000/apitags').then(response =>{
      return response.json()
     
    }).then(data =>{
      console.log(data)
      
        let html2 = data.map(tag=>{
            return `
            
            <button class="btn btn-default filter-button" data-filter="${tag.tag}">${tag.tag}</button>
  
  
             
        `
        }).join("")
        let categorias = document.getElementById('categorias')
        categorias.innerHTML = html2
      })
    
      fetch('http://localhost:3000/api').then(response =>{
      return response.json()
     
    }).then(data =>{
      console.log(data)
      
        let html = data.map(produto=>{
            return `
          
         <div class="col-12 col-sm-8 col-md-6 col-lg-4 filter ${produto.tag}"  class="gallery-item" data-aos="zoom-in" data-aos-delay="150" >
           <div class="card" > 
             <img class="card-img" src="${produto.imagem}" alt=${produto.nome}> 
             <div class="card-img-overlay d-flex justify-content-end">
               <a href="https://wa.me/5551980256547" class="card-link text-danger like">
               <!-- <i class="fas fa-heart"></i> -->
               </a>
             </div>
           </div>
             <div class="card-body" >
               <h4 class="card-title">${produto.nome}</h4>
               <h6 class="card-subtitle mb-2 text-muted">Marca:${produto.marca}</h6>
               <p class="card-text">
               ${produto.descricao}
               <div class="buy d-flex justify-content-between align-items-center">
            
                 <div class="price text-success"><h4 class="mt-4">R$${produto.preco}</h4></div>
       <a href="https://wa.me/5551980256547" role="button" class="btn btn-danger mt-3" value="Submit"> <i class="fas fa-shopping-cart"></i> Compre agora</a>
                 
                 </div>
               </div>
           </div>     
        `
        }).join("")
 
 
        document.querySelector('.produtos').innerHTML=html
        const searchBar = document.getElementById('barra')
        searchBar.addEventListener('keyup',(e)=>{
          const text = e.target.value.toLowerCase()
          const filtro = data.filter(produto=>{
           return produto.nome.toLowerCase().includes(text) || produto.descricao.toLowerCase().includes(text)
           || produto.marca.toLowerCase().includes(text)
         
          }
          )
          let procura = filtro.map(
            produto=>{
            return `<div class="col-12 col-sm-8 col-md-6 col-lg-4 filter ${produto.tag}"  class="gallery-item" data-aos="zoom-in" data-aos-delay="150" >
           <div class="card" > 
             <img class="card-img" src="${produto.imagem}" alt=${produto.nome}>
             <div class="card-img-overlay d-flex justify-content-end">
               <a href="https://wa.me/5551980256547" class="card-link text-danger like">
               <!-- <i class="fas fa-heart"></i> -->
               </a>
             </div>
           </div>
             <div class="card-body" >
               <h4 class="card-title">${produto.nome}</h4>
               <h6 class="card-subtitle mb-2 text-muted">Marca:${produto.marca}</h6>
               <p class="card-text">
               ${produto.descricao}
               <div class="buy d-flex justify-content-between align-items-center">
            
               <div class="price text-success"><h4 class="mt-4">R$${produto.preco}</h4></div>
               <a href="https://wa.me/5551980256547" role="button" class="btn btn-danger mt-3" value="Submit"> <i class="fas fa-shopping-cart"></i> Compre agora</a>
                         
                         </div>
               </div>
           </div>     
            `
          })

          let x = document.getElementById('test')
          if(text === ''){
            procura = ''
          }
          x.innerHTML = procura
         
 
        })
     
       
     
       
    }).catch(error=>{
     alert('não foi possível mostrar os produtos')
 
   })
 
   
 
 
   }
   
 items()
 