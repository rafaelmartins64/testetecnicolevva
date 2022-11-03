const url = "http://localhost:4003/users"


// Enviando requisição para a api listar todos os usuários
function getUser() {
  axios.get(url)
    .then(response => {
      const data = response.data
      renderResults.textContent = JSON.stringify(data)

    })
    .catch(error => console.log(error))
}

// Enviando requisição para a api listar um usuario pelo id
function getOneUser() {
  event.preventDefault()
  let userId = document.getElementById("id").value;

  axios.get(`${url}/${userId}`)
    .then(response => {
      const data = response.data
      renderResults.textContent = JSON.stringify(data)

    })
    .catch(error => console.log(error))
}

//Enviando requisição para api adcionar um novo usuario
function addNewUser() {
  event.preventDefault()
  let username = document.getElementById("nome").value;
  let useremail = document.getElementById("email").value;
  let usercpf = document.getElementById("cpf").value;
  let userpassword = document.getElementById("senha").value;

  let newUser =  {
    nome : username,
    email : useremail,
    cpf : usercpf,
    senha: userpassword
  }
  axios.post(url, newUser)
  .then(response => {
    alert(JSON.stringify(response.data))
  })
  .catch(error => console.log(erro))
}

// Enviando requisição para a api editar um usuário
function updateUser() {
  event.preventDefault()
  let userId = document.getElementById("id").value;
  let username = document.getElementById("nome").value;
  let useremail = document.getElementById("email").value;
  let usercpf = document.getElementById("cpf").value;
  let userpassword = document.getElementById("senha").value;

  let userUpdated =  {
    nome : username,
    email : useremail,
    cpf : usercpf,
    senha: userpassword
  }
  
  axios.put(`${url}/${userId}`, userUpdated)
  .then(response => {
    alert(JSON.stringify(response.data))
  })
  .catch(error => console.log(error))
}

// Enviando requisição para api excluir um usuario
function deleteUser() {
 
  let idDelete = document.getElementById("deleteId").value;

  axios.delete(`${url}/${idDelete}`)
  .then(response => {
    alert(JSON.stringify(response.data))
  })
  .catch(error => console.log(error))
}
