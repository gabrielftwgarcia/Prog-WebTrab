//Commando para exportar json do banco
//mongoexport -h ds139427.mlab.com:39427 -d heroku_gw46d2k3 -c products -u admin -p password1 -o dbProducts.json

var jsonTest = [
    {
        'description' : 'RTX 2080 Super',
        'image' : '/images/1562471342202nvidia-geforce-rtx-2080-super.webp'
    },
    {
        'description' : 'Teste Imagem Grande',
        'image' : '/images/1562471368496Captura de tela de 2018-05-14 21-00-50.png'
    }
    
]

// UMA MANEIRA DE CONSEGUIR DADOS DO BANCO
var ApiDBProductsJSON = 'https://api.mlab.com/api/1/databases/heroku_gw46d2k3/collections/products?apiKey=2olqeRes1Gr6N7gDDUl2BRVlUJekxPXK'

var UrlApiProductsJSON = 'localhost:3000/product-json'

var dinamicContainer = document.getElementById("dinamicTest");

var dinamicButton = document.getElementById("dinamic");
dinamicButton.addEventListener('click', dinamicTrigger)

function dinamicTrigger(){
    //renderHTML(jsonTest);
    //renderHTML2(jsonTest);
    getDataFromServer();
    renderHTML(jsonTest);

}
renderHTML(jsonTest);

function getDataFromServer(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', ApiDBProductsJSON , true);

    xhr.onreadystatechange = function(){
        if(this.status == 200 && xhr.readyState ==4){
            
            jsonTest =JSON.parse(this.responseText);
        }
    }

    xhr.onprogress = function(){
        console.log('XMLHttpsRequest On progress')
    }
    xhr.onerror = function(){
        console.log('Erro no requerimento do JSON do Banco');
    }

    xhr.send();
}
function renderHTML(data){
    var htmlstring = "";
    for(i = 0; i < data.length; i++){
    htmlstring += "<div class='bannerWrapper'>"+
                    "<div class='bannerWrapperText'>"+
                      "<h1>RTX. CHEGOU A HORA.</h1>"+
                      "<h2>" + data[i].description + "</h2>"+
                      "<span class='container'>SAIBA MAIS</span>"+
                      "</div><div class='bannerWrapperImage'>"+
                      "<img class='bannerImage' src='"+ data[i].image + "' alt='Erro'></img>"+
                    "</div>"+
                  "</div>";
    }
    dinamicContainer.innerHTML  = htmlstring;
}

/* --- Via template HBS
function renderHTML2(data){
    console.log("Teste 1");
    var rawTemplate = document.getElementById("bannersTemplate").innerHTML;
    var compiledTemplate = Handlebars.compile(rawTemplate);
    var generatedHTML = compiledTemplate(jsonTest);
    var bannersContainer = document.getElementById("bannersContainer");
    console.log("Teste 1");

    bannersContainer.innerHTML = generatedHTML;
    console.log("Teste 1");
}*/

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