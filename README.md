# Central Digital UPED — Fase 1

Portal institucional colaborativo da UPED. Fase 1: estrutura principal, login por
setor, cardápio da semana (Nutrição) e documento em destaque (Direção/NEP) já
editáveis de verdade.

## 1. Criar o projeto Firebase

1. Acesse https://console.firebase.google.com e crie um projeto novo (ex.: `central-digital-uped`)
2. Em **Authentication → Sign-in method**, ative **E-mail/senha**
3. Em **Firestore Database**, clique em **Criar banco de dados** → modo **produção**
4. Em **Configurações do projeto → Geral → Seus apps**, clique no ícone `</>` (Web),
   registre o app e copie o objeto `firebaseConfig`
5. Cole esse objeto em `js/firebase-config.js`, substituindo os `"COLE_AQUI"`

## 2. Publicar as regras de segurança

No Console do Firebase, vá em **Firestore Database → Regras** e cole o conteúdo
de `firestore.rules` deste projeto. Clique em **Publicar**.

> A leitura de `cardapio`, `destaque`, `comunicados` e `aniversariantes` é
> pública de propósito — a Home não exige login, só as telas de edição exigem.
> Se você editar as regras direto no Console (em vez de colar este arquivo),
> confira se ficou `allow read: if true;` nessas quatro coleções — do
> contrário a Home trava em "Carregando…" pra sempre.

## 3. Criar os primeiros usuários

Nesta Fase 1 não existe autocadastro (por segurança). Para cada funcionário que
vai editar conteúdo:

1. **Authentication → Users → Add user** — crie o e-mail e uma senha provisória
2. Copie o **UID** gerado
3. **Firestore Database → Iniciar coleção** → nome `usuarios`
4. Crie um documento com **ID = o UID copiado**, com os campos:
   - `nome` (string) — ex.: "Maria Nutricionista"
   - `papel` (string) — um de: `admin`, `nutricao`, `educacao_permanente`, `direcao`, `rh`

Repita para cada pessoa que vai alimentar conteúdo. A Direção pode ter papel `admin`
para editar tudo.

## 4. Rodar localmente

Não precisa de build — é HTML puro. Basta abrir `index.html` num navegador, ou
usar qualquer servidor estático local (ex.: extensão "Live Server" do VS Code).

## 5. Publicar no GitHub Pages

```bash
git init
git add .
git commit -m "Central Digital UPED — Fase 1"
git branch -M main
git remote add origin <URL_DO_SEU_REPOSITORIO>
git push -u origin main
```

No GitHub: **Settings → Pages → Branch: main → pasta / (root)** → salvar. Em
alguns minutos o site fica disponível em `https://<seu-usuario>.github.io/<repo>/`.

## Estrutura de dados usada nesta fase

```
usuarios/{uid}          → { nome, papel }
cardapio/atual           → { dias: { segunda: {almoco:[...], sobremesa}, ... }, semanaInicio, atualizadoPor }
destaque/{id}            → { titulo, arquivoUrl, atualizadoEm, atualizadoPor }
aniversariantes/{id}     → { nome, dia, mes }   (cadastro manual no Console nesta fase)
comunicados/{id}         → { titulo, corpo, data }   (cadastro manual no Console nesta fase)
```

`aniversariantes` e `comunicados` já têm leitura pronta na Home — o formulário de
edição deles entra na **Fase 2**, junto com o restante das seções do hub.

## Próximos passos (Fase 2)

- Formulários de edição para aniversariantes e comunicados
- Seções de POPs, Documentos Institucionais, Educação Permanente, Qualidade,
  Indicadores, Banco de Ideias e Contatos
- Painel administrativo unificado (hoje o `admin.html` já segue esse padrão,
  só falta crescer com as novas seções)
