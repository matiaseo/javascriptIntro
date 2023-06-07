;(() => {

const getRandomTraits = () => [
    { name: Math.random().toString(36).replace(/\.|\d/g,''), type: ['quiet', 'annoying'][(Math.random()<.5)|0] },
    { name: Math.random().toString(36).replace(/\.|\d/g,''), type: ['quiet', 'annoying'][(Math.random()<.5)|0] },
    { name: Math.random().toString(36).replace(/\.|\d/g,''), type: ['quiet', 'annoying'][(Math.random()<.5)|0] },
].slice(0, Math.round(1 + Math.random()*2))
const predefinedCats = Array(8).fill(0).map(()=>({
    name: Math.random().toString(36).replace(/\.|\d/g,''),
    breed: Math.random().toString(36).replace(/\.|\d/g,''),
    age: Math.round(Math.random()*20),
    size: Math.random().toString(36).replace(/\.|\d/g,''),
    picture: 'https://cataas.com/cat/CVB6GXU26EYzCldX?width=96&height=96',
    traits: getRandomTraits(),
    cardColor: '#'+Math.random().toString(16).slice(2,5)
}))

const cats = [{
    name: 'Raiz',
    breed: 'black',
    age: 1,
    size: 'large',
    picture: 'https://cataas.com/cat/CVB6GXU26EYzCldX?width=96&height=96',
    traits: [
        { name: 'sleepy', type: 'quiet' },
        { name: 'grumpy', type: 'annoying' }
    ]
}]

// concat
const allCats = cats.concat(predefinedCats)
renderList("All cats", allCats)

// filter
const olderCats = allCats.filter(({age}) => age > 20)
renderList("Filter older cats", olderCats)

// every
const quietCats = allCats.filter(({traits}) => traits.every(()=>true))
renderList("Filter cats with all quiet traits", quietCats)

// some

// find

// map

// slice

// sort

// reduce

})()