# Validação da versão 1.0.0

Verificação realizada em 19/09/2026.

- 11 testes automatizados do motor passaram em Node.js.
- Testes de integração em DOM simulado (JSDOM 26) passaram: exemplo com 12 equipamentos e 189 ocorrências, importação Excel com 5 abas, ciclo + unidade com 38 ocorrências, datas programadas com 2 ocorrências e estratégias com 18 ocorrências.
- Verificados filtros, abertura de detalhes, seleção de aba, identificação com zeros à esquerda, CSV com ponto e vírgula dentro de aspas, rejeição de data inválida, consentimento para geração parcial e escape de HTML importado.
- Verificado bloqueio da análise de capacidade quando faltam HH.
- JavaScript verificado sintaticamente. HTML independente exercitado nos testes de integração.

Limites da verificação: não houve inspeção visual em navegador real, porque o navegador disponível não permite abrir o arquivo local. Não houve publicação no GitHub Pages, teste de impressão real nem medição de desempenho em bases de 20.000 linhas. Os testes não equivalem a homologação operacional.
