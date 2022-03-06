let inputCep = document.querySelector('#cep') //input do cep
let btnBuscar = document.querySelector('#buscar') //botão de busca
let resultCidade = document.querySelector('#resultCidade')//campo de resultado

btnBuscar.addEventListener('click', BuscarCep)

//verifica a quantidade de dígitos e insere o cep na API
function BuscarCep() {
    var cep = inputCep.value
    var http = `https://viacep.com.br/ws/${cep}/json/`

    cep.length > 8 ? alert('O cep deve conter até 8 digitos') : buscarDados(http)
}

//busca os dados na API
function buscarDados(http) {
    fetch(http).then((res) => {
        return res.json()
    }).then((data) => {
        data.erro ? alert('Cep Não encontrado') : endereco(data)
    })
}

//monta o endereço com os dados da API
function endereco(data) {
    if (data.bairro == '') {
        let end = `Cidade: ${data.localidade} <br> 
                   Estado: ${data.uf}`

        resultCidade.innerHTML = end
    } else if (data.bairro != '') {
        let end = `Logradouro: ${data.logradouro} <br>
                Bairro: ${data.bairro} <br>
                Cidade: ${data.localidade}<br>
                Estado: ${data.uf} <br>`

        resultCidade.innerHTML = end
    }
}