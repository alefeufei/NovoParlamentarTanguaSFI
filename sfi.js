let params = window.location.search.substr(1).split("&");
let dadosUrl = {};
params.forEach(function (parte) {
  let chaveValor = parte.split("=");
  let chave = chaveValor[0];
  let valor = chaveValor[1];
  dadosUrl[chave] = valor;
});

const anoAtual = new Date().getFullYear();
const anoAnterior = anoAtual - 1;
const doisAnosAtras = anoAtual - 2;
const tresAnosAtras = anoAtual - 3;
fetch(
  `https://sfi.processolegislativo.com.br/integracao/?Parlamentares/${anoAtual}/json`
)
  .then((reponse) => reponse.json())
  .then((json) => {
    let parlamentares = json.Parametros;
    let parlamentar = parlamentares.filter((p) => p.Id === dadosUrl.id);
    escreveParlamentar(parlamentar[0]);
    buscarComissoes();
    // buscarLeis();
    buscarProcessos();
  });

const buscarProcessos = () => {
  fetch(
    `https://sfi.processolegislativo.com.br/integracao/?Processos/0/${dadosUrl.id}/0/${anoAtual}`
  )
    .then((reponse) => reponse.json())
    .then((json) => escreveProcessos(json.rows));
};

const buscarComissoes = () => {
  fetch(
    `https://sfi.processolegislativo.com.br/integracao/?Comissoes/${dadosUrl.id}/0/${anoAtual}`
  )
    .then((reponse) => reponse.json())
    .then((json) => {
      let comissoes = json.Lista.filter(
        (com) =>
          !!com.Membros.filter((Membro) => Membro.Id === dadosUrl.id).length
      );
      escreveComissoes(comissoes);
    });
};

const escreveParlamentar = (parlamentar) => {
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
    '
  >
  <div><img src='${parlamentar.Foto}' style='max-height: 250px; max-width: 200px;'/>
  <div id="partido-foto"> ${parlamentar.Partido}</div>
  </div>
    
    
    <div style='padding: 10px;'>
      <h4>${parlamentar.Nome_Vereador}</h4>
      <h4>${parlamentar.Tratamento}</h4>
      <div>Nascimento: ${parlamentar.DataNascimentoFormatada}</div>
      <p>
      <div>${parlamentar.Perfil}</div>
    </div>
  </div>
  <p>
  `;
};

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
      // '
    >
    <p><div class="button"><a class="meulink" href='https://sfi.processolegislativo.com.br/areapublica/documento/?Processo/${processo.Processo.replace(
      "/",
      "_"
    )}' target="_blank">
  ${escreveData(processo.Data)} - ${processo.Processo} - ${processo.Tipo}
  </a><div></div>
  <i class="fa fa-check"></i>
</div>
    </p><p>
    <p>${processo.Ementa}</p>
    </div>
    `;
  });
};

// PROCESSOS DO ANO ANTERIOR

fetch(
  `https://sfi.processolegislativo.com.br/integracao/?Parlamentares/${anoAnterior}/json`
)
  .then((reponse) => reponse.json())
  .then((json) => {
    let parlamentares = json.Parametros;
    let parlamentar = parlamentares.filter((p) => p.Id === dadosUrl.id);
    escreveParlamentar(parlamentar[0]);
    buscarProcessosAnoAnterior();
  });

const buscarProcessosAnoAnterior = () => {
  fetch(
    `https://sfi.processolegislativo.com.br/integracao/?Processos/0/${dadosUrl.id}/0/${anoAnterior}`
  )
    .then((reponse) => reponse.json())
    .then((json) => escreveProcessosAnoAnterior(json.rows));
};

const escreveProcessosAnoAnterior = (processoAnoAnterior) => {
  console.log(processoAnoAnterior);
  processoAnoAnterior.forEach((processoAnoAnterior) => {
    document.querySelector("#processoAnoAnterior").innerHTML += `
    <div
    style='
        padding: 10px;
        margin-bottom: 10px;
        -webkit-box-shadow: 0 0 20px 0 rgb(0 0 0 / 50%);
        box-shadow: 0 0 20px 0 rgb(0 0 0 / 50%);
        border-radius: 5px;  
      '
    >
    <p><div class="button"><a class="meulink" href='https://sfi.processolegislativo.com.br/areapublica/documento/?Processo/${processoAnoAnterior.Processo.replace(
      "/",
      "_"
    )}' target="_blank">
  ${escreveData(processoAnoAnterior.Data)} - ${
      processoAnoAnterior.Processo
    } - ${processoAnoAnterior.Tipo}
  </a><div></div>
  <i class="fa fa-check"></i>
</div>
    </p><p>
    <p>${processoAnoAnterior.Ementa}</p>
    </div>
    `;
  });
};

//

// PROCESSOS DE 2 ANOS ATRÁS

fetch(
  `https://sfi.processolegislativo.com.br/integracao/?Parlamentares/${doisAnosAtras}/json`
)
  .then((reponse) => reponse.json())
  .then((json) => {
    let parlamentares = json.Parametros;
    let parlamentar = parlamentares.filter((p) => p.Id === dadosUrl.id);
    escreveParlamentar(parlamentar[0]);
    buscarProcessos2anosAtras();
  });

const buscarProcessos2anosAtras = () => {
  fetch(
    `https://sfi.processolegislativo.com.br/integracao/?Processos/0/${dadosUrl.id}/0/${doisAnosAtras}`
  )
    .then((reponse) => reponse.json())
    .then((json) => escreveProcessos2anosAtras(json.rows));
};

const escreveProcessos2anosAtras = (processos2AnosAtras) => {
  console.log(processos2AnosAtras);
  processos2AnosAtras.forEach((processos2AnosAtras) => {
    document.querySelector("#processos2AnosAtras").innerHTML += `
    <div
    style='
        padding: 10px;
        margin-bottom: 10px;
        -webkit-box-shadow: 0 0 20px 0 rgb(0 0 0 / 50%);
        box-shadow: 0 0 20px 0 rgb(0 0 0 / 50%);
        border-radius: 5px;  
      '
    >
    <p><div class="button"><a class="meulink" href='https://sfi.processolegislativo.com.br/areapublica/documento/?Processo/${processos2AnosAtras.Processo.replace(
      "/",
      "_"
    )}' target="_blank">
  ${escreveData(processos2AnosAtras.Data)} - ${
      processos2AnosAtras.Processo
    } - ${processos2AnosAtras.Tipo}
  </a><div></div>
  <i class="fa fa-check"></i>
</div>
    </p><p>
    <p>${processos2AnosAtras.Ementa}</p>
    </div>
    `;
  });
};

//

// PROCESSOS DE 3 ANOS ATRÁS

fetch(
  `https://sfi.processolegislativo.com.br/integracao/?Parlamentares/${tresAnosAtras}/json`
)
  .then((reponse) => reponse.json())
  .then((json) => {
    let parlamentares = json.Parametros;
    let parlamentar = parlamentares.filter((p) => p.Id === dadosUrl.id);
    escreveParlamentar(parlamentar[0]);
    buscarProcessos3AnosAtras();
  });

const buscarProcessos3AnosAtras = () => {
  fetch(
    `https://sfi.processolegislativo.com.br/integracao/?Processos/0/${dadosUrl.id}/0/${tresAnosAtras}`
  )
    .then((reponse) => reponse.json())
    .then((json) => escreveProcessos3AnosAtras(json.rows));
};

const escreveProcessos3AnosAtras = (processos3AnosAtras) => {
  console.log(processos3AnosAtras);
  processos3AnosAtras.forEach((processo3AnosAtras) => {
    document.querySelector("#processo3AnosAtras").innerHTML += `
    <div
    style='
        padding: 10px;
        margin-bottom: 10px;
        -webkit-box-shadow: 0 0 20px 0 rgb(0 0 0 / 50%);
        box-shadow: 0 0 20px 0 rgb(0 0 0 / 50%);
        border-radius: 5px;  
      '
    >
    <p><div class="button"><a class="meulink" href='https://sfi.processolegislativo.com.br/areapublica/documento/?Processo/${processo3AnosAtras.Processo.replace(
      "/",
      "_"
    )}' target="_blank">
  ${escreveData(processo3AnosAtras.Data)} - ${processo3AnosAtras.Processo} - ${
      processo3AnosAtras.Tipo
    }
  </a><div></div>
  <i class="fa fa-check"></i>
</div>
    </p><p>
    <p>${processo3AnosAtras.Ementa}</p>
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
    <h4>Comissão:</h4>
    <div>${comissao.Nome}</div>  
    <small>${
      comissao.Membros.filter((membro) => membro.Id === dadosUrl.id)[0].Cargo
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
