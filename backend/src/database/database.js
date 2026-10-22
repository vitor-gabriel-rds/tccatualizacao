const Database = require('better-sqlite3');
const path = require('path');

// Caminho do banco SQLite
// O arquivo database.sqlite fica na mesma pasta deste arquivo database.js
const dbPath = path.join(__dirname, 'database.sqlite');

const db = new Database(dbPath);

// Configurações do SQLite
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// ─── Criação das Tabelas ───────────────────────────────────────────

db.exec(`
  -- Tabela de clientes/usuários
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Tabela de funcionários
  CREATE TABLE IF NOT EXISTS funcionarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    cargo TEXT NOT NULL DEFAULT 'funcionario',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Tabela de produtos/roupas
  CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    preco REAL NOT NULL,
    preco_antigo REAL,
    categoria TEXT,
    tamanhos TEXT,
    cor TEXT,
    imagem TEXT,
    estoque INTEGER DEFAULT 0,
    ativo INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Tabela de carrinhos
  CREATE TABLE IF NOT EXISTS carrinhos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
  );

  -- Tabela de itens do carrinho
  CREATE TABLE IF NOT EXISTS carrinho_itens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    carrinho_id INTEGER NOT NULL,
    produto_id INTEGER NOT NULL,
    quantidade INTEGER NOT NULL DEFAULT 1,
    preco_unitario REAL NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (carrinho_id) REFERENCES carrinhos(id) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE,
    UNIQUE(carrinho_id, produto_id)
  );
`);

module.exports = db;

const countProdutos = db.prepare('SELECT COUNT(*) as total FROM produtos').get();

if (countProdutos.total === 0) {
  console.log(' Populando banco de dados com produtos iniciais...');
  
  const insertProduto = db.prepare(`
    INSERT INTO produtos (nome, descricao, preco, preco_antigo, categoria, tamanhos, cor, imagem, estoque, ativo)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
  `);

  const produtosIniciais = [
    [
      "Conjunto Infantil Bebê Algodão",
      "Conjunto super confortável 100% algodão para o dia a dia.",
      89.90,
      119.90,
      "Conjuntos",
      JSON.stringify(["2", "4", "6", "8", "10", "12", "14"]),
      "Rosa",
      "https://via.placeholder.com/300",
      15
    ],
    [
      "Vestido Infantil Floral Nana",
      "Vestido leve e estampado perfeito para passeios e festas.",
      109.90,
      139.90,
      "Vestidos",
      JSON.stringify(["4", "6", "8", "10", "12"]),
      "Florido",
      "https://via.placeholder.com/300",
      10
    ]
  ];

  for (const prod of produtosIniciais) {
    insertProduto.run(...prod);
  }
}