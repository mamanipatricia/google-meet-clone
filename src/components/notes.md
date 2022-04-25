# NOtes

dependencies:
    - clsx
    - Axios
    - 


Prettier
$ prettier . --check

# PRETTIER
formatear codigo
# LINT
 Code linting is a type of static analysis that is frequently used to find problematic patterns or code that doesn't adhere to certain style guidelines

# dependencies
- commit lint
https://github.com/conventional-changelog/commitlint

```shell
npm install --save-dev @commitlint/{config-conventional,cli}
```
`
rules: {
    'header-max-length': [0, 'always', 72],
`

0   -> desabilita el rule
1   -> considera como warning el rule y te deja pasar
2   -> considera como error el rule y no te deja pasar

always -> se aplica siempre
never  -> elimina/obvia la regla

72  -> el valor