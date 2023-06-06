;(() => {
const predefinedCats = []

const cats = [{
    name: 'Raiz',
    breed: 'black',
    age: 1,
    size: 'large',
    picture: 'https://cataas.com/cat/CVB6GXU26EYzCldX?width=64&height=64',
    traits: [
        { name: 'sleepy', type: 'quiet' },
        { name: 'grumpy', type: 'annoying' }
    ]
}]

// concat
const allCats = cats.concat(predefinedCats)
renderList("All cats", allCats)

// filter
const olderCats = allCats.filter(({age}) => age > 5)
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