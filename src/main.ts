import './style.css'

const users: string[] = await fetch('./src/data/users.txt')
  .then(data => data.text())
  .then(txt => {
    return txt.split(',')
  })



const promises = await Promise.allSettled(
  users.map(async user => {
    return fetch(`https://api.github.com/users/${user}`)
      .then(res => {
        if (!res.ok) return
        return res.json()
      })

  })
)

console.log(validarUsuarios(promises as PromiseFulfilledResult<Object | undefined>[]))

function validarUsuarios(promise: PromiseFulfilledResult<Object | undefined>[]) {

  if (promise.every(promise => promise.value != undefined)) {
    return 'todos usuários ok'
  } else {
    let indexUsuariosInvalidos: number[] = []

    promise.forEach((promise, i) => {
      if (promise.value == undefined) {
        indexUsuariosInvalidos = [
          ...indexUsuariosInvalidos,
          i
        ]
      }
    })

    const usuariosInvalidos = indexUsuariosInvalidos.map(usuario => users[usuario])

    return `usuários não encontrados: ${usuariosInvalidos.join(', ')}`
    //((promise) => promise.value == undefined)
  }


}

