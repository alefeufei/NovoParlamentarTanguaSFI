let params = window.location.search.substr(1).split("&");
let dadosUrl = {};
params.forEach(function (parte) {
  let chaveValor = parte.split("=");
  let chave = chaveValor[0];
  let valor = chaveValor[1];
  dadosUrl[chave] = valor;
});

fetch(
  "https://sg.processolegislativo.com.br/integracao/?Parlamentares/2022/json"
)
  .then((reponse) => reponse.json())
  .then((json) => {
    let parlamentares = json.Parametros;
    let parlamentar = parlamentares.filter((p) => p.Id == dadosUrl.id);
    escreveParmalmentar(parlamentar[0]);
    // buscarComissoes();
    // buscarLeis();
    // buscarProcessos();
  });

// const buscarLeis = () => {
//   fetch(
//     `https://sg.processolegislativo.com.br/integracao/?Leis/${dadosUrl.id}/0/2022`
//   )
//     .then((reponse) => reponse.json())
//     .then((json) => escreveLeis(json));
// };
const buscarProcessos = () => {
  fetch(
    `https://sg.processolegislativo.com.br/integracao/?Processos/0/${dadosUrl.id}/0/2021`
  )
    .then((reponse) => reponse.json())
    .then((json) => escreveProcessos(json.rows));
};
const buscarComissoes = () => {
  fetch(
    `https://sg.processolegislativo.com.br/integracao/?Comissoes/${dadosUrl.id}/0/2022`
  )
    .then((reponse) => reponse.json())
    .then((json) => {
      let comissoes = json.Lista.filter(
        (com) =>
          !!com.Membros.filter((Membro) => Membro.Id == dadosUrl.id).length
      );
      escreveComissoes(comissoes);
    });
};

const escreveParmalmentar = (parlamentar) => {
  // console.log(parlamentar);
  document.querySelector("#parlamentar").innerHTML = `
  <div 
    style='
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
      -webkit-box-shadow: 0 0 20px 0 rgb(0 0 0 / 50%);
      box-shadow: 0 0 20px 0 rgb(0 0 0 / 50%);
      border-radius: 5px;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;  
    '
  >
    <img 
      src='${parlamentar.Foto}' 
      style='
        max-width: 175px;
      '
    />
    <div
      style='
        padding: 10px;
      '
    >
      <h4>${parlamentar.Nome_vereador}</h4>
      <div>${parlamentar.Tratamento}</div>
      <small>Nascimento: ${parlamentar.DataNascimentoFormatada}</small>
    </div>
  </div>
  `;
};

// const escreveLeis = (leis) => {
//   leis.forEach((lei) => {
//     document.querySelector("#leis").innerHTML += `
//     <div class='Card-Parlamentar'>
//     <p>${lei.Requerente}</p>
//     <p>${escreveData(lei.Data)}</p>
//     <p>${lei.Tipo}</p>
//     <p>${lei.Ementa}</p>
//     </div>
//     `;
//   });
// };

const escreveProcessos = (processos) => {
  console.log(processos);
  processos.forEach((processo) => {
    document.querySelector("#processos").innerHTML += `
    <div
    style='
        padding: 10px;
        margin-bottom: 10px;
        -webkit-box-shadow: 0 0 20px 0 rgb(0 0 0 / 50%);
        box-shadow: 0 0 20px 0 rgb(0 0 0 / 50%);
        border-radius: 5px;  
      '
    >
    <p>${escreveData(processo.Data)} - ${processo.Processo} - ${
      processo.Tipo
    }</p>
    <p>${processo.Ementa}</p>
    </div>
    `;
  });
};

const escreveComissoes = (comissoes) => {
  comissoes.forEach((comissao) => {
    document.querySelector("#comissoes").innerHTML += `
    <div 
      style='
        padding: 10px;
        margin-bottom: 10px;
        -webkit-box-shadow: 0 0 20px 0 rgb(0 0 0 / 50%);
        box-shadow: 0 0 20px 0 rgb(0 0 0 / 50%);
        border-radius: 5px;  
      '
    >
    <div>${comissao.Nome}</div>  
    <small>${
      comissao.Membros.filter((membro) => membro.Id == dadosUrl.id)[0].Cargo
    }</small>
    </div>
    `;
  });
};

const escreveData = (data = "000000") => {
  let now = data.toString();
  now = `${now.substr(6, 2)}/${now.substr(4, 2)}/${now.substr(0, 4)}`;
  return now;
};
