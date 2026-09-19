# Validação da versão 1.0.0

Verificação realizada em 19/09/2026.

- 11 testes automatizados do motor passaram em Node.js.
- Testes de integração em DOM simulado (JSDOM 26) passaram: exemplo com 12 equipamentos e 189 ocorrências, importação Excel com 5 abas, ciclo + unidade com 38 ocorrências, datas programadas com 2 ocorrências e estratégias com 18 ocorrências.
- Verificados filtros, abertura de detalhes, seleção de aba, identificação com zeros à esquerda, CSV com ponto e vírgula dentro de aspas, rejeição de data inválida, consentimento para geração parcial e escape de HTML importado.
- Verificado bloqueio da análise de capacidade quando faltam HH.
- JavaScript verificado sintaticamente. HTML independente exercitado nos testes de integração.

A versão publicada no GitHub Pages foi aberta em navegador real. O exemplo gerou 12 equipamentos, 189 ocorrências e 437,5 HH, com inspeção visual de indicadores e mapa.

Limites da verificação: não houve teste de impressão real, inspeção em dispositivo móvel nem medição de desempenho em bases de 20.000 linhas. Os testes não equivalem a homologação operacional.

## Versão 1.1.0 · Hub e mapa por estratégia

- 17 testes automatizados passaram: 11 do calendário anterior e 6 da leitura por estratégia.
- Verificada localmente a importação de uma planilha completa, com reconciliação independente de registros, equipamentos, estratégias, status e ciclos fora do mapa.
- Em DOM simulado, verificados filtros, paginação, detalhes, visão por ciclos e preservação de planos/itens.
- Links locais e sintaxe de scripts verificados. A base usada na validação não foi incluída no repositório.
