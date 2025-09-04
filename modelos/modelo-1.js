// ===== CATÁLOGO =====
const produtos = [
  { id: 1, nome: "Camisa Pokémon", preco: 79.90, imagem: "images-2/Camisa-Pokemon.webp" },
  { id: 2, nome: "Caneca Gamer", preco: 39.90, imagem: "images-2/Caneca-Gamer.webp" },
  { id: 3, nome: "Mouse RGB", preco: 129.90, imagem: "images-2/Mouse-RGB.webp" },
  { id: 4, nome: "Headset Pro", preco: 199.90, imagem: "images-2/Headset-Pro.webp" }
];

// ===== CARRINHO =====
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function atualizarCarrinho() {
  const cartButton = document.querySelector(".cart");
  if (cartButton) {
    const totalUnidades = carrinho.reduce((acc, item) => acc + (item.quantidade || 1), 0);
    cartButton.textContent = `🛒 (${totalUnidades})`;
  }
}

function adicionarAoCarrinho(id) {
  let item = carrinho.find(p => p.id === id);
  if (item) {
    item.quantidade++;
  } else {
    carrinho.push({ id: id, quantidade: 1 });
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarCarrinho();
  exibirMensagem("✅ Produto adicionado ao carrinho!", "sucesso");
}

function exibirMensagem(texto, tipo = "sucesso") {
  const msg = document.getElementById("mensagem-produto");
  if (!msg) return;

  msg.textContent = texto;
  msg.className = "mensagem-oculta";

  if (tipo === "sucesso") msg.classList.add("mensagem-sucesso");
  if (tipo === "erro") msg.classList.add("mensagem-erro");
  if (tipo === "info") msg.classList.add("mensagem-info");

  setTimeout(() => {
    msg.className = "mensagem-oculta";
  }, 2000);
}

// ===== CARRINHO PÁGINA =====
function carregarCarrinho() {
  const container = document.getElementById("lista-carrinho");
  const totalEl = document.getElementById("total-carrinho");
  if (!container || !totalEl) return;

  container.innerHTML = "";
  let total = 0;

  if (carrinho.length === 0) {
    container.innerHTML = "<p>Seu carrinho está vazio.</p>";
    totalEl.textContent = "R$ 0,00";
    return;
  }

  carrinho.forEach(item => {
    const produto = produtos.find(p => p.id === item.id);
    if (!produto) return;

    const qtd = item.quantidade || 1;

    const div = document.createElement("div");
    div.classList.add("item-carrinho");
    div.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}" width="50">
      <span>${produto.nome}</span>
      <span>R$ ${produto.preco.toFixed(2)}</span>
      <div class="quantidade">
        <button onclick="alterarQuantidade(${item.id}, -1)">➖</button>
        <span>${qtd}</span>
        <button onclick="alterarQuantidade(${item.id}, 1)">➕</button>
      </div>
      <span>Subtotal: R$ ${(produto.preco * qtd).toFixed(2)}</span>
      <button onclick="removerItem(${item.id})">❌</button>
    `;
    container.appendChild(div);

    total += produto.preco * qtd;
  });

  totalEl.textContent = `R$ ${total.toFixed(2)}`;
}

function alterarQuantidade(id, delta) {
  const item = carrinho.find(p => p.id === id);
  if (!item) return;

  item.quantidade += delta;
  if (item.quantidade <= 0) {
    carrinho = carrinho.filter(p => p.id !== id);
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  carregarCarrinho();
  atualizarCarrinho();
}

function removerItem(id) {
  carrinho = carrinho.filter(p => p.id !== id);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  carregarCarrinho();
  atualizarCarrinho();
}

function finalizarCompra(event) {
  event.preventDefault();
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  const msg = document.getElementById("mensagem");
  if (msg) {
    msg.textContent = "✅ Pedido realizado com sucesso!";
    msg.classList.remove("mensagem-oculta");
    msg.classList.add("mensagem-visivel");
  }

  // Salva pedido final antes de limpar
  localStorage.setItem("pedido-final", JSON.stringify(carrinho));

  // Limpa carrinho
  carrinho = [];
  localStorage.removeItem("carrinho");

  // Redireciona
  setTimeout(() => window.location.href = "pedido-confirmado.html", 1500);
}

// ===== INICIALIZAÇÃO =====
document.addEventListener("DOMContentLoaded", () => {
  atualizarCarrinho();

  if (window.location.pathname.includes("carrinho.html")) {
    carregarCarrinho();
  }
});
