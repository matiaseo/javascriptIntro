; (async () => {

    async function getAPICats() {
        const response = await fetch("https://cataas.com/api/cats?&limit=10");
        return response.json();
    }
    const apiCats = await getAPICats();

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
    //     picture: `https://cataas.com/cat/${apiCats[initCounter++]._id}?width=96&height=96`,
    //     traits: getRandomTraits(),
    //     cardColor: '#' + Math.random().toString(16).slice(2, 5)
    // }))

    const predefinedCats = [
        {
            name: 'El Pepe',
            breed: 'Aegean',
            age: 4,
            size: 'Big',
            picture: `https://cataas.com/cat/${apiCats[0]._id}?width=96&height=96`,
            traits: [{ name: 'grumpy', type: 'annoying' }, { name: 'sleepy', type: 'quiet' }, { name: 'fancy', type: 'quiet' }],
        },
        {
            name: 'Catistuta',
            breed: 'European Shorthair',
            age: 10,
            size: 'Large',
            picture: `https://cataas.com/cat/${apiCats[1]._id}?width=96&height=96`,
            traits: [{ name: 'energized', type: 'annoying' }, { name: 'fancy', type: 'quiet' }],
        },
        {
            name: 'Murphy',
            breed: 'Balinese',
            age: 9,
            size: 'Small',
            picture: `https://cataas.com/cat/${apiCats[2]._id}?width=96&height=96`,
            traits: [{ name: 'energized', type: 'annoying' }, { name: 'fancy', type: 'annoying' }],
        },
        {
            name: 'Peanut',
            breed: 'Egyptian Mau',
            age: 2,
            size: 'Large',
            picture: `https://cataas.com/cat/${apiCats[4]._id}?width=96&height=96`,
            traits: [{ name: 'lazy', type: 'quiet' }, { name: 'sleepy', type: 'quiet' }],
        },
        {
            name: 'Luna',
            breed: 'Arabian Mau',
            age: 8,
            size: 'Small',
            picture: `https://cataas.com/cat/${apiCats[5]._id}?width=96&height=96`,
            traits: [{ name: 'lazy', type: 'quiet' }, { name: 'sleepy', type: 'quiet' }],
        },
        {
            name: 'Homelander',
            breed: 'Highlander',
            age: 13,
            size: 'Medium',
            picture: `https://cataas.com/cat/${apiCats[6]._id}?width=96&height=96`,
            traits: [{ name: 'energized', type: 'annoying' }, { name: 'fancy', type: 'annoying' }, { name: 'prideful', type: 'annoying' }],
        },
        {
            name: 'Pavlov',
            breed: 'Persian',
            age: 7,
            size: 'Big',
            picture: `https://cataas.com/cat/${apiCats[7]._id}?width=96&height=96`,
            traits: [{ name: 'sleppy', type: 'quiet' }, { name: 'fancy', type: 'annoying' }, { name: 'shy', type: 'quiet' }],
        },
        {
            name: 'Koda',
            breed: 'Ragdoll',
            age: 15,
            size: 'Medium',
            picture: `https://cataas.com/cat/${apiCats[7]._id}?width=96&height=96`,
            traits: [{ name: 'sleppy', type: 'quiet' }, { name: 'shy', type: 'quiet' }, { name: 'grumpy', type: 'annoying' }],
        },
        {
            name: 'Mirio',
            breed: 'Siamese',
            age: 19,
            size: 'Big',
            picture: `https://cataas.com/cat/${apiCats[8]._id}?width=96&height=96`,
            traits: [{ name: 'sleppy', type: 'quiet' }, { name: 'energized', type: 'annoying' }],
        },
        {
            name: 'Michi',
            breed: 'Toyger',
            age: 22,
            size: 'large',
            picture: `https://cataas.com/cat/${apiCats[9]._id}?width=96&height=96`,
            traits: [{ name: 'grumpy', type: 'annoying' }, { name: 'prideful', type: 'annoying' }],
        },
    ]

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
    const olderCats = allCats.filter(({ age }) => age > 20)
    renderList("Filter older cats", olderCats)

    // every
    const quietCats = allCats.filter(({ traits }) => traits.every(() => true))
    renderList("Filter cats with all quiet traits", quietCats)

    // some

    // find

    // map

    // slice

    // sort

    // reduce

})()