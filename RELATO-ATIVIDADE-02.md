# Atividade 02 — Evolução da Landing Page com MCP

## O que foi analisado

Foi analisado o fluxo de cadastro da landing page Mesa Viva, com foco em acessibilidade por teclado. O diálogo já era identificado semanticamente com `role="dialog"` e `aria-modal="true"`, mas não tratava o foco durante a abertura, a navegação por teclado e o fechamento.

## Modificações realizadas

- Ao abrir o cadastro, o foco vai para o primeiro campo do formulário.
- `Tab` e `Shift + Tab` mantêm a navegação dentro do diálogo.
- A tecla `Escape` fecha o diálogo.
- Ao fechar, o foco retorna ao elemento que abriu o cadastro.
- Após o envio demonstrativo, o foco vai para o título da confirmação.
- Elementos interativos exibem um contorno de foco visível; o botão do menu móvel anuncia se vai abrir ou fechar o menu.

## MCP utilizado e contribuição

Foi utilizado o **MCP GSD**, por meio da leitura de recursos de referência para análise de interfaces. O registro verificável da interação é a chamada MCP `read_mcp_resource` ao recurso `gsd://references/ui-consideration-probe.md` (servidor `gsd`). Esse material organiza estados relevantes para formulários e controles, incluindo formulário vazio, carregamento, erro e conteúdo preenchido. Também foi consultado `gsd://workflows/verify-work/steps/automated-ui-verification.md`, que descreve verificação automatizada de interface quando há MCP de navegador disponível.

Essas referências ajudaram a estruturar a inspeção do fluxo do formulário e a considerar mais do que sua aparência. A deficiência específica de teclado no diálogo foi identificada na leitura do código da aplicação e implementada conforme as necessidades desse fluxo. O MCP serviu como apoio metodológico; ele não inspecionou nem executou automaticamente esta landing page.

## Verificação e avaliação

- `npm run build`: concluído com sucesso.
- Não havia MCP de navegador/testes visuais disponível nesta sessão; portanto, não foi registrada uma inspeção visual automatizada nem uma captura de tela de execução.
- A contribuição do MCP foi útil para orientar a revisão dos estados da interface, mas limitada: a verificação funcional do diálogo no navegador ainda pode ser feita manualmente.

## Texto para a entrega no Moodle

Analisei o fluxo de cadastro e melhorei sua acessibilidade para teclado: o foco passa para o formulário ao abrir, fica contido no diálogo, pode fechá-lo com `Esc` e retorna ao botão de origem ao fechar. Também direcionei o foco ao aviso de sucesso, adicionei indicadores visíveis de foco e ajustei o rótulo acessível do menu móvel. Usei o MCP GSD para consultar referências de avaliação de estados de interfaces, especialmente estados de formulários (vazio, carregamento, erro e preenchido), o que ajudou a estruturar a análise. O MCP apoiou a avaliação, mas não executou a aplicação. A compilação de produção (`npm run build`) foi concluída com sucesso.

**Repositório configurado no projeto:** https://github.com/Ricardo-perdigao/Mesa-Viva

As alterações desta atividade estão no diretório local. Para entregar o link com a versão atualizada, publique os commits pendentes nesse repositório.
