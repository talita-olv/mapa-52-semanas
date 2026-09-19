# Mapa por estratégia

Acesse pelo [hub](https://talita-olv.github.io/mapa-52-semanas/hub/) ou [abra a ferramenta](https://talita-olv.github.io/mapa-52-semanas/estrategias/).

## Entrada

Arquivo Excel com a aba `MAPA_52_SEMANAS`, contendo Equipamento, Estratégia IP18 (ou Estratégia) e S01 a S52, com S53 opcional. O leitor preserva as marcações existentes. A aba `RESUMO_ESTRATEGIAS` fornece descrição e ciclos das estratégias; a aba `LEIA_ME` fornece premissas e legenda.

São reconhecidos os campos Centro planejamento, Tipo de ordem, Denominação do objeto técnico, Planta, Sistema Agregador, Item manutenção, Plano de manutenção, Estratégia IP14, Status cruzamento, Ciclos da estratégia e Fora do mapa.

Não é necessário fornecer data-base para **visualizar as semanas existentes**. Esta ferramenta não recalcula a programação. Ela não converte os pacotes em datas nem interpreta S01 como uma data específica.

## Três visões

- **Por estratégia:** agrupa os registros filtrados pelo código, mostra equipamentos distintos e os pacotes presentes em cada semana. Cada célula reúne os códigos dos registros selecionados; ao clicar, os detalhes revelam quais planos têm cada combinação. O resumo usa os registros filtrados, não supõe que todos os planos compartilhem uma programação idêntica.
- **Por registro:** preserva uma linha para cada registro do arquivo, com equipamento, plano e item identificados. Não remove linhas que pareçam duplicadas nem funde planos do mesmo equipamento.
- **Por ciclo:** mostra os ciclos declarados de cada estratégia e destaca os ciclos fora do mapa.

O catálogo pode conter mais estratégias do que as vinculadas aos equipamentos importados. O indicador principal conta apenas estratégias efetivamente vinculadas à seleção.

## O significado das contagens

O gráfico conta **registros com algum pacote em cada semana**. Não é contagem de ordens, HH ou execuções. Uma célula com `D` indica que há um pacote diário na semana; não informa quantas execuções aconteceram ou devem acontecer.

O status de cruzamento é o fornecido pelo arquivo. “Não localizado em IP14” significa que o cruzamento não encontrou o plano nessa base; não prova ausência no sistema de origem. Valores vazios de status são apresentados separadamente.

Se a aba LEIA_ME declarar calendário teórico ou ausência de data-base, essa condição fica destacada. Sem uma declaração, a ferramenta mantém a designação de semanas importadas sem atribuir datas.

## Limites e processamento

- Até 30 MB e 100.000 linhas como limites de entrada, sem garantia de desempenho uniforme.
- Leitura Excel em Web Worker para manter a página responsiva durante a importação.
- Paginação de 20 estratégias ou 40 registros, com exportação CSV de todos os registros filtrados.
- A aplicação não envia planilhas ou resultados a servidores, não salva dados e não tem telemetria.
- O arquivo não é publicado no GitHub ao ser selecionado. Fechar ou atualizar a página remove a base da memória.
- Use a versão hospedada. Web Workers podem ser bloqueados em arquivos abertos pelo protocolo `file://`.
- Os dados de demonstração são fictícios. Nenhuma base operacional faz parte do repositório.

## O que permanece no sistema de origem

O fluxo IP18 → plano/estratégia, IP14 → conferência e IP13 → pacotes explica a montagem do arquivo. Esta versão recebe o **mapa consolidado**. Não importa nem cruza as três extrações brutas automaticamente. Também não reproduz hierarquia de pacotes, supressão, deslocamentos, feriados, tolerâncias ou ciclos de horímetro.

Para gerar uma programação com datas reais, utilize as chamadas programadas no CMMS ou configure ciclos e datas na outra ferramenta, observando seus limites documentados.
