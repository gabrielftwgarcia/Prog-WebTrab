// JSON Estático para testes
var databaseJSON = [
    {
        'description' : 'RTX 2080 Super',
        'image' : '/images/1562471342202nvidia-geforce-rtx-2080-super.webp'
    }
]

// UMA MANEIRA DE CONSEGUIR DADOS DO BANCO
var ApiDBProductsJSON = 'https://api.mlab.com/api/1/databases/heroku_gw46d2k3/collections/products?apiKey=2olqeRes1Gr6N7gDDUl2BRVlUJekxPXK';
var UrlApiProductsJSON = 'localhost:3000/product-json';

//Referencia elementos HTML relacionados a busca
var searchBtn = document.getElementById("searchForm").addEventListener('submit', renderSearch);
var inputBox = document.getElementById("searchInput").addEventListener('keyup', sugestSearch)
var inputBox = document.getElementById("searchInput").addEventListener('click', getDataFromServer)
var searchInput = document.getElementById("searchInput")
var search = "";
//Referencia ao container de sugestões que é populado durante execução
var sugestionContainer = document.getElementById("sugestionContainer");

// Ao clicar em dinamico, recupera as informações armazenadas no mlab relacionadas ao banco de dados da aplicação
var dinamicButton = document.getElementById("dinamic");
dinamicButton.addEventListener('click', dinamicTrigger);
var dinamicContainer = document.getElementById("dinamicTest");
var progressContainer = document.getElementById("requestProgress");

renderHTML();

//Função que pede atualização dos dados para API e renderiza a página
function dinamicTrigger(){
    //renderHTML2(databaseJSON);
    getDataFromServer();
    renderHTML();

}

//Função que faz a requisição ajax para receber os dados do Banco e atualiza a variavel local com os dados atualizados
function getDataFromServer(){
    var xhr = new XMLHttpRequest();
    
    xhr.open('GET', ApiDBProductsJSON , true);

    //Verificação do estado da requisição para indicador de progresso
    xhr.onreadystatechange = function(){  
        if(this.readyState == 2){
            progressContainer.innerHTML = "Status requisição XMLHTTP: Requisição recebida";
            console.log("Status requisição XMLHTTP: Requisição recebida");
        }
        else if(this.readyState == 3){
            progressContainer.innerHTML = "Status requisição XMLHTTP: Requisição sendo processada";
            console.log("Status requisição XMLHTTP: Requisição sendo processada");
        }
        else if(this.status == 200 && xhr.readyState ==4){
            progressContainer.innerHTML = "Status requisição XMLHTTP: Requisição finalizada";
            console.log("Status requisição XMLHTTP: Requisição finalizada");
            // Atualizando o JSON da aplicação quando a requisição HTTP está pronta
            databaseJSON =JSON.parse(this.responseText);
        }
    }
    //Tratamento do erro na requisição
    xhr.onerror = function(){
        console.log('Erro no requerimento do JSON do Banco');
    }

    xhr.send();
    progressContainer.innerHTML = "Status requisição XMLHTTP: Requisição iniciada";
}

// Método que renderiza o novo conteudo HTML com base no arquivo JSON e na string de busca
function renderHTML(){
    var htmlstring = "";
    //Teste String de busca //console.log("search :" + search);

    //Tratamento caso a String de busca seja vazia
    if(search == ""){
        for(i = 0; i < databaseJSON.length; i++){
            //Teste Descrição caso busca negativa //console.log("Desc- :" + databaseJSON[i].description);
            //Geração do HTML necessário para renderizar adequadamente
            htmlstring += "<div class='bannerWrapper'>"+
            "<div class='bannerWrapperText'>"+
            "<h1>RTX. CHEGOU A HORA.</h1>"+
            "<h2>" + databaseJSON[i].description + "</h2>"+
            "<span class='container'>SAIBA MAIS</span>"+
            "</div><div class='bannerWrapperImage'>"+
            "<img class='bannerImage' src='"+ databaseJSON[i].image + "' alt='Erro'></img>"+
            "</div>"+
            "</div>";
        }
    }

    //Tratamento caso a String de busca não seja vazia
    else{
        for(i = 0; i < databaseJSON.length; i++){
            if(search == databaseJSON[i].description){
                //Teste Descrição caso busca positiva //console.log("Desc+ :" + databaseJSON[i].description);
                //Geração do HTML necessário para renderizar adequadamente
                htmlstring += "<div class='bannerWrapper'>"+
                "<div class='bannerWrapperText'>"+
                "<h1>RTX. CHEGOU A HORA.</h1>"+
                "<h2>" + databaseJSON[i].description + "</h2>"+
                "<span class='container'>SAIBA MAIS</span>"+
                "</div><div class='bannerWrapperImage'>"+
                "<img class='bannerImage' src='"+ databaseJSON[i].image + "' alt='Erro'></img>"+
                "</div>"+
                "</div>";
            }
            
        }
    }
    // Inserindo o conteúdo no conteiner dinâmico
    dinamicContainer.innerHTML  = htmlstring;
}

//Atualiza variavel de Busca de acordo com input, e renderiza a pagina novamente
function renderSearch(e){
    //Evita procedimento normal do SUBMIT, para que não recarregue a pagina
    e.preventDefault();

    //Teste string busca //console.log("valor" + searchInput.value);
    search = searchInput.value;
    renderHTML();
}

//Função que sugere palavras no campo de busca baseado no JSON recebido do banco
function sugestSearch(){
    sugestionHTML = '';
    
    sugestion = searchInput.value;
    for(var i = 0; i < databaseJSON.length; i++){
        //console.log("Sugest "+ sugestion);

        //console.log("String "+ databaseJSON[i].description);
        if(databaseJSON[i].description.search(sugestion) >= 0){
            
            //Teste verificação if //console.log("Aceito: " + databaseJSON[i].description);
            //Contrução do HTML para que as sugestões apareçam
            sugestionHTML +=    "<div class='searchSugestion'>" +
                                databaseJSON[i].description + "</div>";
        }
        else{
            console.log("NOPEEE: " + databaseJSON[i].description);
        }
        //Verificação caso usuário limpou o campo de entrada, para tambem retirar as sugestões
        if(sugestion == ""){ sugestionHTML = ""};
        //Adicionar o HTML construido ao conteiner de sugestões
        sugestionContainer.innerHTML = sugestionHTML;
    }
}

//Executa função dinamicTrigger a cada 5 segundos
setInterval(function(){ dinamicTrigger(); }, 5000);

/* Renderização do HTML via template HBS (Não é mais utilizado, problemas)
function renderHTML2(data){
    console.log("Teste 1");
    var rawTemplate = document.getElementById("bannersTemplate").innerHTML;
    var compiledTemplate = Handlebars.compile(rawTemplate);
    var generatedHTML = compiledTemplate(databaseJSON);
    var bannersContainer = document.getElementById("bannersContainer");
    console.log("Teste 1");

    bannersContainer.innerHTML = generatedHTML;
    console.log("Teste 1");
}*/

//Função antiga do modal de login (Não é mais utilizado)
/*<script>
    function userLogin() {

        if (document.getElementById('login').value === "" || document.getElementById('senha').value === "") {
            alert("Os campos login e senha devem ser preenchidos para proceder!");
        }
        else {
            // redireciona para a página de cadastro de dados
            alert("parebens pelo login")
        }
    }
    function abrirTelaLogin(){
        window.location.href = "http://localhost:3000/login";        
    }
</script>*/