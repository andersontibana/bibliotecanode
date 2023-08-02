
import fs from "fs";
import chalk from "chalk";

function trataErro(erro){
    console.log(erro);
    throw new Error(chalk.red(erro.code, "Não há arquivo no diretório"));
}

function extraiLinks(texto){
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const captura = [...texto.matchAll(regex)];
    const resultados = captura.map(captura => ({[captura[1]]: captura[2]}))
    return resultados;
}


// function pegaArquivo(caminhoArquivo){
//    const encoding = 'utf-8';
//    fs.promises
//     .readFile(caminhoArquivo, encoding)
//     .then((texto) => console.log(chalk.green(texto)))
//     .catch(trataErro) 
// }

async function pegaArquivo(caminhoArquivo){
    try{
        const encoding = 'utf-8'
        const texto = await fs.promises.readFile(caminhoArquivo,encoding);
        console.log(extraiLinks(texto));
        //console.log(chalk.green(texto));
    }
    catch(erro){
        trataErro(erro);
    } finally {
        console.log(chalk.yellow('operação concluída'));
    }
}

pegaArquivo('./arquivos/texto.md');
//setInterval(() => pegaArquivo('./arquivos/'), 5000);
