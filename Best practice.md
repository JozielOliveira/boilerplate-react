# Guia de boas práticas

## Nomenclatura

### Variáveis

- `constantes` NOME_DA_VARIAVEL
- `comuns` nomeDaVariavel
- `classes` NomeDaClasse

### Métodos

- `arrow function com retorno direto` 
    ```js 
    () => "retornado esta string diretamente"
    ```
- `arrow function com retorno`
    ```js
    () => {
        const hello = 'olá'
        return `${hello} retornando string concatenada`
    }
    ```
- `arrow function com unico parametro` 
    ```js 
    param => para + 2
    ```

### Branches

O nomes das branches seguem o padrão do GitFlow e são criadas usando
preferencialmente o nome em inglês.

- novas funcionalidades começando com `feature/` (ex: `feature/contribution-guide`)
- correções começando com `fix/` (ex: `fix/password-validation`)
- refatorações começando com `refactor/` (ex: `refactor/login-view`)
- releases começando com `release/`, seguido com o número da versão (ex: `release/v1.1.34`)
- correções de versões em produção começando com `hotfix/` (ex: `hotfix/login-error`)

### Commits

1. Limitar o título do commit a 50 caracteres
2. Usar verbos no imperativo para compor o título (ex: `add initial contribution guide`)

Exemplo:

```sh
git commit -m "fix typo in introduction to user guide"
```

### Pastas e arquivos

A convenção dos nomes das pastas e dos arquivos é utilizar tudo minúsculo
e as palavras separadas por hífen:

```sh
module
└─┬ vending-machines
  ├── vending-machines.state.js
  ├── vending-machines.view.js
  └── vending-machines.container.js
```

#### Arquivos de testes

Os arquivos de testes ficam dentro da pasta \_\_tests\_\_ do próprio componente.
É criado um arquivo \*.spec.js para cada arquivo que for testado:

```sh
module
└─┬ vending-machines
  ├─┬ __tests__
  │ ├── vending-machines.state.spec.js
  │ ├── vending-machines.view.spec.js
  │ └── vending-machines.container.spec.js
  ├── vending-machines.state.js
  ├── vending-machines.view.js
  └── vending-machines.container.js
```

## Testes

### Jest

#### Mock de endpoints

### Enzyme

## Boas Práticas

### Regras Básicas

- Apenas **um** componente por arquivo.

  - Contudo, múltiplos componentes são permitidos quando são dependentes um do outro e apenas 1 tem retorno [Statefull ou Stateless ](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions) são permitidos por arquivo. eslint: [`react/no-multi-comp`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-multi-comp.md#ignorestateless).

  ```jsx
  function Hello(props) {
    return <div>Hello {props.name}</div>
  }

  export default class HelloWorld extends Component {
    render() {
      return <Hello name="World" />
    }
  }
  ```

- Sempre use a sintaxe JSX.

* Use arrow functions para variáveis locais.

  ```jsx
  function ItemList(props) {
    return (
      <div>
        {props.items.map((item, index) => (
          <Item key={item.key} onPress={() => fazerAlgoCom(item.name, index)} />
        ))}
      </div>
    )
  }
  ```

* Use arrow function para atribuição as funções do classe:

  ```jsx
  // ruim
  class Example extends Component {
    handleButtonPress() {
      // do stuff
    }

    render() {
      return <Button onClick={this.handleButtonPress.bind(this)} />
    }
  }

  // ruim
  class Example extends Component {
    constructor(props) {
      super(props)

      this.handleButtonPress = this.handleButtonPress.bind(this)
    }

    handleButtonPress() {
      // do stuff
    }

    render() {
      return <Button onClick={this.handleButtonPress} />
    }
  }

  // ruim
  class Example extends Component {
    handleButtonPress = () => {
      // do stuff
    }

    render() {
      return <Button onClick={this.handleButtonPress} />
    }
  }
  ```

### Ordernação das funções dentro dos componentes

- para `class extends Component`:

  1.  métodos `static` opcionais
  2.  `constructor`
  3.  `getChildContext`
  4.  `componentWillMount`
  5.  `componentDidMount`
  6.  `shouldComponentUpdate`
  7.  `componentWillUpdate`
  8.  `componentDidUpdate`
  9.  `componentWillUnmount`
  10. _clickHandlers ou eventHandlers_ como `handleClickSubmit()` or `handleChangeDescription()`
  11. _métodos getter para `render`_ como `getSelectReason()` or `getFooterContent()`
  12. _métodos `render` opcionais_ como `renderNavigation()` or `renderProfilePicture()`
  13. `render`

## Estrutura de diretórios

```sh
app
├── components
├── modules
├── redux
├── services
├── themes
└── utils
```

### Components

```sh
components
├── button
├── text
└─┬ text-field
  ├── __tests__
  ├── index.js
  └── text-field.js
└─ index.js

```

### Modules

```sh
modules
└─┬ home
  ├── __tests__
  ├── home.container.js
  ├── home.state.js
  └── home.view.js
```

### Redux

```sh
redux
├── reducer.js
└── store.js
```

### Services

```sh
services
├─┬ api
│ ├─┬ authentication
│ │ ├── __mocks__
│ │ ├── __tests__
│ │ ├── authentication.js
│ │ └── index.js
│ ├── products
│ └── users
└── storage
```

### Themes

```sh
themes
├── colors.js
├── pallete.js
├── spacing.js
├── media.js
└── index.js

```

### Utils

```sh
utils
├── date.js
├── money.js
├── number.js
├── string.js
└── index.js
```