import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface UsuarioLogin {
  nome: string
  senha: string
}

interface LoginEstado {
  usuario : UsuarioLogin
  logado: boolean

  fazerLogin: (usuario: UsuarioLogin) => void
  deslogar: () => void
}

// 2. Adicionamos os parênteses extras necessários para os middlewares funcionarem com TypeScript
export const usaLoginEstado = create<LoginEstado>()(
  //ativa o redux devtools p/ usar no navegador
  devtools(
    //ativa persistencia p/ salvar e recuperar os dados do localStorage
    persist(
      (set) => ({
        //estado inicial do login
        usuario: { nome: '', senha: '' },
        logado: false,

        //acoes
        fazerLogin: (usuario) => 
          set(
            { usuario: { nome: usuario.nome, senha: usuario.senha }, logado: true }, 
            false, 
            'loginEstado/fazerLogin'   //nome no devtools
          ),

        deslogar: () => 
          set(
            { usuario: { nome: '', senha: '' }, logado: false }, 
            false, 
            'loginEstado/deslogar'   //nome no devtools
          ),
      }),
      {
        name: 'loginEstado-armazem'    //chave do estado no localStorage
      }
    )
  )
)