const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const settingButton = document.getElementById('settingsButton')

const maxRecords = 151
let limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <div class="statWindow">
            <ol class="statsText">
                <li> HP : </li>
                <li> Attack : </li>
                <li> Defense : </li>
                <li> Sp.Atk : </li>
                <li> Sp.Def : </li>
                <li> Speed : </li>
            </ol>
            <ol class="statsValues">
                <li> ${pokemon.HP} </li>
                <li> ${pokemon.Attack} </li>
                <li> ${pokemon.Defense} </li>
                <li> ${pokemon.Sp_Atk} </li>
                <li> ${pokemon.Sp_Def} </li>
                <li> ${pokemon.Speed} </li>
        </ol>
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

settingButton.addEventListener('click', () => {
    
    limit = Number(window.prompt("Display quantity per load"))
})