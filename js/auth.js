/*
  Central Digital UPED — Autenticação e papéis
  ---------------------------------------------
  Cada usuário autenticado tem um documento em /usuarios/{uid} com:
    { nome: "...", setor: "...", papel: "admin" | "nutricao" | "educacao_permanente" | "direcao" | "rh" }

  Esses documentos de usuário são criados manualmente pelo admin no Console do
  Firebase (Firestore) depois que a pessoa faz o primeiro login — não existe
  autocadastro nesta Fase 1, por segurança (só quem a Direção autorizar tem papel).
*/

// Retorna { uid, email, nome, papel } do usuário logado, ou null se não logado.
async function getUsuarioAtual() {
  return new Promise((resolve) => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) return resolve(null);
      try {
        const doc = await db.collection("usuarios").doc(user.uid).get();
        if (!doc.exists) {
          resolve({ uid: user.uid, email: user.email, nome: user.email, papel: null });
        } else {
          resolve({ uid: user.uid, email: user.email, ...doc.data() });
        }
      } catch (e) {
        console.error("Erro ao buscar papel do usuário:", e);
        resolve({ uid: user.uid, email: user.email, nome: user.email, papel: null });
      }
    });
  });
}

async function login(email, senha) {
  return auth.signInWithEmailAndPassword(email, senha);
}

async function logout() {
  return auth.signOut();
}

// Papéis que podem escrever em cada área (espelha firestore.rules).
const PERMISSOES = {
  cardapio: ["admin", "nutricao"],
  destaque: ["admin", "direcao", "educacao_permanente"],
  comunicados: ["admin", "direcao"],
  aniversariantes: ["admin", "rh"],
};

function podeEditar(area, papel) {
  return (PERMISSOES[area] || []).includes(papel);
}
