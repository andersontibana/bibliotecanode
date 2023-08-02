import chalk from "chalk";
import pegaArquivo from "./index.js";
import fs from 'fs';

const caminho = process.argv;
function imprimeLista(resultado, nomeDeArquivo = ''){
    console.log(chalk.yellow("lista de links do arquivo"), 
    chalk.magenta(nomeDeArquivo), 
    resultado)
}

async function processaTexto(argumentos){
    const caminho = argumentos[2];
    try {
        fs.lstatSync(caminho);
    } catch (erro) {
        if (erro.code === 'ENOENT') 
            console.log('arquivo ou diretório não existe');
            return
    }
    if(fs.lstatSync(caminho).isFile()){
        const resultado = await pegaArquivo(caminho);
        imprimeLista(resultado);
    } else if(fs.lstatSync(caminho).isDirectory()){
        const arquivos = await fs.promises.readdir(caminho);
        arquivos.forEach(async(nomeDeArquivo) => {
            const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`)
            imprimeLista(lista, nomeDeArquivo)
        })
    }
    
}

processaTexto(caminho);