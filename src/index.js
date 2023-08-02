
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
    return resultados.length !== 0 ? resultados : 'Não existem links no arquivo';
}


async function pegaArquivo(caminhoArquivo){
    try{
        const encoding = 'utf-8'
        const texto = await fs.promises.readFile(caminhoArquivo,encoding);
        return extraiLinks(texto);
        //console.log(chalk.green(texto));
    }
    catch(erro){
        trataErro(erro);
    } finally {
        console.log(chalk.yellow('operação concluída'));
    }
}

export default pegaArquivo;
//pegaArquivo('./arquivos/texto.md');
//setInterval(() => pegaArquivo('./arquivos/'), 5000);
