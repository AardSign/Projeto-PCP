# PCP Project – Sistema de Montagem de Computadores (Back-end em Java)

Projeto acadêmico inspirado no **PCPartPicker**, desenvolvido com o objetivo de aplicar conceitos de desenvolvimento back-end em Java, criação de API REST e consumo da API em um front-end web.

O sistema permite a simulação da montagem de computadores, organizando e gerenciando componentes como processadores, placas-mãe, memórias, entre outros, aplicando regras de negócio e validações.

O projeto foi desenvolvido com **arquitetura em camadas**, separando responsabilidades e seguindo boas práticas de desenvolvimento.

##  Tecnologias Utilizadas

### Back-end
- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- API REST
- Git

### Front-end
- JavaScript
- HTML
- CSS

##  Arquitetura
O back-end segue o padrão de camadas:
- Controller: exposição dos endpoints REST
- Service: regras de negócio
- Repository: acesso aos dados
- Separação clara entre front-end e back-end
- Consumo da API REST no front-end

##  Funcionalidades
- Montagem de builds de computadores
- Salvamento de builds
- Estrutura preparada para favoritar peças
- Visualização de detalhes de cada componente
