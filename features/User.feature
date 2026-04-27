# Cadastro e manutenção
Feature: Cadastro e manutenção de usuários
  As a usuário comum
  I want to me cadastrar, atualizar meu perfil e deletar minha conta
  So that eu possa gerenciar minha presença na plataforma

  Scenario: Cadastro de novo usuário com sucesso
    Given que o usuário está na tela de cadastro
    When informa nome "Mário Borba", username "marioborba", e-mail "mario@email.com" e senha "123456" válidos
    And clica em "Cadastrar"
    Then a conta é criada com sucesso
    And o sistema solicita a verificação do e-mail

  Scenario: Falha no cadastro por e-mail já cadastrado
    Given que já existe uma conta cadastrada com nome "Pedro Borba", username "pedroborba", e-mail "borba@email.com" e senha "SenhaSegura123"
    And que o usuário está na tela de cadastro
    When informa nome "Mário Borba", username "marioborba", e-mail "borba@email.com" e senha "123456"
    And clica em "Cadastrar"
    Then o sistema exibe uma mensagem de erro informando que o e-mail já está em uso
    And a conta não é criada

  Scenario: Falha no cadastro por username já existente
    Given que já existe uma conta cadastrada com nome "Alice Borba", username "marioborba", e-mail "alice@email.com" e senha "SenhaSegura456"
    And que o usuário está na tela de cadastro
    When informa nome "Mário Borba", username "marioborba", e-mail "borba@email.com" e senha "123456"
    And clica em "Cadastrar"
    Then o sistema exibe uma mensagem de erro informando que o username já está em uso
    And a conta não é criada

  Scenario: Atualização de perfil com sucesso
    Given que existe um usuário cadastrado com nome "Mário Borba", username "marioborba", e-mail "mario@email.com" e senha "123456"
    And que o usuário está autenticado
    And acessa a página de edição de perfil
    When altera nome para "Mário Borba Lima", username para "marioborbalima", bio para "Estudante e desenvolvedor" e foto para "foto-perfil.jpg"
    And clica em "Salvar"
    Then o sistema atualiza os dados com sucesso
    And o perfil passa a exibir nome "Mário Borba Lima", username "marioborbalima" e bio "Estudante e desenvolvedor"

  Scenario: Falha na atualização por username já existente
    Given que existe um usuário cadastrado com nome "Mário Borba", username "marioborba", e-mail "mario@email.com" e senha "123456"
    And que existe outro usuário cadastrado com nome "Carlos Silva", username "cinefilo123", e-mail "carlos@email.com" e senha "NovaSenha2234"
    And que o usuário está autenticado
    And acessa a página de edição de perfil
    When tenta alterar o username para "cinefilo123"
    And clica em "Salvar"
    Then o sistema exibe uma mensagem de erro informando que o username já está em uso
    And os dados não são atualizados

  Scenario: Exclusão lógica da própria conta
    Given que existe um usuário cadastrado com nome "Mário Borba", username "marioborba", e-mail "mario@email.com" e senha "123456"
    And que o usuário está autenticado
    And acessa a área de configurações da conta
    When clica em "Deletar conta"
    And confirma a ação
    Then a conta é desativada logicamente
    And o campo "is_active" passa a ser falso
    And o usuário não consegue mais acessar o sistema

  Scenario: Impedir login após exclusão lógica
    Given que existe uma conta com nome "Mário Borba", username "marioborba", e-mail "mario@email.com", senha "123456" e status inativo
    When o usuário informa e-mail "mario@email.com" e senha "123456"
    And clica em "Entrar"
    Then o sistema impede a autenticação
    And exibe uma mensagem informando que a conta está inativa

# Listas
Feature: Listas de lidos, assistidos e abandonados
  As a usuário comum
  I want to organizar itens em listas pessoais
  So that eu possa acompanhar meu consumo de conteúdo

  Scenario: Adicionar item à lista de lidos
    Given que existe um usuário cadastrado com username "marioborba" e e-mail "mario@email.com"
    And que o usuário está autenticado
    And está na página do item "Dom Casmurro"
    When clica em "Adicionar aos lidos"
    Then o item "Dom Casmurro" é incluído na lista de lidos do usuário

  Scenario: Adicionar item à lista de assistidos
    Given que existe um usuário cadastrado com username "marioborba" e e-mail "mario@email.com"
    And que o usuário está autenticado
    And está na página do item "Interestelar"
    When clica em "Adicionar aos assistidos"
    Then o item "Interestelar" é incluído na lista de assistidos do usuário

  Scenario: Adicionar item à lista de abandonados
    Given que existe um usuário cadastrado com username "marioborba" e e-mail "mario@email.com"
    And que o usuário está autenticado
    And está na página do item "The Walking Dead"
    When clica em "Adicionar aos abandonados"
    Then o item "The Walking Dead" é incluído na lista de abandonados do usuário

  Scenario: Mover item entre listas
    Given que existe um usuário cadastrado com username "marioborba" e e-mail "mario@email.com"
    And que o usuário está autenticado
    And o item "Interestelar" está na lista de assistidos
    When altera o status do item "Interestelar" para "abandonados"
    Then o item "Interestelar" é removido da lista de assistidos
    And o item "Interestelar" passa a constar na lista de abandonados

  Scenario: Visualizar listas no perfil
    Given que existe um usuário cadastrado com username "marioborba" e e-mail "mario@email.com"
    And que o usuário possui os itens "Dom Casmurro", "Interestelar" e "The Walking Dead" cadastrados em suas listas
    When acessa a área de listas do perfil
    Then o sistema exibe as listas de lidos, assistidos e abandonados
    And mostra os itens associados a cada categoria

# Amigos e seguidores
Feature: Amigos e seguidores
  As a usuário comum
  I want to seguir usuários e criar conexões sociais
  So that eu possa acompanhar perfis e interações na plataforma

  Scenario: Seguir outro usuário com sucesso
    Given que existe um usuário autenticado com username "marioborba" e e-mail "mario@email.com"
    And existe outro usuário com nome "Ana Souza", username "anasouza" e e-mail "ana@email.com"
    When acessa o perfil de "anasouza"
    And clica em "Seguir"
    Then o sistema registra o seguimento com sucesso
    And o perfil "anasouza" passa a aparecer na lista de seguidos

  Scenario: Deixar de seguir um usuário
    Given que existe um usuário autenticado com username "marioborba" e e-mail "mario@email.com"
    And o usuário já segue o perfil "anasouza"
    When acessa o perfil de "anasouza"
    And clica em "Deixar de seguir"
    Then o sistema remove a relação de seguimento
    And o perfil "anasouza" deixa de aparecer na lista de seguidos

  Scenario: Enviar solicitação de amizade
    Given que existe um usuário autenticado com username "marioborba" e e-mail "mario@email.com"
    And existe outro usuário com nome "Carlos Lima", username "carloslima" e e-mail "carlos@email.com"
    When acessa o perfil de "carloslima"
    And clica em "Adicionar amigo"
    Then o sistema envia uma solicitação de amizade

  Scenario: Aceitar solicitação de amizade
    Given que existe um usuário autenticado com username "marioborba" e e-mail "mario@email.com"
    And existe uma solicitação de amizade pendente enviada por "carloslima"
    When clica em "Aceitar"
    Then o sistema cria a relação de amizade entre "marioborba" e "carloslima"

  Scenario: Tornar perfil privado
    Given que existe um usuário autenticado com username "marioborba" e e-mail "mario@email.com"
    And acessa as configurações de privacidade
    When ativa a opção "Perfil privado"
    Then o sistema atualiza a visibilidade do perfil
    And apenas conexões permitidas podem visualizar as informações restritas

  Scenario: Bloquear outro usuário
    Given que existe um usuário autenticado com username "marioborba" e e-mail "mario@email.com"
    And existe outro usuário com nome "João Pedro", username "joaopedro" e e-mail "joao@email.com"
    When acessa o perfil de "joaopedro"
    And clica em "Bloquear usuário"
    Then o sistema impede novas interações entre os dois perfis

# Histórico de reviews e posts
Feature: Histórico de reviews e posts
  As a usuário comum
  I want to visualizar meu histórico de reviews e posts
  So that eu possa acompanhar minhas publicações na plataforma

  Scenario: Visualizar histórico de reviews
    Given que existe um usuário autenticado com username "marioborba" e e-mail "mario@email.com"
    And o usuário possui os reviews "Review de Dom Casmurro" e "Review de Interestelar" cadastrados no sistema
    When acessa a área de histórico de reviews
    Then o sistema exibe a lista de reviews do usuário

  Scenario: Visualizar histórico de posts
    Given que existe um usuário autenticado com username "marioborba" e e-mail "mario@email.com"
    And o usuário possui os posts "Melhores filmes de ficção" e "Livros que quero reler" cadastrados no sistema
    When acessa a área de histórico de posts
    Then o sistema exibe a lista de posts do usuário

  Scenario: Visualizar histórico com dados fixos
    Given que existem dados fixos cadastrados para demonstração com os reviews "Review de Dom Casmurro" e "Review de Interestelar"
    And existem dados fixos cadastrados para demonstração com os posts "Melhores filmes de ficção" e "Livros que quero reler"
    When o usuário acessa a tela de histórico
    Then o sistema exibe os reviews e posts de exemplo

  Scenario: Manter conteúdo após exclusão lógica da conta
    Given que existe um usuário com username "marioborba", e-mail "mario@email.com" e status inativo
    And o usuário publicou os reviews "Review de Dom Casmurro" e "Review de Interestelar"
    And o usuário publicou os posts "Melhores filmes de ficção" e "Livros que quero reler"
    When outro usuário acessa o conteúdo publicado
    Then os reviews e posts continuam visíveis
    And o perfil do autor não fica mais disponível
# Recuperação de conta
Feature: Recuperação de conta via e-mail
  As a usuário comum
  I want to recuperar minha conta por e-mail
  So that eu possa redefinir minha senha quando esquecer o acesso

  Scenario: Solicitar recuperação de senha com sucesso
    Given que o usuário está na tela de login
    And existe uma conta cadastrada com nome "Mário Borba", username "marioborba", e-mail "mario@email.com" e senha "123456"
    When clica em "Esqueci minha senha"
    And informa o e-mail "mario@email.com"
    Then o sistema envia um link de recuperação para o e-mail informado

  Scenario: Falha ao solicitar recuperação com e-mail inexistente
    Given que o usuário está na tela de login
    When clica em "Esqueci minha senha"
    And informa o e-mail "naoexiste@email.com"
    Then o sistema exibe uma mensagem de erro informando que a conta não foi encontrada

  Scenario: Redefinir senha com link válido
    Given que existe uma conta cadastrada com e-mail "mario@email.com" e senha "123456"
    And que o usuário recebeu um link de recuperação válido para o e-mail "mario@email.com"
    And acessa a página de redefinição de senha
    When informa a nova senha "NovaSenha123"
    And confirma a alteração
    Then o sistema atualiza a senha com sucesso
    And o usuário pode fazer login com e-mail "mario@email.com" e senha "NovaSenha123"

  Scenario: Falha ao redefinir senha com link expirado
    Given que existe uma conta cadastrada com e-mail "mario@email.com" e senha "123456"
    And que o usuário recebeu um link de recuperação para o e-mail "mario@email.com"
    And o prazo de expiração do link foi ultrapassado
    When acessa o link de redefinição
    Then o sistema informa que o link expirou
    And solicita uma nova recuperação de senha