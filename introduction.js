;(() => {
console.log('Script start')

const predefinedCats = [
    {
        name: 'El Pepe',
        breed: 'Aegean',
        age: 4,
        size: 'Big',
        picture: `https://cataas.com/cat/dPKnpfpGVMNgo0v1?width=128&height=96`,
        adopted: true,
        traits: [{ name: 'grumpy', type: 'annoying' }, { name: 'sleepy', type: 'quiet' }, { name: 'fancy', type: 'quiet' }],
    },
    {
        name: 'Catistuta',
        breed: 'European Shorthair',
        age: 10,
        size: 'Large',
        picture: `https://cataas.com/cat/dSC4Bs2XLcoYda45?width=128&height=96`,
        adopted: false,
        traits: [{ name: 'energized', type: 'annoying' }, { name: 'fancy', type: 'quiet' }],
    },
    {
        name: 'Murphy',
        breed: 'Balinese',
        age: 9,
        size: 'Small',
        picture: `https://cataas.com/cat/g1LZ81LWXJwFA54p?width=128&height=96`,
        adopted: false,
        traits: [{ name: 'energized', type: 'annoying' }, { name: 'fancy', type: 'annoying' }],
    },
    {
        name: 'Peanut',
        breed: 'Egyptian Mau',
        age: 2,
        size: 'Large',
        picture: `https://cataas.com/cat/iDrtyTcdOnAsgJzu?width=128&height=96`,
        adopted: true,
        traits: [{ name: 'lazy', type: 'quiet' }, { name: 'sleepy', type: 'quiet' }],
    },
    {
        name: 'Luna',
        breed: 'Arabian Mau',
        age: 8,
        size: 'Small',
        picture: `https://cataas.com/cat/oBeTvAQnCC3uAL0r?width=128&height=96`,
        adopted: true,
        traits: [{ name: 'lazy', type: 'quiet' }, { name: 'sleepy', type: 'quiet' }],
    },
    {
        name: 'Homelander',
        breed: 'Highlander',
        age: 13,
        size: 'Medium',
        picture: `https://cataas.com/cat/qGjZXT5LuroIo8B4?width=128&height=96`,
        adopted: false,
        traits: [{ name: 'energized', type: 'annoying' }, { name: 'fancy', type: 'annoying' }, { name: 'prideful', type: 'annoying' }],
    },
    {
        name: 'Pavlov',
        breed: 'Persian',
        age: 7,
        size: 'Big',
        picture: `https://cataas.com/cat/u1S16RJ8tmhFgJ1J?width=128&height=96`,
        adopted: true,
        traits: [{ name: 'sleepy', type: 'quiet' }, { name: 'fancy', type: 'annoying' }, { name: 'shy', type: 'quiet' }],
    },
    {
        name: 'Koda',
        breed: 'Ragdoll',
        age: 15,
        size: 'Medium',
        picture: `https://cataas.com/cat/v348KFCS15wsn8CH?width=128&height=96`,
        adopted: true,
        traits: [{ name: 'sleepy', type: 'quiet' }, { name: 'shy', type: 'quiet' }, { name: 'grumpy', type: 'annoying' }],
    },
    {
        name: 'Mirio',
        breed: 'Siamese',
        age: 19,
        size: 'Big',
        picture: `https://cataas.com/cat/0VlkBO6ValjaoeEw?width=128&height=96`,
        adopted: true,
        traits: [{ name: 'sleepy', type: 'quiet' }, { name: 'energized', type: 'annoying' }],
    },
    {
        name: 'Michi',
        breed: 'Toyger',
        age: 22,
        size: 'Large',
        picture: `https://cataas.com/cat/18T0wqXpU3OiGrUb?width=128&height=96`,
        adopted: false,
        traits: [{ name: 'grumpy', type: 'annoying' }, { name: 'prideful', type: 'annoying' }],
    }
]
const cat = {
    name: 'Raiz',
    breed: 'Siamese',
    age: 1,
    size: 'Large',
    adopted: true,
    picture: 'https://cataas.com/cat/CVB6GXU26EYzCldX?width=128&height=96',
    traits: [
        { name: 'sleepy', type: 'quiet' },
        { name: 'grumpy', type: 'annoying' }
    ]
}

renderResult("First cat", cat)

// concat
const allCats = predefinedCats.concat(cat)
renderResult("All cats, using concat()", allCats, cat)

const youngerCats = allCats.filter(({age}) => age < 5)
renderResult("Filter younger cats", youngerCats, allCats)

// every
const quietCats = allCats.filter(({traits}) => traits.every(({ type }) => type === 'quiet'))
renderResult("Filter cats with all quiet traits", quietCats, allCats)

// some
const atLeastOneQuiet = allCats.filter(({traits}) => traits.some(({ type }) => type === 'quiet'))
renderResult("Filter cats with at least one quiet trait", atLeastOneQuiet, allCats)

// find
const raiz = allCats.find(({name}) => name === 'Raiz')
renderResult("Find cat by name", raiz, allCats)

const siamese = allCats.find(({breed}) => breed === 'Siamese')
renderResult("Find cat by breed", siamese, allCats)

// map

const renamedCats = allCats.map(cat => ({...cat, name: 'Garfield'}))
renderResult('All Garfield cats', renamedCats, allCats)

const addColorByAge = ({ age, ...otherProperties }) => {
    const cardColor = age <= 2? 'fd6' : age < 9? '4f7' : 'd7b'
    return {
        ...otherProperties,
        age,
        cardColor: `#${cardColor}`
    }
}

const colorCodedCats = allCats.map(addColorByAge)
renderResult('Color-coded by age', colorCodedCats, allCats)

// sort
const sortByAge = ({ age: age1 }, { age: age2 }) => age1 - age2
const sortedCats = colorCodedCats.slice().sort(sortByAge)
renderResult('Cats sorted by Age', sortedCats, colorCodedCats)

// slice
const top3YoungestCats = sortedCats.slice(0, 3)
renderResult('Top 3 youngest', top3YoungestCats)

const top3OldestCats = sortedCats.slice(-3).reverse()
renderResult('Top 3 oldest', top3OldestCats)

// reduce
const averageAge = allCats.reduce(
        (accumulated, {age}) => accumulated + age
    , 0) / allCats.length
renderResult(`Average cat age`, averageAge)

const toCombinedCat = (output, cat) => ({
    ...cat,
    name: 'Schrodinger',
    breed: 'experimental',
    age: output.age + cat.age,
    traits: output.traits.concat(cat.traits)
})
const combinedCat = colorCodedCats.reduce(toCombinedCat, { age: 0, traits: [] })

renderResult('Combined super-cat', combinedCat, colorCodedCats)

// Array.from Set
const getUniqueTraits = traits => {
    const traitNames = Array.from(new Set(traits.map(({name}) => name)))
    return traitNames.map(traitName => traits.find(({name}) => name === traitName))
}
const deduplicatedCombinedCat = {
    ...combinedCat,
    traits: getUniqueTraits(combinedCat.traits)
}

renderResult('Combined super-cat without duplicated traits', deduplicatedCombinedCat, combinedCat)


renderResult('Bonus: Multicolor crazyness', allCats.map(
        cat => ({...cat, cardColor: `#${Math.random().toString(16).slice(2,5)}`}))
    , allCats)

console.log('Starting asynchronism code')

const dropAtMyHome = orderStatus => renderResult('Cat food delivered?', orderStatus)
getCatFood('Adult cat food', 2, dropAtMyHome)

const deliveryPromise = orderCatFoodWithPromise('Adult cat food', 8)

deliveryPromise // Pending
    .then(result => renderResult('Got the food!', result)) // Fulfilled
    .catch(reason => renderResult('Adult food order cancelled', reason)) // Rejected

const getCatFoodPromise = (type, quantity) => new Promise((resolve, reject) => {
    console.log('promise code start')
    if(checkCatFoodStock(type, quantity))
        resolve('Food delivered')
    else
        reject('Out of stock')
    reject('Out of stock 2')
    resolve('Out of stock 3')
    console.log('promise code end')
})

getCatFoodPromise('Kitten food', 8)
    .then(result => renderResult('Got the kitten food!', result))
    .catch(reason => renderResult('Kitten food order cancelled', reason))


fetch('http://localhost:2304/cats?limit=8')
    .then(response => response.json())
    .then(cats => renderResult('Fetch cats from local API', cats))


const fetchCats = async () => {
    console.log('Async function start')
    const response = await fetch('http://localhost:2304/cats?limit=16')
    const cats = await response.json()
    console.log('Async function end')
    return cats
}


const createCat = cat =>
    fetch('http://localhost:2304/cats', {
        method: 'post',
        body: JSON.stringify(cat)
    }).then(response => response.json())

const fetchCat = id =>
    fetch(`http://localhost:2304/cats/${id}`)
        .then(response => response.json())

createCat(deduplicatedCombinedCat)
    .then(({ id }) => fetchCat(id))
    .then(cat => renderResult('Fetch new cat', cat))


const updateCat = ({ id, ...otherProperties }) =>
    fetch(`http://localhost:2304/cats/${id}`, {
        method: 'put',
        body: JSON.stringify({ ...otherProperties })
    })

const handleCatChange = async cat => {
    await updateCat(cat)
    return fetchCats()
}

fetchCats()
    .then(cats => renderDynamicResult('Render updatable cats', cats, handleCatChange))

const deleteCat = id =>
    fetch(`http://localhost:2304/cats/${id}`, {
        method: 'delete'
    })

const fetchAllCats = () =>
    fetch('http://localhost:2304/cats')
        .then(response => response.json())

;(async () => {
    const beforeCats = await fetchAllCats()
    const { id } = beforeCats.find(({ name }) => name === 'Schrodinger')
    await deleteCat(id)
    const afterCats = await fetchAllCats()
    renderResult('All cats before/after deleting Schrodinger', afterCats, beforeCats)
})()

console.log('Script end')
})()