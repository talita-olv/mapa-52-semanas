# Regras e formatos

## Campos

O identificador e a data de referência são obrigatórios. Cada linha deve representar uma regra para uma atividade/equipamento. Descrição, local, atividade/plano, criticidade, tipo e HH são opcionais. Identificadores devem ser armazenados como texto na planilha para preservar zeros à esquerda.

Datas: DD/MM/AAAA, DD.MM.AAAA, DD-MM-AAAA ou AAAA-MM-DD. Use quatro dígitos para o ano. Datas reais do Excel são lidas pelo leitor de planilhas; se sua formatação não for reconhecida, formate como DD/MM/AAAA antes de importar. Uma linha de cabeçalho deve conter um nome por coluna; cabeçalhos mesclados não são suportados.

Não há inteligência artificial interpretando dados. A sugestão de mapeamento compara nomes conhecidos; você confirma o significado das colunas.

## Periodicidade textual

| Entrada | Interpretação |
|---|---|
| Diário / diária | 1 dia |
| Semanal | 1 semana |
| Quinzenal | 15 ou 14 dias, conforme seleção |
| Mensal / 1M | 1 mês |
| Bimestral | 2 meses |
| Trimestral / 3M | 3 meses |
| Quadrimestral | 4 meses |
| Semestral / 6M | 6 meses |
| Anual / 1A | 1 ano |
| 90 dias | Exatamente 90 dias |

90 dias e 3 meses são regras diferentes. “M” significa mês nesta versão; minutos e horas não são aceitos como ciclos de calendário.

## Ciclo e unidade

Informe um inteiro positivo e a unidade. Unidades aceitas: dia, semana, mês e ano, com abreviações comuns. Ciclos fracionários, zero, negativos e ciclos de contador ficam pendentes.

## Datas programadas

Cada linha é uma ocorrência. Não é aplicada recorrência nem um ciclo adicional. Esta é a opção preferida para reproduzir fielmente a programação extraída de um CMMS com regras avançadas.

## Estratégias

Cole no campo do aplicativo, sem cabeçalho:

```text
EST_A;1M;1;MES
EST_A;3M;3;MES
EST_B;6M;6;MES
```

A planilha contém o código, por exemplo EST_A, e uma data-base. Se selecionar primeira/próxima ocorrência, todos os pacotes ocorrem na data-base e depois seguem seu próprio ciclo. Se selecionar última execução, cada pacote começa na data-base somada ao seu ciclo. Não há datas iniciais diferentes por pacote neste modo; use ciclo + unidade com uma linha por pacote se precisar disso.

O código desconhecido gera pendência. O nome de uma estratégia SAP, sozinho, não revela seus pacotes.

## Calendário

O mapa usa **ano ISO**: segunda a domingo, com a semana 1 contendo 4 de janeiro. Para 2026, o período é 29/12/2025 a 03/01/2027 (53 semanas). Portanto, uma regra mensal antiga ancorada no dia 31 pode produzir 13 ocorrências nesse intervalo, incluindo 31/12/2025. Isso não é duplicação.

Para comparar com relatórios de janeiro a dezembro, filtre as datas no CSV exportado. A interface desta versão não oferece janela móvel de 52 semanas nem alternância para ano civil.

Mensal e anual calculam cada data a partir da âncora original, sem acumular encurtamentos de fevereiro. Exemplo: 31/01 → 28/02 → 31/03. Não são aplicados feriados ou deslocamentos para dias úteis.

## Carga

HH é homem-hora por ocorrência: uma atividade de 2 horas com 2 pessoas corresponde a 4 HH. Se não houver HH em todas as ocorrências filtradas, a aplicação mostra cobertura parcial e não conclui se existe sobrecarga. Quantidade de ocorrências é sempre calculada separadamente.

Datas fora do ano ISO não aparecem como ocorrências do mapa. A regra/equipamento pode continuar visível com a linha vazia. Não são criadas ocorrências anteriores à primeira data-base.
