# Hub de Inovações na Manutenção

Ferramentas abertas de planejamento e análise de manutenção, por Talita Souza.

**[Abrir o hub](https://talita-olv.github.io/mapa-52-semanas/hub/)**

- **[Mapa por estratégia](https://talita-olv.github.io/mapa-52-semanas/estrategias/)**: leitura de MAPA_52_SEMANAS, com planos, itens, ciclos e marcações semanais já existentes.
- **[Mapa por ciclos e datas](https://talita-olv.github.io/mapa-52-semanas/)**: geração de calendário com datas de referência.

Leia [o guia do mapa por estratégia](docs/MAPA_POR_ESTRATEGIA.md).

## Mapa por ciclos e datas

Transforme bases de manutenção em um mapa anual interativo, com conferência de colunas, regras explícitas e processamento no navegador.

**Concepção: Talita Souza** · [Perfil no GitHub](https://github.com/talita-olv) · Versão 1.1.0

**[Abrir a ferramenta online](https://talita-olv.github.io/mapa-52-semanas/)** · [Baixar modelos Excel](exemplos/Modelos_Mapa_52_Semanas.xlsx)

## Experimentar

Abra `index.html` no navegador e clique em **Explorar exemplo**. Não precisa instalar um programa, criar conta ou enviar dados para um servidor. Mantenha a pasta `assets` ao lado do HTML.

Para distribuir como arquivo único, execute `python3 scripts/build_standalone.py`. O resultado será `Mapa_52_Semanas.html`, com JavaScript, estilos e leitor de Excel incorporados. Python é usado somente para empacotar o projeto, nunca para utilizar o mapa.

## O que funciona

- Importação de Excel `.xlsx`, `.xls` e CSV, seleção de aba e linha do cabeçalho.
- Sugestões por nome de coluna, com conferência manual obrigatória.
- Periodicidade textual; ciclo e unidade; datas programadas; estratégias com pacotes independentes.
- Datas mensais e anuais de calendário, sem transformar mês em 30 dias.
- Escolha explícita de “quinzenal”: 15 dias ou 14 dias.
- Primeira/próxima ocorrência ou última execução como data de referência.
- Ano ISO com 52 ou 53 semanas, sem descartar a semana 53.
- Pendências por linha, aviso de duplicidade e opção explícita de excluir linhas inválidas.
- Filtros por local, criticidade e tipo, além de busca por equipamento/atividade.
- Quantidade semanal, HH quando informadas, mapa com detalhes e exportação CSV.
- Avaliação de capacidade com HH completas e capacidade semanal fornecida.
- Modelos Excel disponíveis pelo botão do aplicativo, além dos exemplos deste repositório.
- Impressão/PDF dos indicadores, gráfico e página atual do mapa (até 60 linhas).

## Como usar

1. Selecione a planilha, aba e linha de cabeçalho.
2. Escolha o formato e o ano ISO.
3. Confirme as colunas e o significado da data-base.
4. Em estratégias, preencha as equivalências `código;pacote;ciclo;unidade`.
5. Confira a base. Corrija as pendências ou autorize conscientemente a geração parcial.
6. Gere o mapa, filtre e exporte as ocorrências.

Leia [Regras e formatos](docs/REGRAS.md) e [Publicar no GitHub](docs/PUBLICAR.md).

## Privacidade

Arquivos importados ficam na memória do navegador. O código não envia planilhas, nomes de ativos ou ocorrências para servidores. A biblioteca de Excel está incluída no projeto, sem carregamento por CDN. Fechar ou recarregar a página apaga o estado. Não há telemetria, cookies do aplicativo ou salvamento automático.

O provedor que hospeda o site pode registrar requisições normais de acesso ao site. Isso é diferente de receber as planilhas: o aplicativo não faz upload delas.

Todos os exemplos são fictícios e não representam uma empresa. Não publique bases operacionais ou dados privados neste repositório.

## Limites conhecidos

- Não substitui o agendamento oficial do CMMS e não cria ordens.
- Ciclos de horímetro, produção ou condição precisam de previsão externa; não são estimados aqui.
- Pacotes de estratégia são cumulativos, independentes e usam a mesma âncora. Não reproduz supressão/hierarquia, tolerâncias, deslocamentos ou calendário fabril do SAP. Para fidelidade ao CMMS, importe datas programadas.
- Em estratégias com vários pacotes, HH na linha são bloqueadas para evitar multiplicação indevida. Use uma linha por pacote em ciclo + unidade para atribuir HH específicas.
- Limites de proteção: 20 MB, 20.000 linhas por aba e 250.000 ocorrências. Bases muito densas devem ser divididas. Não há promessa de desempenho uniforme para todo equipamento/navegador.
- Duplicatas são avisadas e mantidas. Confira-as antes de gerar.
- Uma linha do mapa representa equipamento + local + atividade + regra e atributos. O mesmo ativo pode ocupar várias linhas.
- A comparação de capacidade é da seleção atual, usando o mesmo valor de HH em todas as semanas. Não considera especialidades, turnos, feriados ou indisponibilidades.
- CSV é exportado com `;`, UTF-8 e proteção contra fórmulas em valores textuais.

## Estrutura técnica

| Arquivo | Papel |
|---|---|
| `index.html` | Interface e instruções |
| `assets/style.css` | Estilos responsivos e impressão |
| `assets/engine.js` | Datas, ciclos, semanas ISO e estratégias |
| `assets/app.js` | Importação, validação, filtros e exportações |
| `assets/xlsx.full.min.js` | SheetJS CE 0.20.3 incluída localmente |
| `exemplos/` | Bases fictícias |
| `tests/engine.test.cjs` | Testes do calendário |
| `scripts/build_standalone.py` | Empacotamento em HTML único |

## Testes

Com Node.js instalado: `node --test tests/engine.test.cjs`.

Os testes cobrem preservação do dia 31, ano bissexto, validação de datas, distinção entre 15 e 14 dias, dias versus meses, semana 53, última execução, âncora histórica, unidades incompatíveis e pacotes.

## Alcance do projeto

Stars, forks e tráfego do repositório ajudam a acompanhar interesse. **Visitas ao repositório não equivalem a pessoas utilizando o mapa.** Esta versão não mede usuários do aplicativo nem planilhas importadas. Não apresenta contadores fictícios. Uma futura medição de uso precisa ser projetada separadamente, sem coletar dados de manutenção.

## Contribuir

Abra uma issue descrevendo o comportamento esperado e o observado, com um exemplo fictício mínimo. Não anexe bases corporativas. Mudanças no calendário devem incluir teste que demonstre a regra.

## Licença

Código do projeto sob [MIT](LICENSE). SheetJS CE possui licença Apache 2.0, preservada em `assets/SHEETJS-LICENSE.txt`. Consulte `THIRD_PARTY_NOTICES.md`.
