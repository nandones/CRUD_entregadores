# CRUD_entregadores
> Avaliação da disciplina de Tópicos Especiais em Programação, sétima fase do curso de Ciência da Computação. A prova consiste em criar um projeto em react native integrando-o ao Google Firebase,
> permitindo o cadastro de entregadores e entregas, onde cada entrega é vinculada a um entregador, garantindo a consistência dos dados e impedir a exclusão de um entregador resulte em entregas "órfãs", exigendo
> programação manual da função ON DELETE CASCADE

# Sobre a Aplicação

## Lógica da Aplicação

Ao abrir o aplicativo, o usuário irá se deparar com um botão ``novo entregador`` e com a lista de entregadores cadastrados, caso haja entregadores cadastrados, onde cada qual possui seus dados dispostos (clique no corpo do texto para editar as informações do entregador), junto a um botão ``entregas`` e um botão ``excluir``. Caso deseje configurar uma entrega, clique no botão ``entregas`` de um entregador e no botão ``nova entrega``. Dentre os dados da entrega, há um combobox que atribui um entregador para a entrega, que vem com o entregador clicado anteriormente como padrão de primeira opção. Caso deseje alterar o 
entregador, após cadastrar a tarefa, a qual não será exibida neste momento, pois estará na lista de tarefas do outro entregador. Para acessá-la, deve-se acessar o outro entregador, clicar em ``entregas`` e aí sim
será visualizada.

---
## Pré-requisitos e como Rodar a Aplicação

É necessário possuir **Node.js** e **Expo CLI** instalado em seu desktop, e um dispositivo móvel com **Expo Go**.

- Verifique a presença do Node.js:
  ```bash
  node --version   # Deve retornar v18.x ou superior
  npm --version    # Deve retornar v9.x ou superior
  ```
  Caso esteja ausente, instale a partir de: [https://nodejs.org/pt](https://nodejs.org/pt)

- Verifique a presença do Expo CLI:
  ```bash
  expo --version   # Deve retornar a versão instalada (ex: 7.x)
  ```
  Caso esteja ausente, execute no terminal:
  ```bash
  npm install -g expo-cli
  ```

- Caso possua problemas com o Expo GO, recomendo o seguinte tutorial:  
  [https://youtu.be/xKGESzemfdw?si=FYsF8Y7M9ywaVL4g](https://youtu.be/xKGESzemfdw?si=FYsF8Y7M9ywaVL4g)

## Clonando e Rodando o Projeto

1. Clone o repositório.
2. Com o repositório aberto na IDE de sua preferência, execute:
   ```bash
   cd CRUD_entregadores
   npm install
   ```
3. Inicie a aplicação:
   ```bash
   npm start
   ```

4. Você pode agora escanear o QR code que aparecerá no terminal com seu dispositivo móvel para abrir a aplicação, ou pressionar **"a"** para abrir o emulador Android (caso tenha seguido o tutorial mencionado), ou "w" para abrir no navegador.

---


