const cardsContainer = document.getElementById('cardsContainer');
const mensagem = document.getElementById('mensagem');
const campoBusca = document.getElementById('campoBusca');
const filtroStatus = document.getElementById('filtroStatus');

let personagens = [];

function traduzirStatus(status) {
  if (status === 'Alive') return 'Vivo';
  if (status === 'Dead') return 'Morto';
  return 'Desconhecido';
}

function classeStatus(status) {
  if (status === 'Alive') return 'alive';
  if (status === 'Dead') return 'dead';
  return 'unknown';
}

function criarCard(personagem) {
  const card = document.createElement('article');
  card.classList.add('card');

  const imagem = document.createElement('img');
  imagem.src = personagem.image;
  imagem.alt = `Imagem de ${personagem.name}`;

  const conteudo = document.createElement('div');
  conteudo.classList.add('card-conteudo');

  const nome = document.createElement('h3');
  nome.textContent = personagem.name;

  const status = document.createElement('span');
  status.classList.add('status', classeStatus(personagem.status));
  status.textContent = traduzirStatus(personagem.status);

  const especie = document.createElement('p');
  especie.innerHTML = `<strong>Espécie:</strong> ${personagem.species}`;

  const origem = document.createElement('p');
  origem.innerHTML = `<strong>Origem:</strong> ${personagem.origin.name}`;

  const localizacao = document.createElement('p');
  localizacao.innerHTML = `<strong>Localização:</strong> ${personagem.location.name}`;

  conteudo.appendChild(nome);
  conteudo.appendChild(status);
  conteudo.appendChild(especie);
  conteudo.appendChild(origem);
  conteudo.appendChild(localizacao);

  card.appendChild(imagem);
  card.appendChild(conteudo);

  return card;
}

function mostrarPersonagens(lista) {
  cardsContainer.innerHTML = '';

  if (lista.length === 0) {
    mensagem.textContent = 'Nenhum personagem encontrado.';
    return;
  }

  mensagem.textContent = `${lista.length} personagem(ns) encontrado(s).`;

  lista.forEach((personagem) => {
    const card = criarCard(personagem);
    cardsContainer.appendChild(card);
  });
}

function aplicarFiltros() {
  const texto = campoBusca.value.toLowerCase();
  const statusSelecionado = filtroStatus.value;

  const filtrados = personagens.filter((personagem) => {
    const nomeCombina = personagem.name.toLowerCase().includes(texto);
    const statusCombina = statusSelecionado === '' || personagem.status === statusSelecionado;
    return nomeCombina && statusCombina;
  });

  mostrarPersonagens(filtrados);
}

function carregarPersonagens() {
  fetch('https://rickandmortyapi.com/api/character')
    .then((resposta) => resposta.json())
    .then((dados) => {
      personagens = dados.results;
      mostrarPersonagens(personagens);
    })
    .catch((erro) => {
      console.error('Erro ao buscar personagens:', erro);
      mensagem.textContent = 'Não foi possível carregar os personagens. Tente novamente mais tarde.';
    });
}

campoBusca.addEventListener('input', aplicarFiltros);
filtroStatus.addEventListener('change', aplicarFiltros);

carregarPersonagens();
