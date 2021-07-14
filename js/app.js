function Deletar(id){
  fetch('http://api.josinon.codes/api/contatos/'+id,{
    method: 'DELETE',
    
    }).then( response => response.json())
    .then(response => {
        renderTable()
        successMessage('Cadastro deletado com sucesso!!')}).catch(Erro => {
          M.toast({
            html: 'houve algum erro, tente novamente em breve.',
            classes: 'rounded red lighten-1'})
        })
    
  }





function submitEdit(id){
      let contato = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        dataNascimento: document.getElementById('nascimento').value
    }

    
    fetch('http://api.josinon.codes/api/contatos/'+id, {
        method: 'PUT',
        body: JSON.stringify(contato),
        headers: {
          'content-type': 'application/json'
        }  
    }).then( response => response.json())
    .then(response => {
        renderTable()
        successMessage('Cadastro editado com sucesso!!!').catch(Erro => {
          M.toast({
            html: 'houve algum erro, tente novamente em breve.',
            classes: 'rounded red lighten-1'})
        })
    })
}


function renderEdit(id){

    fetch('http://api.josinon.codes/api/contatos/'+id)
    .then( response => response.json())
    .then( contato => {

      rootElement = document.getElementById('root');
      rootElement.innerHTML = `
             <form>
                <input id="id" type="hidden" values="${contato.id}">
                <div class="row">
                <div class="input-field col s6">
                    <input id="nome" type="text" class="validate" value="${contato.nome}" >
                    <label for="nome" class="active">Nome</label>
                </div>
                <div class="input-field col s6">
                    <input id="email" type="email" class="validate" value="${contato.email}">
                    <label for="email" class="active">Email</label>
                </div>
                </div>
    
                <div class="row">
                <div class="input-field col s6">
                  <input id="telefone" type="tel" class="validate" value="${contato.telefone}">
                  <label for="telefone" class="active">Telefone</label>
                </div>
                <div class="input-field col s6">
                  <input id="nascimento" type="date" class="validate" value="${contato.dataNascimento}">
                  <label for="nascimento" class="active">Data Nascimento</label>
                </div>
                </div>
                <div class="row">
                  <div class="col s4"></div>
                  <div class="col s4"></div>
                  <div class="col s4">
                     <a onclick="submitEdit(${contato.id})" id="botaosalvar" class="waves-effect waves-light btn"><i class="material-icons">save</i>  Salvar</a>
                     <a onClick="renderTable()" id="botaocancelar" class="waves-effect waves-light btn red lighten-2"><i class="material-icons">cancel</i>  Cancelar</a>
                  </div>
                      
                </div>

              </form>
          
          `
      
    

    }).catch(Erro => {
      M.toast({
        html: 'houve algum erro, tente novamente em breve.',
        classes: 'rounded red lighten-1'})
    })
    
    
}




function renderRows(contatos){

    let rows = ''

    for (contato of contatos) {
        let row = `
            <tr>
                <td>${contato.nome}</td>
                <td>${contato.email}</td>
                <td>
                <a onClick=renderEdit(${contato.id}) href="#"><i class="material-icons">edit</i></a>
                <a onClick=Deletar(${contato.id}) href="#"><i id="botaodelete" class="material-icons">delete</i></a>
                </td>
            </tr>           
        `
        rows += row
    }

    return rows

}

function renderTable(){


    fetch('http://api.josinon.codes/api/contatos')
    .then( response => response.json())
    .then( contatos => {
      rootElement = document.getElementById('root');


      let rows = renderRows(contatos)
  
      
      rootElement.innerHTML = `
            <table>
            <thead>
              <tr>
                <th class="corth">Name</th>
                <th class="corth">email</th>
                <th class="corth">Opções</th>
              </tr>
            </thead>
        
            <tbody>
              ${rows}
            </tbody>
          </table>
            
            
      `
            

    }).catch(Erro => {
      M.toast({
        html: 'houve algum erro, tente novamente em breve.',
        classes: 'rounded red lighten-1'})
    })

    
};

function successMessage(message){
    M.toast({
      html: message,
      classes: 'rounded green accent-3'
    })

}


function submitForm(){
    
  let contato = {
      nome: document.getElementById('nome').value,
      email: document.getElementById('email').value,
      telefone: document.getElementById('telefone').value,
      dataNascimento: document.getElementById('nascimento').value,
  }

  fetch('http://api.josinon.codes/api/contatos', {
      method: 'POST',
      body: JSON.stringify(contato),
      headers: {
        'content-type': 'application/json'
      }  
    }).then( response => response.json())
    .then(response => {
        renderTable()
        successMessage('Cadastro salvo com sucesso!!!')
    }).catch(Erro => {
      M.toast({
        html: 'houve algum erro, tente novamente em breve.',
        classes: 'rounded red lighten-1'})
    })
}



function renderForm(){
  rootElement = document.getElementById('root');
  rootElement.innerHTML = `
    <form>
        <div class="row">
          <div class="input-field col s6">
            <input id="nome" type="text" class="validate">
            <label for="nome">Nome</label>
          </div>
          <div class="input-field col s6">
            <input id="email" type="email" class="validate">
            <label for="email">Email</label>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s6">
            <input id="telefone" type="tel" class="validate">
            <label for="telefone">Telefone</label>
          </div>
          <div class="input-field col s6">
            <input id="nascimento" type="date" class="validate">
            <label for="nascimento">Data Nascimento</label>
          </div>
        </div>
        <div class="row">
          <div class="col s4"></div>
          <div class="col s4"></div>
          <div class="col s4">
            <a onclick="submitForm()" id="botaosalvar" class="waves-effect waves-light btn"><i class="material-icons">save</i>  Salvar</a>
            <a onClick="renderTable()" id="botaocancelar" class="waves-effect waves-light btn red lighten-2"><i class="material-icons">cancel</i>  Cancelar</a>
          </div>
            
        </div>



  </form>
  
  `
}


document.getElementById('novoContato').addEventListener('click',renderForm)