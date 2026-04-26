// =============================================
// Lista de produtos da loja
// Cada produto tem: id, nome, categoria, emoji,
// preço, descrição, badge (etiqueta) e cor de fundo
// =============================================
const produtos = [
  { id: 1,  nome: 'Colar Sereia',       cat: 'colares',   imagem: 'SEREIA.png', preco: 65,  desc: 'Colar delicado com conchinhas brancas e fio dourado. Peça única.',       badge: 'Novo',      corBadge: 'var(--coral)', fundo: 'linear-gradient(135deg,#E8D5B5,#C49A5A44)' },
  { id: 2,  nome: 'Pulseira Praia',     cat: 'pulseiras', imagem: 'PULSEIRA.png', preco: 35,  desc: 'Pulseira delicada com mini conchas e miçangas coloridas.',                badge: 'Popular',   corBadge: 'var(--teal)',  fundo: 'linear-gradient(135deg,#F5D4E8,#7A2A5A33)' },
  { id: 3,  nome: 'Brincos Concha',     cat: 'brincos',   imagem: 'BRINCOS.png', preco: 28,  desc: 'Brincos leves com conchas pequenas em tom natural. Versáteis.',           badge: '',          corBadge: '',             fundo: 'linear-gradient(135deg,#F5E6D3,#D4705A33)' },
  { id: 4,  nome: 'Conjunto Praiano',   cat: 'conjuntos', imagem: 'JOIA.png', preco: 80,  desc: 'Kit com colar, brincos e pulseira combinados. Presenteie com estilo.',   badge: '',          corBadge: '',             fundo: 'linear-gradient(135deg,#E8D4F5,#5A2A7A33)' },
  { id: 5, nome: 'Corrente de Cabeça', cat: 'tiaras',    imagem: 'CONCHA.png', preco: 45,  desc: 'Tiara artesanal com conchas coloridas, perfeita para o verão.',          badge: 'Popular',   corBadge: 'var(--teal)',  fundo: 'linear-gradient(135deg,#D4E8D4,#2A7A2A33)' },
];

// Guarda qual filtro está ativo no momento (começa mostrando todos)
let filtroAtivo = 'todos';


// =============================================
// Exibe os produtos na grade da página
// Recebe o nome de uma categoria como filtro.
// Se for 'todos', mostra tudo.
// =============================================
function exibirProdutos(filtro) {
  const grade = document.getElementById('productsGrid');

  // Filtra a lista: se for 'todos', usa tudo; senão filtra por categoria
  let lista = filtro === 'todos'
    ? produtos
    : produtos.filter(function(p) { return p.cat === filtro; });

  // Monta o HTML de cada card e coloca na grade
  let html = '';
  for (let i = 0; i < lista.length; i++) {
    let p = lista[i];

    // Monta o badge (etiqueta) só se o produto tiver um
    let badgeHtml = '';
    if (p.badge) {
      badgeHtml = '<span class="card-badge" style="background:' + p.corBadge + '">' + p.badge + '</span>';
    }

    html += `
      <div class="product-card" style="animation:fadeUp .5s ease both">
        <div class="card-img" style="background:${p.fundo}">
          <div class="card-img-inner"><img src="${p.imagem}" alt="${p.nome}"></div>
          ${badgeHtml}
        </div>
        <div class="card-body">
          <div class="card-name">${p.nome}</div>
          <p class="card-desc">${p.desc}</p>
          <div class="card-footer">
            <div class="card-price">R$ ${p.preco}<small>,00</small></div>
            <button class="btn-buy" onclick="abrirWhatsApp('${p.nome} - R$ ${p.preco},00')">
              🛒 Comprar
            </button>
          </div>
        </div>
      </div>
    `;
  }

  grade.innerHTML = html;
}


// =============================================
// Troca o filtro de categoria ao clicar nas abas
// =============================================
function filtrarProdutos(botao, categoria) {
  // Remove a classe 'active' de todos os botões de filtro
  let botoes = document.querySelectorAll('.filter-tab');
  for (let i = 0; i < botoes.length; i++) {
    botoes[i].classList.remove('active');
  }

  // Ativa o botão clicado
  botao.classList.add('active');

  // Atualiza o filtro e reexibe os produtos
  filtroAtivo = categoria;
  exibirProdutos(categoria);
}


// =============================================
// Navega entre as páginas do site (home, produtos, sobre, contato)
// =============================================
function showPage(pagina) {
  // Esconde todas as páginas
  let paginas = document.querySelectorAll('.page');
  for (let i = 0; i < paginas.length; i++) {
    paginas[i].classList.remove('active');
  }

  // Mostra só a página selecionada
  document.getElementById('page-' + pagina).classList.add('active');

  // Atualiza o link ativo no menu de navegação
  let links = document.querySelectorAll('.nav-links a[data-page]');
  for (let i = 0; i < links.length; i++) {
    if (links[i].dataset.page === pagina) {
      links[i].classList.add('active');
    } else {
      links[i].classList.remove('active');
    }
  }

  // Se for a página de produtos, renderiza os cards
  if (pagina === 'produtos') {
    exibirProdutos(filtroAtivo);
  }

  // Sobe pro topo da página
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Ativa as animações fade-in da página após um breve delay
  setTimeout(function() {
    let elementos = document.querySelectorAll('#page-' + pagina + ' .fade-in');
    for (let i = 0; i < elementos.length; i++) {
      elementos[i].classList.add('visible');
    }
  }, 300);

  return false;
}


// =============================================
// Abre o WhatsApp com uma mensagem já preenchida
// =============================================
function abrirWhatsApp(produto) {
  let mensagem = 'Olá Maike! 🐚 Tenho interesse em: ' + produto + '. Poderia me dar mais informações?';
  let url = 'https://wa.me/5547999799910?text=' + encodeURIComponent(mensagem);
  window.open(url, '_blank');
}

// Mantém o nome antigo funcionando (usada nos cards da home)
function openWhatsApp(produto) {
  abrirWhatsApp(produto);
}


// =============================================
// Envia o formulário de contato via WhatsApp
// =============================================
function submitForm() {
  let nome      = document.getElementById('cName').value.trim();
  let telefone  = document.getElementById('cPhone').value.trim();
  let email     = document.getElementById('cEmail').value.trim();
  let interesse = document.getElementById('cInterest').value;
  let mensagem  = document.getElementById('cMessage').value.trim();

  // Valida se os campos obrigatórios estão preenchidos
  if (!nome || !mensagem) {
    mostrarToast('⚠️ Preencha nome e mensagem!');
    return;
  }

  // Monta o texto completo da mensagem
  let texto = 'Olá Maike! \n\nMeu nome é ' + nome;
  if (telefone) texto += ' (' + telefone + ')';
  if (email)    texto += ' | ' + email;
  if (interesse) texto += '\nInteresse: ' + interesse;
  texto += '\n\n' + mensagem;

  // Abre o WhatsApp com a mensagem
  window.open('https://wa.me/5547999799910?text=' + encodeURIComponent(texto), '_blank');
  mostrarToast('✅ Redirecionando para o WhatsApp!');

  // Limpa o formulário
  document.getElementById('cName').value    = '';
  document.getElementById('cPhone').value   = '';
  document.getElementById('cEmail').value   = '';
  document.getElementById('cMessage').value = '';
  document.getElementById('cInterest').selectedIndex = 0;
}


// =============================================
// Exibe uma mensagem temporária na tela (toast)
// =============================================
function mostrarToast(texto) {
  let toast = document.getElementById('toast');
  toast.textContent = texto;
  toast.classList.add('show');

  // Remove depois de 3,5 segundos
  setTimeout(function() {
    toast.classList.remove('show');
  }, 3500);
}

// Compatibilidade com o nome antigo usado no HTML
function showToast(texto) {
  mostrarToast(texto);
}


// =============================================
// Menu hamburguer (mobile)
// =============================================
let botaoMenu = document.getElementById('hamburger');
let menuMobile = document.getElementById('mobileMenu');

botaoMenu.addEventListener('click', function() {
  botaoMenu.classList.toggle('open');
  menuMobile.classList.toggle('open');
});

function closeMenu() {
  botaoMenu.classList.remove('open');
  menuMobile.classList.remove('open');
}


// =============================================
// Animação fade-in ao rolar a página
// Usa IntersectionObserver para detectar quando
// um elemento entra na área visível da tela
// =============================================
let observer = new IntersectionObserver(function(entries) {
  for (let i = 0; i < entries.length; i++) {
    if (entries[i].isIntersecting) {
      entries[i].target.classList.add('visible');
    }
  }
}, { threshold: 0.1 });

// Observa todos os elementos com a classe fade-in
let elementosFadeIn = document.querySelectorAll('.fade-in');
for (let i = 0; i < elementosFadeIn.length; i++) {
  observer.observe(elementosFadeIn[i]);
}


// =============================================
// Carrega os produtos ao abrir o site
// =============================================
exibirProdutos('todos');
