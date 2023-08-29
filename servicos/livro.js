const fs = require("fs");

function getTodosLivros() {
    return JSON.parse(fs.readFileSync('livros.json'));
}

function getLivroPorId(id) {
    const livros = JSON.parse(fs.readFileSync('livros.json'));

    const lirosFiltrados = livros.filter( livro => livro.id === id)[0];

    return lirosFiltrados;
}

function insereLivro(livroNovo) {
    const livros = JSON.parse(fs.readFileSync('livros.json'));
    // Adiciona tudo que tem na lista livros mais o livroNovo.
    const novaListaDeLivros = [ ...livros, livroNovo ];
    // Reescreve o arquivo com os novos dados.
    fs.writeFileSync('livros.json', JSON.stringify(novaListaDeLivros));
}

function modificaLivro(modificacoes, id) {
    let livrosAtuais = JSON.parse(fs.readFileSync('livros.json'));

    const indiceModificado = livrosAtuais.findIndex(livro => livro.id === id);

    // Se existir o campo que vem no modificacoes dentro do livrosatuais ele muda o valor, senao ele adiciona o novo campo.
    const conteudoMudado = { ...livrosAtuais[indiceModificado], ...modificacoes };

    livrosAtuais[indiceModificado] = conteudoMudado;

    fs.writeFileSync('livros.json', JSON.stringify(livrosAtuais));
}

function deletaLivroPorId(id) {
    let livrosAtuais = JSON.parse(fs.readFileSync('livros.json'));

    const livrosFiltrados = livrosAtuais.filter(livro => livro.id !== id);

    fs.writeFileSync('livros.json', JSON.stringify(livrosFiltrados));
}

module.exports = {
    getTodosLivros,
    getLivroPorId,
    insereLivro,
    modificaLivro,
    deletaLivroPorId
}