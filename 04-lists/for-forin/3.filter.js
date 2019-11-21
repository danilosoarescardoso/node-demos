const { obterPessoas } = require("./service")

Array.prototype.meuFilter = function(callback) {
  const lista = []
  for (index in this) {
    console.log(this[index])
    const item = this[index]
    const result = callback(item, index, this)
    if (!result) continue
    lista.push(item)
  }
  return lista
}

async function main() {
  try {
    const { results } = await obterPessoas(`a`)
    // const familiaLars = results.filter(function(item){
    //     //por padrão, é necessário retornar boleano para manter ou remover da lista
    //     //false = remove da lista
    //     // true = mantem
    //     const result = item.name.toLowerCase().indexOf(`lars`) !== -1
    //     return result
    // })
    const familiaLars = results.meuFilter((item, index, lista) => {
      console.log(`index: ${index}`, lista.length)
      return item.name.toLowerCase().indexOf("lars") !== -1
    })
    const names = familiaLars.map(pessoa => pessoa.name)
    console.log(names)
  } catch (error) {
    console.error("DEU RUIM: ", error)
  }
}

main()
