; (async () => {

async function getAPICats() {
    const response = await fetch("https://cataas.com/api/cats?&limit=20");
    return response.json();
}
const apiCats = (await getAPICats()).slice(10);

// const getRandomTraits = () => [
//     { name: Math.random().toString(36).replace(/\.|\d/g, ''), type: ['quiet', 'annoying'][(Math.random() < .5) | 0] },
//     { name: Math.random().toString(36).replace(/\.|\d/g, ''), type: ['quiet', 'annoying'][(Math.random() < .5) | 0] },
//     { name: Math.random().toString(36).replace(/\.|\d/g, ''), type: ['quiet', 'annoying'][(Math.random() < .5) | 0] },
// ].slice(0, Math.round(1 + Math.random() * 2))

// const predefinedCats = Array(10).fill(0).map(() => ({
//     name: Math.random().toString(36).replace(/\.|\d/g, ''),
//     breed: Math.random().toString(36).replace(/\.|\d/g, ''),
//     age: Math.round(Math.random() * 20),
//     size: Math.random().toString(36).replace(/\.|\d/g, ''),
//     picture: `https://cataas.com/cat/${apiCats[initCounter++]._id}?width=128&height=96`,
//     traits: getRandomTraits(),
//     cardColor: '#' + Math.random().toString(16).slice(2, 5)
// }))

const predefinedCats = [
    {
        name: 'El Pepe',
        breed: 'Aegean',
        age: 4,
        size: 'Big',
        picture: `https://cataas.com/cat/${apiCats[0]._id}?width=128&height=96`,
        adopted: true,
        traits: [{ name: 'grumpy', type: 'annoying' }, { name: 'sleepy', type: 'quiet' }, { name: 'fancy', type: 'quiet' }],
    },
    {
        name: 'Catistuta',
        breed: 'European Shorthair',
        age: 10,
        size: 'Large',
        picture: `https://cataas.com/cat/${apiCats[1]._id}?width=128&height=96`,
        adopted: false,
        traits: [{ name: 'energized', type: 'annoying' }, { name: 'fancy', type: 'quiet' }],
    },
    {
        name: 'Murphy',
        breed: 'Balinese',
        age: 9,
        size: 'Small',
        picture: `https://cataas.com/cat/${apiCats[2]._id}?width=128&height=96`,
        adopted: false,
        traits: [{ name: 'energized', type: 'annoying' }, { name: 'fancy', type: 'annoying' }],
    },
    {
        name: 'Peanut',
        breed: 'Egyptian Mau',
        age: 2,
        size: 'Large',
        picture: `https://cataas.com/cat/${apiCats[4]._id}?width=128&height=96`,
        adopted: true,
        traits: [{ name: 'lazy', type: 'quiet' }, { name: 'sleepy', type: 'quiet' }],
    },
    {
        name: 'Luna',
        breed: 'Arabian Mau',
        age: 8,
        size: 'Small',
        picture: `https://cataas.com/cat/${apiCats[5]._id}?width=128&height=96`,
        adopted: true,
        traits: [{ name: 'lazy', type: 'quiet' }, { name: 'sleepy', type: 'quiet' }],
    },
    {
        name: 'Homelander',
        breed: 'Highlander',
        age: 13,
        size: 'Medium',
        picture: `https://cataas.com/cat/${apiCats[6]._id}?width=128&height=96`,
        adopted: false,
        traits: [{ name: 'energized', type: 'annoying' }, { name: 'fancy', type: 'annoying' }, { name: 'prideful', type: 'annoying' }],
    },
    {
        name: 'Pavlov',
        breed: 'Persian',
        age: 7,
        size: 'Big',
        picture: `https://cataas.com/cat/${apiCats[7]._id}?width=128&height=96`,
        adopted: true,
        traits: [{ name: 'sleepy', type: 'quiet' }, { name: 'fancy', type: 'annoying' }, { name: 'shy', type: 'quiet' }],
    },
    {
        name: 'Koda',
        breed: 'Ragdoll',
        age: 15,
        size: 'Medium',
        picture: `https://cataas.com/cat/${apiCats[3]._id}?width=128&height=96`,
        adopted: true,
        traits: [{ name: 'sleepy', type: 'quiet' }, { name: 'shy', type: 'quiet' }, { name: 'grumpy', type: 'annoying' }],
    },
    {
        name: 'Mirio',
        breed: 'Siamese',
        age: 19,
        size: 'Big',
        picture: `https://cataas.com/cat/${apiCats[8]._id}?width=128&height=96`,
        adopted: true,
        traits: [{ name: 'sleepy', type: 'quiet' }, { name: 'energized', type: 'annoying' }],
    },
    {
        name: 'Michi',
        breed: 'Toyger',
        age: 22,
        size: 'Large',
        picture: `https://cataas.com/cat/${apiCats[9]._id}?width=128&height=96`,
        adopted: false,
        traits: [{ name: 'grumpy', type: 'annoying' }, { name: 'prideful', type: 'annoying' }],
    }
]
const cats = [{
    name: 'Raiz',
    breed: 'black',
    age: 1,
    size: 'Large',
    adopted: true,
    picture: 'https://cataas.com/cat/CVB6GXU26EYzCldX?width=128&height=96',
    traits: [
        { name: 'sleepy', type: 'quiet' },
        { name: 'grumpy', type: 'annoying' }
    ]
}]

renderList("First cat", cats)

// concat
const allCats = cats.concat(predefinedCats)
renderList("All cats, using concat()", allCats)

const youngerCats = allCats.filter(({age}) => age < 5)
renderList("Filter younger cats", youngerCats)

// every
const quietCats = allCats.filter(({traits}) => traits.every(({ type }) => type === 'quiet'))
renderList("Filter cats with all quiet traits", quietCats)

// some
const atLeastOneQuiet = allCats.filter(({traits}) => traits.some(({ type }) => type === 'quiet'))
renderList("Filter cats with at least one quiet trait", atLeastOneQuiet)

// find
const raiz = allCats.find(({name}) => name === 'Raiz')
renderList("Find cat by name", [raiz])

const blackCat = allCats.find(({breed}) => breed === 'black')
renderList("Find cat by breed", [blackCat])

    // find

const addColorByAge = ({ age, ...otherProperties }) => {
    const cardColor = age <= 2? '#fd6' : age < 9? '#4f7' : '#d7b'
    return {
        ...otherProperties,
        age,
        cardColor
    }
}

const colorCodedCats = allCats.map(addColorByAge)
renderList('Color-coded by age', colorCodedCats)

const renamedCats = colorCodedCats.map(cat => ({...cat, name: 'Garfield'}))
renderList('All Garfield cats', renamedCats)

// sort
const sortByAge = ({ age: age1 }, { age: age2 }) => age1 - age2
const sortedCats = colorCodedCats.slice().sort(sortByAge)
renderList('Cats sorted by Age', sortedCats)

// slice
const top3YoungestCats = sortedCats.slice(0, 3)
renderList('Top 3 youngest', top3YoungestCats)

const top3OldestCats = sortedCats.slice(-3).reverse()
renderList('Top 3 oldest', top3OldestCats)

// reduce
const averageAge = allCats.reduce(
        (accumulated, {age}) => accumulated + age
    , 0) / allCats.length
renderList(`Average cat age: ${averageAge}`, [])

const toCombinedCat = (output, cat) => ({
    ...output,
    ...cat,
    name: 'Schrodinger',
    breed: 'experimental',
    age: output.age + cat.age,
    traits: output.traits?.concat(cat.traits)
})
const combinedCat = colorCodedCats.reduce(toCombinedCat)

renderCat('Combined super-cat', combinedCat)

// Array.from Set
const getUniqueTraits = traits => {
    const traitNames = Array.from(new Set(traits.map(({name}) => name)))
    return traitNames.map(traitName => traits.find(({name}) => name === traitName))
}
const deduplicatedCombinedCat = {
    ...combinedCat,
    traits: getUniqueTraits(combinedCat.traits)
}

renderCat('Combined super-cat without duplicated traits', deduplicatedCombinedCat)


renderList('Bonus: Multicolor crazyness', allCats.map(
        cat => ({...cat, cardColor: `#${Math.random().toString(16).slice(2,5)}`}))
    )


})()