# Cadastro e manutenção
Feature: Cadastro e manutenção de usuários
  As a usuário comum
  I want to me cadastrar, atualizar meu perfil e deletar minha conta
  So that eu possa gerenciar minha presença na plataforma

  Scenario: Cadastro de novo usuário com sucesso
    Given que o usuário está na tela de cadastro
    When informa nome, username, e-mail e senha válidos
    And clica em "Cadastrar"
    Then a conta é criada com sucesso
    And o sistema solicita a verificação do e-mail

  Scenario: Falha no cadastro por e-mail já cadastrado
    Given que já existe uma conta cadastrada com o e-mail "mario@email.com"
    When o usuário informa nome, username, e-mail "mario@email.com" e senha válidos
    And clica em "Cadastrar"
    Then o sistema exibe uma mensagem de erro informando que o e-mail já está em uso
    And a conta não é criada

  Scenario: Falha no cadastro por username já existente
    Given que já existe uma conta cadastrada com o username "marioborba"
    When o usuário informa nome, username "marioborba", e-mail e senha válidos
    And clica em "Cadastrar"
    Then o sistema exibe uma mensagem de erro informando que o username já está em uso
    And a conta não é criada

  Scenario: Atualização de perfil com sucesso
    Given que o usuário está autenticado
    And acessa a página de edição de perfil
    When altera nome público, username, bio ou foto
    And clica em "Salvar"
    Then o sistema atualiza os dados com sucesso
    And as novas informações são exibidas no perfil

  Scenario: Falha na atualização por username já existente
    Given que o usuário está autenticado
    And acessa a página de edição de perfil
    And já existe outro usuário com o username "cinefilo123"
    When tenta alterar seu username para "cinefilo123"
    And clica em "Salvar"
    Then o sistema exibe uma mensagem de erro informando que o username já está em uso
    And os dados não são atualizados

  Scenario: Exclusão lógica da própria conta
    Given que o usuário está autenticado
    And acessa a área de configurações da conta
    When clica em "Deletar conta"
    And confirma a ação
    Then a conta é desativada logicamente
    And o campo "is_active" passa a ser falso
    And o usuário não consegue mais acessar o sistema

  Scenario: Impedir login após exclusão lógica
    Given que a conta do usuário foi desativada logicamente
    When tenta fazer login com e-mail e senha válidos
    Then o sistema impede a autenticação
    And exibe uma mensagem informando que a conta está inativa

# Listas
Feature: Listas de lidos, assistidos e abandonados
  As a usuário comum
  I want to organizar itens em listas pessoais
  So that eu possa acompanhar meu consumo de conteúdo

  Scenario: Adicionar item à lista de lidos
    Given que o usuário está autenticado
    And está na página de detalhes de um item
    When clica em "Adicionar aos lidos"
    Then o item é incluído na lista de lidos do usuário

  Scenario: Adicionar item à lista de assistidos
    Given que o usuário está autenticado
    And está na página de detalhes de um item
    When clica em "Adicionar aos assistidos"
    Then o item é incluído na lista de assistidos do usuário

  Scenario: Adicionar item à lista de abandonados
    Given que o usuário está autenticado
    And está na página de detalhes de um item
    When clica em "Adicionar aos abandonados"
    Then o item é incluído na lista de abandonados do usuário

  Scenario: Mover item entre listas
    Given que o usuário está autenticado
    And possui um item na lista de assistidos
    When altera o status do item para "abandonados"
    Then o item é removido da lista de assistidos
    And o item passa a constar na lista de abandonados

  Scenario: Visualizar listas no perfil
    Given que o usuário está autenticado
    And possui itens cadastrados em suas listas
    When acessa a área de listas do perfil
    Then o sistema exibe as listas de lidos, assistidos e abandonados
    And mostra os itens associados a cada categoria

# Amigos e seguidores
Feature: Amigos e seguidores
  As a usuário comum
  I want to seguir usuários e criar conexões sociais
  So that eu possa acompanhar perfis e interações na plataforma

  Scenario: Seguir outro usuário com sucesso
    Given que o usuário está autenticado
    And acessa o perfil de outro usuário
    When clica em "Seguir"
    Then o sistema registra o seguimento com sucesso
    And o outro perfil passa a aparecer na lista de seguidos

  Scenario: Deixar de seguir um usuário
    Given que o usuário está autenticado
    And já segue outro perfil
    When clica em "Deixar de seguir"
    Then o sistema remove a relação de seguimento
    And o perfil deixa de aparecer na lista de seguidos

  Scenario: Enviar solicitação de amizade
    Given que o usuário está autenticado
    And acessa o perfil de outro usuário
    When clica em "Adicionar amigo"
    Then o sistema envia uma solicitação de amizade

  Scenario: Aceitar solicitação de amizade
    Given que o usuário está autenticado
    And possui uma solicitação de amizade pendente
    When clica em "Aceitar"
    Then o sistema cria a relação de amizade entre os usuários

  Scenario: Tornar perfil privado
    Given que o usuário está autenticado
    And acessa as configurações de privacidade
    When ativa a opção "Perfil privado"
    Then o sistema atualiza a visibilidade do perfil
    And apenas conexões permitidas podem visualizar as informações restritas

  Scenario: Bloquear outro usuário
    Given que o usuário está autenticado
    And acessa o perfil de outro usuário
    When clica em "Bloquear usuário"
    Then o sistema impede novas interações entre os dois perfis

# Histórico de reviews e posts
Feature: Histórico de reviews e posts
  As a usuário comum
  I want to visualizar meu histórico de reviews e posts
  So that eu possa acompanhar minhas publicações na plataforma

  Scenario: Visualizar histórico de reviews
    Given que o usuário está autenticado
    And possui reviews cadastrados no sistema
    When acessa a área de histórico de reviews
    Then o sistema exibe a lista de reviews do usuário

  Scenario: Visualizar histórico de posts
    Given que o usuário está autenticado
    And possui posts cadastrados no sistema
    When acessa a área de histórico de posts
    Then o sistema exibe a lista de posts do usuário

  Scenario: Visualizar histórico com dados fixos
    Given que existem dados fixos cadastrados para demonstração
    When o usuário acessa a tela de histórico
    Then o sistema exibe os reviews e posts de exemplo

  Scenario: Manter conteúdo após exclusão lógica da conta
    Given que o usuário publicou reviews e posts
    And a conta foi desativada logicamente
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
    And possui uma conta cadastrada com o e-mail "mario@email.com"
    When clica em "Esqueci minha senha"
    And informa o e-mail "mario@email.com"
    Then o sistema envia um link de recuperação para o e-mail informado

  Scenario: Falha ao solicitar recuperação com e-mail inexistente
    Given que o usuário está na tela de login
    When clica em "Esqueci minha senha"
    And informa um e-mail não cadastrado
    Then o sistema exibe uma mensagem de erro informando que a conta não foi encontrada

  Scenario: Redefinir senha com link válido
    Given que o usuário recebeu um link de recuperação válido
    And acessa a página de redefinição de senha
    When informa uma nova senha válida
    And confirma a alteração
    Then o sistema atualiza a senha com sucesso
    And o usuário pode fazer login com a nova senha

  Scenario: Falha ao redefinir senha com link expirado
    Given que o usuário recebeu um link de recuperação
    And o prazo de expiração do link foi ultrapassado
    When acessa o link de redefinição
    Then o sistema informa que o link expirou
    And solicita uma nova recuperação de senha