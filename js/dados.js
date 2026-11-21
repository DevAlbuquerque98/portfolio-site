/* ==========================================================================
   DADOS DO PORTFÓLIO
   --------------------------------------------------------------------------
   Este é o único arquivo que você precisa editar para:
   • adicionar ou alterar PROJETOS (carrossel + página do projeto)
   • atualizar a STACK
   • preencher FORMAÇÃO, NÚMEROS e DEPOIMENTOS

   Regra simples: se uma lista estiver vazia [], a seção some do site.
   Quando você colocar itens nela, a seção aparece sozinha.

   Dica: para ver como ficam as seções vazias com textos de exemplo,
   abra o site com ?exemplos no final do endereço (ex.: index.html?exemplos).
   ========================================================================== */

window.PORTFOLIO = {

  /* Link do WhatsApp usado em todos os botões "Fale comigo" */
  whatsapp: {
    numero: '5561998693512',
    mensagem: 'Olá, Matheus! Vi seu portfólio e quero conversar sobre uma solução para a minha empresa.'
  },

  /* Tempo (em segundos) que cada projeto fica na tela antes de passar sozinho */
  tempoCarrossel: 8,

  /* ------------------------------------------------------------------------
     PROJETOS
     Cada projeto vira um slide do carrossel e aparece na lista lateral.
     ORDEM: o mais recente fica em cima. Para adicionar um novo, copie o
     MODELO no fim da lista e cole no TOPO, logo depois de "projetos: [".
     ------------------------------------------------------------------------ */
  projetos: [
    {
      id: 'scm',
      segmento: 'Engenharia e Telecomunicação · Gestão de Processos',
      selo: 'SCM Engenharia de Telecomunicações',
      seloIcone: 'building-2',
      titulo: 'SCM Engenharia de Telecomunicações · Gestão Integrada',
      tituloCurto: 'Gestão Integrada SCM',
      resumo:
        'Reestruturação completa de uma empresa que operava em arquivos soltos e no Trello. CRM com funil de vendas medido fase a fase, processos mapeados, base única de dados no SharePoint e OneDrive, integrada ao Teams e ao Outlook, e indicadores de todos os setores no Power BI.',

      destaques: [
        { valor: '47', rotulo: 'processos mapeados na Cadeia de Valor' },
        { valor: '25', rotulo: 'indicadores com fórmula e meta' },
        { valor: 'Fase a fase', rotulo: 'funil de vendas medido do lead à assinatura' }
      ],

      visaoGeral:
        'A SCM atende provedores de internet com engenharia, regulamentação, ASN e blocos de IP, jurídico e projetos com concessionárias de energia. A empresa cresceu, mas a gestão não acompanhou. O projeto transformou a operação em uma gestão integrada, pensada para o que importa ao empresário: vender, receber e decidir com dados confiáveis.',
      desafio:
        'As informações ficavam espalhadas em pastas, planilhas e quadros do Trello, cada setor do seu jeito. Para saber a situação de um cliente, contrato ou cobrança, era preciso perguntar a várias pessoas. Sem processos desenhados, o conhecimento ficava com quem executava. Sem indicadores, não havia como medir o desempenho de cada área.',
      solucao: [
        { icone: 'filter', texto: 'CRM e funil de vendas: do lead à assinatura em um único fluxo, com a taxa de avanço medida em cada fase, ciclo de vendas com meta de 8 dias, conversão e renovação de contratos.' },
        { icone: 'hand-coins', texto: 'Comercial integrado ao Financeiro: contrato fechado segue direto para análise de cadastro e formalização da cobrança.' },
        { icone: 'network', texto: 'Cadeia de Valor com todos os processos, finalísticos e de suporte, em até 3 níveis, cada um com seu diagrama.' },
        { icone: 'book-open', texto: 'Manual de Processos: cada atividade com entrada, saída e responsável.' },
        { icone: 'gauge', texto: 'Indicadores por área com objetivo, fórmula, frequência e meta: conversão, inadimplência, recuperação de crédito, renovação e satisfação do cliente.' },
        { icone: 'database', texto: 'Portal Gestão Integrada no SharePoint: base única com Clientes, Comercial, Regulamentação, Projetos, ASN, Jurídico e Financeiro.' },
        { icone: 'layout-dashboard', texto: 'Ecossistema Microsoft 365 conectado à mesma base: documentos no OneDrive, comunicação entre setores no Teams e e-mails no Outlook.' },
        { icone: 'chart-column', texto: 'Painéis no Power BI alimentados pela base única, com a visão de todos os setores.' }
      ],
      pontosFortes: [
        { icone: 'trending-up', titulo: 'Receita sob controle', texto: 'Do primeiro contato até a cobrança, cada etapa é medida. Dá para ver onde o funil trava, quanto entra e quanto está em atraso.' },
        { icone: 'shield-check', titulo: 'Dados íntegros', texto: 'Uma única versão da verdade, sem planilhas paralelas nem informação duplicada.' },
        { icone: 'users', titulo: 'Visão 360° do cliente', texto: 'Comercial, contratos, financeiro e jurídico no mesmo lugar.' },
        { icone: 'book-open', titulo: 'Conhecimento documentado', texto: 'O processo não depende de quem executa.' },
        { icone: 'gauge', titulo: 'Gestão por indicadores', texto: 'Cada área com meta clara e acompanhamento periódico.' },
        { icone: 'blocks', titulo: 'Pronta para crescer', texto: 'Novos setores e módulos entram na mesma base sem refazer nada.' }
      ],
      papel:
        'Conduzi a reestruturação do diagnóstico à entrega: mapeei os processos e organizei os setores, transformei as necessidades de cada área em requisitos, desenhei a arquitetura da base única no SharePoint e no OneDrive, integrei os módulos ao Teams e ao Outlook, automatizei rotinas internas com o ecossistema Microsoft e estruturei os dados que alimentam os painéis do Power BI.',
      tecnologias: ['Engenharia de Requisitos', 'Arquitetura de Processos', 'Scrum', 'Kanban', 'SharePoint', 'Power BI', 'CRM', 'OneDrive', 'Teams', 'Outlook', 'Microsoft 365', 'Mapeamento de Processos', 'Cadeia de Valor', 'KPIs'],

      /* Prints com nomes de clientes, consultores e projetistas borrados */
      capa: 'assets/img/projetos/scm/capa.webp',
      /* Até 2 etiquetas flutuando sobre a tela do card */
      chipsCapa: [
        { icone: 'filter', texto: 'Funil medido fase a fase' },
        { icone: 'database', texto: 'Base única de dados' }
      ],
      imagens: [
        { src: 'assets/img/projetos/scm/01-portal-modulos.webp', legenda: 'Portal Gestão Integrada: todos os módulos da empresa em uma única base.' },
        { src: 'assets/img/projetos/scm/02-comercial-contratos.webp', legenda: 'Comercial: cada contrato com serviços, valor, vigência e consultor em um só lugar.' },
        { src: 'assets/img/projetos/scm/06-bi-comercial.webp', legenda: 'Power BI Comercial: faturamento, ticket médio, renovação e desempenho por consultor.' },
        { src: 'assets/img/projetos/scm/07-bi-financeiro.webp', legenda: 'Power BI Financeiro: situação dos contratos, vencimentos e inadimplência por estado.' },
        { src: 'assets/img/projetos/scm/05-bi-menu-kpis.webp', legenda: 'Resultado de KPIs: os indicadores de cada área reunidos em um painel.' },
        { src: 'assets/img/projetos/scm/03-gestao-projetos-inicio.webp', legenda: 'Gestão de Projetos: atendimento ao cliente e acompanhamento por projetista.' },
        { src: 'assets/img/projetos/scm/04-projetos-painel-etapas.webp', legenda: 'Projetos em painel por etapa, do início à aprovação.' }
      ],
      fotos: []
    },
    {
      id: 'itamaraty',
      segmento: 'Governo Federal · Gestão Documental',
      selo: 'Ministério das Relações Exteriores',
      titulo: 'Ministério das Relações Exteriores · Arquivo Histórico',
      tituloCurto: 'Arquivo Histórico do Itamaraty',
      resumo:
        'Sistema web que digitalizou o agendamento de pesquisadores e a gestão do acervo do Arquivo Histórico, com controle de acesso por nível de sigilo.',

      /* 3 destaques que aparecem no card */
      destaques: [
        { valor: '4', rotulo: 'níveis de sigilo com controle de acesso' },
        { valor: 'Total', rotulo: 'rastreabilidade: quem consultou o quê e quando' },
        { valor: 'Ponta a ponta', rotulo: 'do diagnóstico à entrega' }
      ],

      visaoGeral:
        'O Itamaraty, guardião da memória diplomática do país, ganhou uma solução para levar décadas de documentos físicos a uma gestão digital, segura e rastreável.',
      desafio:
        'Um dos órgãos mais estratégicos do Governo Federal gerenciava visitas de pesquisadores por e-mail e Excel. Milhares de documentos ficavam em caixas físicas, sem catálogo do conteúdo, e cada busca era feita à mão. Tudo isso com documentos sigilosos que exigem controle rigoroso pela LAI e pela LGPD.',
      solucao: [
        { icone: 'calendar-check', texto: 'Portal do pesquisador para solicitar e agendar visitas online.' },
        { icone: 'calendar-clock', texto: 'Agenda inteligente com controle de disponibilidade da sala de pesquisa.' },
        { icone: 'archive', texto: 'Catalogação digital do acervo físico, para localizar qualquer documento rapidamente.' },
        { icone: 'lock-keyhole', texto: 'Controle de acesso por nível de sigilo (Ostensivo, Reservado, Secreto, Ultrassecreto).' },
        { icone: 'history', texto: 'Rastreabilidade completa: quem consultou o quê e quando.' }
      ],
      pontosFortes: [
        { icone: 'shield-check', titulo: 'Segurança por nível de sigilo', texto: 'Cada documento só é visto por quem tem permissão, do Ostensivo ao Ultrassecreto.' },
        { icone: 'history', titulo: 'Rastreabilidade total', texto: 'Todo acesso fica registrado: quem consultou o quê e quando.' },
        { icone: 'calendar-check', titulo: 'Adeus e-mail e Excel', texto: 'Pedidos e visitas de pesquisadores passam a ser feitos online, com a sala de pesquisa sob controle.' },
        { icone: 'search', titulo: 'Acervo encontrável', texto: 'O acervo físico ganha catálogo digital e qualquer documento é localizado rapidamente.' }
      ],
      sigilo: ['Ostensivo', 'Reservado', 'Secreto', 'Ultrassecreto'],
      papel:
        'Conduzi a solução do diagnóstico à entrega: entendi a rotina do setor, transformei as necessidades em requisitos, organizei as entregas, desenhei a arquitetura e construí o sistema completo.',
      tecnologias: ['Engenharia de Requisitos', 'Arquitetura de Software', 'Java', 'Spring Boot', 'MySQL', 'Scrum', 'Kanban', 'JavaScript', 'HTML', 'CSS', 'Apache', 'Git/GitHub', 'Trello'],

      capa: 'assets/img/projetos/itamaraty/03-dashboard-sm.webp',
      /* Ilustração do card: 'papeis' mostra a pilha de documentos ao lado da tela */
      visual: 'papeis',
      chipsCapa: [
        { icone: 'check', texto: 'Documento catalogado' },
        { icone: 'lock-keyhole', texto: 'Acesso: Reservado' }
      ],
      imagens: [
        { src: 'assets/img/projetos/itamaraty/01-tela-escolha-portais.webp', legenda: 'Entrada única: Portal do Pesquisador e Portal do Funcionário.' },
        { src: 'assets/img/projetos/itamaraty/02-login-funcionario.webp', legenda: 'Acesso restrito para a equipe do arquivo.' },
        { src: 'assets/img/projetos/itamaraty/03-dashboard.webp', legenda: 'Painel com agendamentos, tramitações e indicadores do arquivo.' },
        { src: 'assets/img/projetos/itamaraty/04-acompanhamento-pesquisadores.webp', legenda: 'Acompanhamento de pesquisadores, salas e status de cada pesquisa.' },
        { src: 'assets/img/projetos/itamaraty/05-cadastro-documentos.webp', legenda: 'Catalogação do acervo físico: volume, espécie, bloco e prateleira.' }
      ],
      /* Fotos da apresentação do projeto */
      fotos: [
        { src: 'assets/img/projetos/itamaraty/apresentacao-grupo.webp', legenda: 'Apresentação da solução: equipe do projeto reunida ao final.' },
        { src: 'assets/img/projetos/itamaraty/apresentacao-palco.webp', legenda: 'Planejamento e acompanhamento das entregas apresentados no quadro do projeto.' }
      ]
    }

    /* MODELO para um novo projeto (copie, cole no TOPO da lista, logo depois de
       "projetos: [", e preencha. O mais recente sempre fica em cima):
    {
      id: 'nome-do-projeto',
      segmento: 'Engenharia · Gestão de Obras',
      selo: 'Nome do cliente',
      titulo: 'Nome completo do projeto',
      tituloCurto: 'Nome curto',
      resumo: 'O que o sistema faz, em uma frase.',
      destaques: [
        { valor: '40%', rotulo: 'menos retrabalho' },
        { valor: '3', rotulo: 'setores integrados' },
        { valor: 'Ponta a ponta', rotulo: 'do diagnóstico à entrega' }
      ],
      visaoGeral: 'Visão geral do projeto.',
      desafio: 'O problema antes do sistema.',
      solucao: [{ icone: 'check', texto: 'O que foi construído.' }],
      pontosFortes: [{ icone: 'sparkles', titulo: 'Ponto forte', texto: 'Por que ele importa.' }],
      papel: 'O que você fez.',
      tecnologias: ['Java', 'MySQL'],
      capa: 'assets/img/projetos/pasta/capa.webp',
      chipsCapa: [{ icone: 'check', texto: 'Etiqueta curta' }],
      imagens: [{ src: 'assets/img/projetos/pasta/tela.webp', legenda: 'Legenda' }],
      fotos: []
    },
    */
  ],

  /* ------------------------------------------------------------------------
     STACK (tirada das suas experiências)
     • largura: 2 → card ocupa duas colunas
     ------------------------------------------------------------------------ */
  stack: [
    {
      grupo: 'Engenharia de Software e Gestão', icone: 'kanban', largura: 2,
      descricao: 'Do requisito à entrega com escopo alinhado, prazos cumpridos e acompanhamento constante.',
      itens: []
    },
    {
      grupo: 'Conhecimento de Negócio', icone: 'building-2',
      descricao: 'Entendo a operação antes de escrever código.',
      itens: []
    },
    {
      grupo: 'Desenvolvimento Full Stack', icone: 'code', largura: 2,
      descricao: 'Sistemas web completos: interface, regras de negócio e banco de dados, do levantamento de requisitos à sustentação em produção.',
      itens: []
    },
    {
      grupo: 'DevOps e Infraestrutura', icone: 'server',
      descricao: 'Publicação contínua e ambientes estáveis, com o sistema sempre no ar.',
      itens: []
    },
    {
      grupo: 'Banco de Dados', icone: 'database',
      descricao: 'Bases bem modeladas, consultas rápidas e sistemas conversando entre si.',
      itens: []
    },
    {
      grupo: 'Dados e BI', icone: 'chart-column',
      descricao: 'Informação íntegra que vira decisão estratégica.',
      itens: []
    },
    {
      grupo: 'Automação de Processos', icone: 'workflow',
      descricao: 'Menos trabalho manual, mais operação integrada.',
      itens: []
    }
  ],


  /* ------------------------------------------------------------------------
     FORMAÇÃO  (vazia = seção escondida)
     Exemplo: { curso: 'Engenharia de Software', instituicao: 'Nome', periodo: '2020 a 2024', tipo: 'Graduação' }
     ------------------------------------------------------------------------ */
  formacao: [],

  /* ------------------------------------------------------------------------
     NÚMEROS  (valor numérico anima contando; texto aparece fixo)
     ------------------------------------------------------------------------ */
  numeros: [
    { valor: 5, rotulo: 'organizações atendidas', detalhe: 'Governo, engenharia, telecom e educação' },
    { valor: 4, sufixo: '+', rotulo: 'anos de experiência', detalhe: 'Desde 2022 em processos digitais' },
    { valor: 3, rotulo: 'projetos entregues', detalhe: 'Software do diagnóstico à entrega' },
    { texto: 'Nacional', rotulo: 'abrangência dos sistemas', detalhe: 'SIGMA, SICOFA, SisGCorp e SICOEX' }
  ],

  /* ------------------------------------------------------------------------
     DEPOIMENTOS  (vazia = seção escondida)
     Exemplo: { texto: 'O sistema mudou nossa rotina...', nome: 'Nome', cargo: 'Cargo · Empresa' }
     ------------------------------------------------------------------------ */
  depoimentos: []
};

/* Conteúdo de exemplo, usado SOMENTE quando o endereço tem ?exemplos */
window.PORTFOLIO_EXEMPLOS = {
  formacao: [
    { curso: 'Seu curso de graduação', instituicao: 'Instituição', periodo: 'Ano a ano', tipo: 'Graduação' },
    { curso: 'Certificação ou curso livre', instituicao: 'Instituição', periodo: 'Ano', tipo: 'Certificação' },
    { curso: 'Especialização', instituicao: 'Instituição', periodo: 'Ano', tipo: 'Pós-graduação' }
  ],
  depoimentos: [
    { texto: 'Aqui entra o depoimento de um gestor ou cliente sobre o resultado que você entregou.', nome: 'Nome da pessoa', cargo: 'Cargo · Empresa' },
    { texto: 'Um segundo depoimento curto, focado em confiança, prazo e resultado.', nome: 'Nome da pessoa', cargo: 'Cargo · Empresa' }
  ]
};
