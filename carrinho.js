// carrinho.js

// Array que simula nosso "banco de dados" de produtos
const produtos = [
    { id: 1, nome: 'Camiseta Básica', preco: 25.90 },
    { id: 2, nome: 'Calça Jeans', preco: 79.99 },
    { id: 3, nome: 'Tênis Esportivo', preco: 129.50 },
    { id: 4, nome: 'Moletom Canguru', preco: 59.90 },
    { id: 5, nome: 'Meias em Poliester', preco: 9.90 },
    { id: 6, nome: 'Calça em malha fria', preco: 19.90 },
    { id: 7, nome: 'Boné', preco: 49.90 },
    { id: 8, nome: 'Sapatilha', preco: 89.90 },
  ];
  
  // Array que representará o carrinho de compras do usuário
  let carrinho = [];

  function adicionarAoCarrinho(produtoId, quantidade = 1) {
    const produtoExistente = produtos.find(p => p.id === produtoId);
    if (!produtoExistente) {
      console.log('Produto não encontrado.');
      return;
    }
  
    const itemNoCarrinho = carrinho.find(item => item.id === produtoId);
    if (itemNoCarrinho) {
      itemNoCarrinho.quantidade += quantidade;
    } else {
      carrinho.push({ ...produtoExistente, quantidade });
    }
    console.log(`"${produtoExistente.nome}" adicionado ao carrinho (${quantidade} unidade(s)).`);
  }

  function removerDoCarrinho(produtoId, quantidade = 1) {
    const itemIndex = carrinho.findIndex(item => item.id === produtoId);
    if (itemIndex === -1) {
      console.log('Produto não encontrado no carrinho.');
      return;
    }
  
    if (carrinho[itemIndex].quantidade > quantidade) {
      carrinho[itemIndex].quantidade -= quantidade;
      console.log(`${quantidade} unidade(s) de "${carrinho[itemIndex].nome}" removida(s) do carrinho.`);
    } else {
      const produtoRemovido = carrinho.splice(itemIndex, 1)[0];
      console.log(`"${produtoRemovido.nome}" removido do carrinho.`);
    }
  }

  function atualizarQuantidade(produtoId, novaQuantidade) {
    // 1. Encontrar o item no carrinho pelo ID do produto
    const itemNoCarrinho = carrinho.find(item => item.id === produtoId);
  
    // 2. Verificar se o produto está no carrinho
    if (!itemNoCarrinho) {
      console.log('Produto não encontrado no carrinho.');
      return; // Sai da função se o produto não estiver no carrinho
    }
  
    // 3. Se a nova quantidade for menor ou igual a zero, remove o item
    if (novaQuantidade <= 0) {
      removerDoCarrinho(produtoId, itemNoCarrinho.quantidade); // Remove a quantidade total existente
      return;
    }
  
    // 4. Atualiza a quantidade do item
    itemNoCarrinho.quantidade = novaQuantidade;
    console.log(`Quantidade de "${itemNoCarrinho.nome}" atualizada para ${novaQuantidade}.`);
  }

  function calcularTotal() {
    let total = 0;
    // 1. Itera sobre cada item no carrinho
    for (const item of carrinho) {
      // 2. Adiciona o preço do item multiplicado pela sua quantidade ao total
      total += item.preco * item.quantidade;
    }
    // 3. Retorna o total formatado para duas casas decimais
    return total.toFixed(2);
  }

  function exibirCarrinho() {
    if (carrinho.length === 0) {
      console.log('O carrinho está vazio.');
      return;
    }
  
    console.log('\n--- Carrinho de Compras ---');
    carrinho.forEach(item => {
      console.log(`${item.nome} - Quantidade: ${item.quantidade} - Preço Unitário: R$ ${item.preco.toFixed(2)} - Total: R$ ${(item.preco * item.quantidade).toFixed(2)}`);
    });
    console.log(`\nTotal do Carrinho: R$ ${calcularTotal()}`);
    console.log('---------------------------\n');
  }

  function listarProdutos() {
    console.log('\n--- Produtos Disponíveis ---');
    // 1. Itera sobre a lista de produtos disponíveis e exibe suas informações
    produtos.forEach(produto => {
      console.log(`${produto.id}. ${produto.nome} - R$ ${produto.preco.toFixed(2)}`);
    });
    console.log('----------------------------\n');
  }

  const readline = require('readline').createInterface({
    input: process.stdin, // Fluxo de entrada padrão (o teclado)
    output: process.stdout, // Fluxo de saída padrão (o terminal)
  });

  function exibirMenu() {
    console.log('\n--- Menu ---');
    console.log('1. Listar Produtos');
    console.log('2. Adicionar ao Carrinho (ID, Quantidade - opcional)');
    console.log('3. Remover do Carrinho (ID, Quantidade - opcional)');
    console.log('4. Atualizar Quantidade (ID, Nova Quantidade)');
    console.log('5. Exibir Carrinho');
    console.log('6. Sair');
    console.log('------------\n');
  }

  function processarEntrada(opcao) {
    // 1. Divide a entrada do usuário em partes (comando e argumentos)
    const partes = opcao.trim().split(' ');
    const comando = partes[0]; // O primeiro elemento é o comando
  
    // 2. Usa uma estrutura switch para executar a ação com base no comando
    switch (comando) {
      case '1':
        listarProdutos();
        break;
      case '2':
        // Verifica se o ID do produto foi fornecido
        if (partes.length >= 2) {
          const idAdicionar = parseInt(partes[1]); // Converte o ID para um número inteiro
          const quantidadeAdicionar = partes[2] ? parseInt(partes[2]) : 1; // Obtém a quantidade, se fornecida, senão usa 1
          adicionarAoCarrinho(idAdicionar, quantidadeAdicionar);
        } else {
          console.log('Por favor, informe o ID do produto para adicionar.');
        }
        break;
      case '3':
        // Similar ao adicionar, mas para remover
        if (partes.length >= 2) {
          const idRemover = parseInt(partes[1]);
          const quantidadeRemover = partes[2] ? parseInt(partes[2]) : 1;
          removerDoCarrinho(idRemover, quantidadeRemover);
        } else {
          console.log('Por favor, informe o ID do produto para remover.');
        }
        break;
      case '4':
        // Precisa do ID e da nova quantidade
        if (partes.length === 3) {
          const idAtualizar = parseInt(partes[1]);
          const novaQuantidade = parseInt(partes[2]);
          atualizarQuantidade(idAtualizar, novaQuantidade);
        } else {
          console.log('Por favor, informe o ID do produto e a nova quantidade.');
        }
        break;
      case '5':
        exibirCarrinho();
        break;
      case '6':
        console.log('Obrigado por comprar conosco!');
        readline.close(); // Fecha a interface readline, encerrando o programa
        return true; // Sinaliza que o programa deve terminar
      default:
        console.log('Opção inválida.');
    }
    return false; // Sinaliza que o programa deve continuar
  }

  function iniciarSistema() {
    console.log('Bem-vindo ao Carrinho de Compras Shopee (Terminal)!');
    exibirMenu();
  
    // Escuta o evento 'line', que é emitido quando o usuário digita algo e pressiona Enter
    readline.on('line', (input) => {
      const sair = processarEntrada(input);
      if (!sair) {
        exibirMenu(); // Exibe o menu novamente após processar a entrada (a menos que o usuário tenha saído)
      }
    });
  
    // Escuta o evento 'close', que é emitido quando a interface readline é fechada
    readline.on('close', () => {
      console.log('Sistema encerrado.');
    });
  }
  
  // Chama a função para iniciar o sistema
  iniciarSistema();