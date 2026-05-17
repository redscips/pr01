import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface UsuarioLogin {
  nome: string
  senha: string
}

export interface LoginEstado {
  usuario : UsuarioLogin
  logado: boolean

  fazerLogin: (usuario: UsuarioLogin) => void
  deslogar: () => void
}

export const useLoginEstado = create<LoginEstado>()(
  //ativa o redux devtools p/ usar no navegador
  devtools(
    //ativa persistencia p/ salvar e recuperar os dados do localStorage
    persist(
      (definir) => ({
        //estado inicial do login
        usuario: { nome: '', senha: '' },
        logado: false,

        //acoes
        fazerLogin: (usuario) => 
          definir(
            { usuario: { nome: usuario.nome, senha: usuario.senha }, logado: true }, 
            false,
            'loginEstado/fazerLogin'   //nome no devtools
          ),

        deslogar: () => 
          definir(
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