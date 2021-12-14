# GCB media

Projeto criado com o intúito de criar uma rede social simples

## Tecnologias utilizadas

* React.js + Next.js
* MySQL
___
## Esquema de tabelas

### tbusers
Atributo | Tipo | Exemplo
-|-|-
userId | INT | 12
userName | VARCHAR(40) | Gabriel
userPassword | VARCHAR(20) | 12345678

### tbpost
Atributo | Tipo | Exemplo
-|-|-
postId | INT | 10
userId | INT | 12
imageUrl | VARCHAR(50) | https://github.com/GabrielBrandao13.png
datePost | datetime | 2021-12-06 16:50:08
text | VARCHAR(100) | Meu primeiro post

## Chaves estrangeiras

Tabela 1 | Tabela 2 | Coluna
-| -| -
tbusers | tbpost | userId

