
  const items =  () =>{

    fetch('./lista.txt').then(response =>{
      return response.json() 
     
    }).then(data =>{
        let html = data.data.map(produto=>{
            return `
          
         <div class="col-12 col-sm-8 col-md-6 col-lg-4 filter ${produto.filtro}"  class="gallery-item" data-aos="zoom-in" data-aos-delay="150" >
           <div class="card" > 
             <img class="card-img" src="${produto.imagem}" alt=${produto.produto}>
             <div class="card-img-overlay d-flex justify-content-end">
               <a href="https://wa.me/5551980256547" class="card-link text-danger like">
               <!-- <i class="fas fa-heart"></i> -->
               </a>
             </div>
           </div>
             <div class="card-body" >
               <h4 class="card-title">${produto.produto}</h4>
               <h6 class="card-subtitle mb-2 text-muted">Marca:${produto.marca}</h6>
               <p class="card-text">
               ${produto.description}
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
          const filtro = data.data.filter(produto=>{
           return produto.produto.toLowerCase().includes(text) || produto.description.toLowerCase().includes(text)
           || produto.marca.toLowerCase().includes(text)
         
          }
          )
          let procura = filtro.map(
            produto=>{
            return `<div class="col-12 col-sm-8 col-md-6 col-lg-4 filter ${produto.filtro}"  class="gallery-item" data-aos="zoom-in" data-aos-delay="150" >
           <div class="card" > 
             <img class="card-img" src="${produto.imagem}" alt=${produto.produto}>
             <div class="card-img-overlay d-flex justify-content-end">
               <a href="https://wa.me/5551980256547" class="card-link text-danger like">
               <!-- <i class="fas fa-heart"></i> -->
               </a>
             </div>
           </div>
             <div class="card-body" >
               <h4 class="card-title">${produto.produto}</h4>
               <h6 class="card-subtitle mb-2 text-muted">Marca:${produto.marca}</h6>
               <p class="card-text">
               ${produto.description}
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
 