# Arquitetura

## Peças do quebra-cabeça

O estado da aplicação e as mudanças deste estado são gerenciadas pelo **Redux**, uma biblioteca que implementa uma variação pura, sem efeitos colaterais da arquitetura [Flux](https://facebook.github.io/flux/). Redux e Flux prescrevem um fluxo de dados unidirecional da aplicação. Para entender o Redux, de uma olhada neste [desenho do Lin Clark](https://code-cartoons.com/a-cartoon-guide-to-flux-6157355ab207#.4dpmozm9v) e neste [curso de Redux do Dan Abramov's egghead.io](https://egghead.io/series/getting-started-with-redux)

O Redux nos ajuda com a atualização síncrona do estado da nossa aplicação, mas ele oferece uma solução pronta para lidar com ações assíncronas. O ecossistema Redux tem várias possíveis soluções para esse problema. Em nossa aplicação nós iremos usar o redux-thunk puro para ações assíncronas

O estado nas aplicações Redux nunca podem ser mutados, mas sempre clonados. Para isso, sempre que formos mexer em um objeto ou array, fazemos uso do spread operator, ou algum outro immutable helper

## Organizando o Código

Como organizamos nossa aplicação.

### Componentes

O diretório `components` deve sempre conter componentes em React Native JSX, que receba inputs por `props`. No linguajar Flux/Redux, os componentes devem ser dumb/presentation componets, ou seja, os componentes não devem set `connect()` com redux store diretamente, mas usados por smart/container components, que são exatamente os componentes `connect()`

Os componentes podem ser stateful se isso fazer sentido, mas considere sempre externalizar o estado para o Redux, quando isso também fazer sentido. Se o estado necessita ser persistido, compartilhado por outros componentes ou módulos, então ele deve ir para o estado do Redux.

Um componente pode ser escrito como uma classe ES7 `class Foo extends Component` apenas quando este for fazer uso do state e das funções do React lifecycle, caso contrário sempre prefira stateless Components, ou seja, Componentes escritos como funções pura do Javascript

### Módulos

O diretório `modules` contém a parte mais interessante da aplicação. Como regra, aqui será onde estará todo o código que modifica ou lê o estado da aplicação.

Cada módulo tem seu próprio diretório e representa um "domínio discreto" dentro da aplicação. Não há uma regra clara e bem definida em como separar sua aplicação em módulos (de fato, essa é uma das partes mais difíceis em desenhar uma aplicação Redux), mas há algumas qualidade que definem um bom módulo.

- Representa uma tela da aplicação ou uma coleção de telas que forma uma funcionalidade.
- Representa alguma funcionalidade técnica que necessita de seu próprio estado
- Raramente precisa usar dado dos estados de outros módulos
- Não contém dados que são muito usados em outros módulos.

#### Anatomia de um Módulo

Na sua forma mais simples, um módulo contém três partes lógicas: **State**, **View(s)** and **Container(s)**. Todos esses são opcionais, i.e. um componente pode ou não ter uma View, se um módulo consiste apenas em uma View, considere fazer dele um componente.

##### State

O **State** encapsula o estado da aplicação, e qualquer estado que possa modificar esse estado. O estado pode ser dados, por exemplo, buscado de um server ou criado pelo usuário dentro do app, ou ainda ser algo transitório, como caso o usuário está ou não logado na aplicação, ou se um determinado element da UI deve ser mostrado ou não.

O parte do estado de um módulo é um [Redux Duck](https://github.com/erikras/ducks-modular-redux) - um arquivo que contém um Reducer, Action Creators, Initial State e os Selectors da aplicação.

Vamos usar como exemplo simples uma aplicação que mostra um número, onde um usuário pode incrementar apertando um botão, gerar um número randômico apertando outro botão ou resetar o numero pra 0.

```js
// example.state.js
import { Api } from '../../services'

const api = new Api()

/* 
* INITIAL STATE
*
* Começamos definindo o estado inicial do módulo,
* que consiste em um objeto com seus devidos parâmetros
*/
const initialState = {
  count: 0,
  isLoading: false,
  error: null,
}

/*
* ACTION TYPES (Naming: SCREAMING_CASE)
*
* Definimos constantes para os tipos de ações (Actions types). Os actions types devem ser
* globalmente únicos, então nós os nomeamos com um prefixo, que normalmente é o nome do módulo,
* assim evitamos colisões acidentais. Também ajuda nomear as actions com um nome descritivo,
* ajudando assim no debugging, Em grande parte dos casos estas constantes serão privadas à
* este arquivo, mas muito raramente poderão ser exportadas.
*/
const INCREMENT = 'ExampleState/INCREMENT'
const RESET = 'ExampleState/RESET'
const RANDOM_REQUEST = 'ExampleState/RANDOM_REQUEST'
const RANDOM_SUCCESS = 'ExampleState/RANDOM_SUCCESS'
const RANDOM_FAILURE = 'ExampleState/RANDOM_FAILURE'

/*
* Action creators são funções que tem a responsabilidade de encapsular a criação de mensagens
* passadas ao reducer. Sua API deve ser amigável ao que irá consumi-lá e esconder ao máximo
* sua implementação interna da atualização do estado.
*
* Actions creators em sua forma mais simples serão apenas uma função que retorna um objeto
* com um type. Em outros momentos poderão ser assíncronas, fazendo uso do redux-thunk.
*
* Action creators são sempre consts exportadas que recebem ùm arrow function.
* e.g. `export const name = () => {...}`
*/
export const increment = (): Object => ({ type: INCREMENT })

export const reset = (): Object => ({ type: RESET })

export const randomRequestSuccess = (payload: number): Object => ({
  type: RANDOM_SUCCESS,
  payload,
})

export const randomRequestFailure = (error: Error): Object => ({
  type: RANDOM_FAILURE,
  payload: error.message,
})

export const requestRandomNumber = (
  forceFailure: boolean
): void => async dispatch => {
  dispatch({
    type: RANDOM_REQUEST,
  })

  try {
    const randomNumber = await api.getRandomNumber(forceFailure)

    dispatch(randomRequestSuccess(randomNumber))
  } catch (e) {
    dispatch(randomRequestFailure(e))
  }
}

/*
* O Reducer é responsável por lidar com todas as actions definidas neste módulo.
* O primeiro parâmetro é o estado anterior deste módulo, e o seu padrão deve ser o initial state.
*
* Então o reducer examina o objeto "action" e decide se algum estado deve mudar em resposta à
* aquela ação. O reducer deve retorna um estado atualizado, ou se nenhuma mudança foi feita,
* retornar o estado anterior sem nenhuma mudança.
*
* O reducer sempre é um default export do ES6.
*/
export default (state = initialState, action = {}): Object => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 }

    case RANDOM_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      }

    case RANDOM_SUCCESS:
      return {
        isLoading: false,
        count: action.payload,
      }

    case RANDOM_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    case RESET:
      return initialState

    default:
      return state
  }
}

/*
* SELECTORS (Naming: camelCase)
*
* um "selector" é uma função simples que aceita um estado do Redux como argumento e retorna dados
* derivados desse estado. É melhor pratica manter seu estado do Redux minimo e derivar dados do
* estado à media que precisar. Selector ajudam neste ponto. Eles conseguem computar dados
* derivados, deixando o trabalho de Redux de guardar o estado o mínimo possivel. Selectors
* também são bem eficientes. Um Selector não é recomputado, a não ser que um dos seus
* argumentos mudem de valor.
*/
export const selectCount = ({ example }) => example.count
export const selectLoading = ({ example }) => example.isLoading
export const selectError = ({ example }) => example.error
```

O padrão Redux Ducks tem como objetivo manter o código portátil, contido e fácil de refatorar ao co-localizar o reducer com os actions creators. Para módulos complexos, o Duck se tornar extenso, afetando a manutenibilidade, neste caso ele poderá ser dividido em pedaços menores, separando o reducer em seu próprio arquivo, ou dividindo o estado em Ducks menores e combinando os reducers posteriormente fazendo uso das estratégias padrão para separar/combinar Redux

##### View

Tipicamente a **View** representa a tela da aplicação. Um módulo pode ter várias views, se a parte da aplicação consistir em múltiplas telas, ou se a única view ser muito complexa para escrever em um único arquivo

Tecnicamente falando, a view é idêntica à um componente que definimos no diretório `components`. A diferença é o jeito que usamos ela. Idealmente, o papel da View é de orquestrar os componentes reusáveis. A view pode estar ciente de como o estado da aplicação se parece e que actions atualizam ela, se um componente deve ou não chamar diretamente uma Action, e ter sua própria interface de `props` desenhada ao redor do propósito do componente, e não do estado da aplicação

Usualmente a View tem alguns componentes de apresentação e estilo, mas quando mais magra a view, melhor. Para propósito de manutenibilidade, é melhor se uma implementação específica de plataforma se feita à um nível de `component`, e a View permanecer agnóstica quanto a plataforma.

Uma view deve tomar todos os inputs com `props`, and deve ser raramente `stateful`, ou seja, ter seu próprio state. O estado deve ser preferencialmente gerenciado pelo Redux, e injetado no componente como props pelo container.

Continando o exemplo acima, uma view deve se assemelhar a algo assim:

```js
// example.view.js
import React, { Component } from 'react'
import { Button, CircularProgress } from '@material-ui/core'

import { colors } from '../../theme'

type Props = {
  increment: Function,
  reset: Function,
  requestRandomNumber: Function,
  counter: number,
  isLoading: boolean,
  error: Object,
}
export default class ExampleView extends Component<Props> {
  componentDidUpdate(prevProps): void {
    const { error } = this.props
    if (error && error !== prevProps.error) {
      this.handleError()
    }
  }

  handleIncrementPress = (): void => {
    this.props.increment()
  }

  handleResetPress = (): void => {
    this.props.reset()
  }

  handleRandomPress = (): void => {
    this.props.requestRandomNumber()
  }

  handleForceErrorPress = (): void => {
    this.props.requestRandomNumber()
  }

  handleError = (): void => {
    console.log('Error')
  }

  render(): Component {
    return (
      <div style={styles.container}>
        {!this.props.isLoading &&
            <>
              <Button
                variant='contained'
                color='secondary'
                onClick={this.handleIncrementPress}
                style={styles.linkButton}

              >
                {this.props.counter}
              </Button>

              <Button
                variant='outlined'
                color='default'
                onClick={this.handleResetPress} 
                style={styles.linkButton}
              >
                Reset
              </Button>

              <Button
                variant='outlined'
                color='default'
                onClick={this.handleRandomPress} 
                style={styles.linkButton}
              >
                Random
              </Button>

              <Button
                variant='outlined'
                color='default'
                onClick={this.handleForceErrorPress}
                style={styles.linkButton}
              >
                Force Error
              </Button>
          </>
        }

        {this.props.isLoading && <CircularProgress size={80} color='secondary' />}  
      </div>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  counter: {
    color: 'white',
    textAlign: 'center',
  },
  linkButton: {
    width : 300,
    marginBottom: 10,
  },
}
```

##### Container

O **Container** é responsavel por `connectar()` o componente View ao Redux.

O `connect()` recebe dois argumentos, primeiro `mapStateToProps` que seleciona partes relevantes do estado da aplicação por meio dos `selectors` e passa para view. E o segundo, que liga os Actions Creator ao dispatcher da store, para que as ações possam ser executadas em seus devidos contextos.

Toda vez que o estado do app muda, o Container é automaticamente chamado com a último atualização do estado. Se as props retornadas pelo container serem diferentes das props anteriores a estas, a View que está conectada ao Container é re-renderizada. Se as props forem idênticas, a view nao re-renderiza.

Continuando novamente o exemplo, o container deve ser bem simples:

```js
// example.container.js
import { connect } from 'react-redux'
import ExampleView from './example.view'
import {
  selectCount,
  selectLoading,
  selectError,
  increment,
  requestRandomNumber,
  reset,
} from './exemple.state'

const mapStateToProps = state => ({
  counter: selectCount(state),
  isLoading: selectLoading(state),
  error: selectError(state),
})

const mapActionsToProps = {
  requestRandomNumber,
  increment,
  reset,
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ExampleView)
```

Normalmente esse arquivo não contém muito código, mas ainda sim é importante definir o Container em um arquivo separado para que se possa dar suporte a implementações específicas de plataformas, assim como testes das Views e seus dados ligados separadamente.

Se uma View necessita de dados de outros módulos, (i.e. outras partes do estado da aplicação que não esteja na subárvore gerenciada por esse módulo), o Container é o lugar correto para acessá-lo. Por meio de seus devidos `selectors`. Em uma linguagem de banco de dados, deste modo é mantido os dados "normalizados"(em certo grau). Podendo "juntá los" quando preciso.