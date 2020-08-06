import fs from "fs";

function criaJson() {
  /* Implementar um método que irá criar um arquivo JSON para cada estado representado no arquivo Estados.json, e o seu conteúdo será um array das cidades pertencentes aquele estado, de acordo com o arquivo Cidades.json. O nome do arquivo deve ser o UF do estado, por exemplo: MG.json. */

  fs.readFile("./Cidades-Estados/Estados.json", "utf8", (err, estados) => {
    if (err) throw err;
    let jsonEstados = JSON.parse(estados);
    let arrayJsonEstados = Array.from(jsonEstados);

    fs.readFile("./Cidades-Estados/Cidades.json", "utf8", (err, cidades) => {
      if (err) throw err;

      let jsonCidades = JSON.parse(cidades);
      let arrayJsonCidades = Array.from(jsonCidades);

      arrayJsonEstados.forEach((element) => {
        let conteudo = arrayJsonCidades
          .filter((cidadeEstado) => {
            if (element.ID == cidadeEstado.Estado) return true;
          })
          .map((arrayMapped) => `"${arrayMapped.Nome}"`);
        fs.writeFile(
          "./Estados-Criados/" + element.Sigla + ".json",
          `{"Cidades":[${conteudo}]}`,
          (err) => {
            if (err) throw err;
          }
        );
      });
    });
  });
}

function numeroDeCidades(uf) {
  /* Criar um método que recebe como parâmetro o UF do estado, realize a leitura do arquivo JSON correspondente e retorne a quantidade de cidades daquele estado. */
  let json = JSON.parse(
    fs.readFileSync(`./Estados-Criados/${uf.toUpperCase()}.json`)
  );
  return json.Cidades.length;
}

function maioresEstados() {
  /* Criar um método que imprima no console um array com o UF dos cinco estados que mais possuem cidades, seguidos da quantidade, em ordem decrescente. Utilize o método criado no tópico anterior. Exemplo de impressão: [“UF - 93”, “UF - 82”, “UF - 74”, “UF - 72”, “UF - 65”] */
  let arrayMaioresCidades = [];

  let estados = JSON.parse(fs.readFileSync("./Cidades-Estados/Estados.json"));
  estados.forEach((element) => {
    //`${element.Sigla} - ${numeroDeCidades(element.Sigla)}`
    let estadoNumeros = {
      UF: element.Sigla,
      Numero: numeroDeCidades(element.Sigla),
    };
    arrayMaioresCidades.push(estadoNumeros);

    arrayMaioresCidades.sort((a, b) => {
      return b.Numero - a.Numero;
    });
  });

  let cincoMaioresJS = arrayMaioresCidades.slice(0, 5);
  let cincoMaioresArray = cincoMaioresJS.map(
    (cidades) => `${cidades.UF} - ${cidades.Numero}`
  );
  console.log(cincoMaioresArray);
}

function menoresEstados() {
  /* Criar um método que imprima no console um array com o UF dos cinco estados que menos possuem cidades, seguidos da quantidade, em ordem decrescente. Utilize o método criado no tópico anterior. Exemplo de impressão: [“UF - 30”, “UF - 27”, “UF - 25”, “UF - 23”, “UF - 21”] */

  let arrayMenoresEstados = [];

  let estados = JSON.parse(fs.readFileSync("./Cidades-Estados/Estados.json"));
  estados.forEach((element) => {
    //`${element.Sigla} - ${numeroDeCidades(element.Sigla)}`
    let estadoNumeros = {
      UF: element.Sigla,
      Numero: numeroDeCidades(element.Sigla),
    };
    arrayMenoresEstados.push(estadoNumeros);

    arrayMenoresEstados.sort((a, b) => {
      return a.Numero - b.Numero;
    });
  });

  let cincoMaioresJS = arrayMenoresEstados.slice(0, 5).reverse();
  let cincoMaioresArray = cincoMaioresJS.map(
    (cidades) => `${cidades.UF} - ${cidades.Numero}`
  );
  console.log(cincoMaioresArray);
}

function cidadesMaioresNomes() {
  /* Criar um método que imprima no console um array com a cidade de maior nome de cada estado, seguida de seu UF. Em caso de empate, considerar a ordem alfabética para ordená-los e então retornar o primeiro. Por exemplo: [“Nome da Cidade – UF”, “Nome da Cidade – UF”, ...]. */
  let arrayCidadeMaiorNome = [];
  let estados = JSON.parse(fs.readFileSync("./Cidades-Estados/Estados.json"));
  estados.forEach((element) => {
    let cidades = JSON.parse(
      fs.readFileSync(`./Estados-Criados/${element.Sigla}.json`)
    );
    let organizado = cidades.Cidades.sort((a, b) => {
      return b.length - a.length;
    });
    arrayCidadeMaiorNome.push(`${organizado[0]} - ${element.Sigla}`);
  });
  console.log(arrayCidadeMaiorNome);
}

function cidadesMenorNomes() {
  /* Criar um método que imprima no console um array com a cidade de menor nome de cada estado, seguida de seu UF. Em caso de empate, considerar a ordem alfabética para ordená-los e então retorne o primeiro. Por exemplo: [“Nome da Cidade – UF”, “Nome da Cidade – UF”, ...].
   */
  let arrayCidadeMenorNome = [];
  let estados = JSON.parse(fs.readFileSync("./Cidades-Estados/Estados.json"));
  estados.forEach((element) => {
    let cidades = JSON.parse(
      fs.readFileSync(`./Estados-Criados/${element.Sigla}.json`)
    );
    let organizado = cidades.Cidades.sort((a, b) => {
      return a.length - b.length;
    });
    arrayCidadeMenorNome.push(`${organizado[0]} - ${element.Sigla}`);
  });
  console.log(arrayCidadeMenorNome);
}

function cidadeMaiorNomeTodos() {
  /* Criar um método que imprima no console a cidade de maior nome entre todos os estados, seguido do seu UF. Em caso de empate, considerar a ordem alfabética para ordená-los e então retornar o primeiro. Exemplo: “Nome da Cidade - UF". */
  let jsonCidades = JSON.parse(
    fs.readFileSync("./Cidades-Estados/Cidades.json")
  );
  let jsonEstados = JSON.parse(
    fs.readFileSync("./Cidades-Estados/Estados.json")
  );
  let soCidades = jsonCidades
    .map((element) => {
      return {
        cidade: element.Nome,
        UF: element.Estado,
      };
    })
    .sort((a, b) => {
      return b.cidade.length - a.cidade.length;
    });
  console.log(
    `${soCidades[0].cidade} - ${
      jsonEstados.find((element) => element.ID == soCidades[0].UF).Sigla
    }`
  );
}

function cidadeMenorNomeTodos() {
  /* Criar um método que imprima no console a cidade de menor nome entre todos os estados, seguido do seu UF. Em caso de empate, considerar a ordem alfabética para ordená-los e então retornar o primeiro. Exemplo: “Nome da Cidade - UF". */

  let jsonCidades = JSON.parse(
    fs.readFileSync("./Cidades-Estados/Cidades.json")
  );
  let jsonEstados = JSON.parse(
    fs.readFileSync("./Cidades-Estados/Estados.json")
  );
  let soCidades = jsonCidades
    .map((element) => {
      return {
        cidade: element.Nome,
        UF: element.Estado,
      };
    })
    .sort((a, b) => {
      if (a.cidade.length - b.cidade.length == 0) {
        return a.cidade.localeCompare(b.cidade);
      }
      return a.cidade.length - b.cidade.length;
    });
  console.log(
    `${soCidades[0].cidade} - ${
      jsonEstados.find((element) => element.ID == soCidades[0].UF).Sigla
    }`
  );
}

//criaJson();
//console.log(numeroDeCidades("ac"));
//maioresEstados();
//menoresEstados();
//cidadesMaioresNomes();
//cidadesMenorNomes();
//cidadeMaiorNomeTodos();
//cidadeMenorNomeTodos();
