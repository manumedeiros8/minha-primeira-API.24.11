const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let produtos = [
  {
    id: 1,
    nome: 'Notebook',
    preco: 3500.00,
    estoque: 10,
    categoria: 'Informatica'
  },
  {
    id: 2,
    nome: 'Mouse Gamer',
    preco: 150.00,
    estoque: 50,
    categoria: 'Informatica'
  },
  {
    id: 3,
    nome: 'Teclado Mecânico',
    preco: 450.00,
    estoque: 30,
    categoria: 'Informatica'
  }
];

let proximoId = 4;

// GET /produtos — Retorna TODOS os produtos
app.get('/produtos', (req, res) => {
  res.status(200).json(produtos);
});

// GET /produtos/:id — Retorna UM produto pelo ID
app.get('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const produto = produtos.find(p => p.id === id);

  if (produto) {
    res.status(200).json(produto);
  } else {
    res.status(404).json({
      mensagem: `Produto ${id} não encontrado`
    });
  }
});

// POST /produtos — Cria um novo produto
app.post('/produtos', (req, res) => {
  const { nome, preco, estoque, categoria } = req.body;

  if (!nome || !preco || estoque === undefined || !categoria) {
    return res.status(400).json({
      mensagem: 'Campos obrigatórios: nome, preco, estoque, categoria'
    });
  }

  if (parseFloat(preco) <= 0) {
    return res.status(400).json({
      mensagem: 'Preço deve ser maior que zero'
    });
  }

  const novoProduto = {
    id: proximoId++,
    nome,
    preco: parseFloat(preco),
    estoque: parseInt(estoque),
    categoria
  };

  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
});

// PUT /produtos/:id — Atualiza TODOS os dados de um produto
app.put('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, preco, estoque, categoria } = req.body;

  if (!nome || !preco || estoque === undefined || !categoria) {
    return res.status(400).json({
      mensagem: 'Todos os campos são obrigatórios'
    });
  }

  const index = produtos.findIndex(p => p.id === id);

  if (index !== -1) {
    produtos[index] = {
      id,
      nome,
      preco: parseFloat(preco),
      estoque: parseInt(estoque),
      categoria
    };
    res.status(200).json(produtos[index]);
  } else {
    res.status(404).json({
      mensagem: `Produto ${id} não encontrado`
    });
  }
});

// DELETE /produtos/:id — Remove um produto
app.delete('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = produtos.findIndex(p => p.id === id);

  if (index !== -1) {
    produtos.splice(index, 1);
    res.status(200).json({
      mensagem: `Produto ${id} removido com sucesso`
    });
  } else {
    res.status(404).json({
      mensagem: `Produto ${id} não encontrado`
    });
  }
});

// INICIAR O SERVIDOR
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📋 Acesse http://localhost:${PORT}/produtos`);
});