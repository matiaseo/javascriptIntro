;(() => {
    const resultContainer = document.querySelector('.resultContainer')

    const productsUrl = 'https://unqctexfi6z2hc4is5sitgbvxy0gmbjz.lambda-url.us-east-2.on.aws/'
    let products = []
    const toProductCard = ({ name, description, price, image }) => {
        const li = document.createElement('li')
        const figure = document.createElement('figure')
        const img = Object.assign(document.createElement('img'), {
            src: image,
            className: 'productImage'
        })
        const duppedImage = Object.assign(document.createElement('img'), {
            src: image,
            className: 'duppedImage'
        })
        const figcaption = Object.assign(document.createElement('figcaption'), {
            textContent: name
        })
        const span = Object.assign(document.createElement('span'), {
            textContent: description,
            className: 'productDescription'
        })
        const b = Object.assign(document.createElement('b'), {
            textContent: `$${price}`,
            className: 'price'
        })
        figure.appendChild(duppedImage)
        figure.appendChild(img)
        figure.appendChild(figcaption)
        li.appendChild(figure)
        li.appendChild(span)
        li.appendChild(b)
        return li
    }
    const renderProducts = products => {
        resultContainer.innerHTML = ''
        products.map(toProductCard)
            .forEach(productCard => {
                resultContainer.appendChild(productCard)
            });
    }
    // (async () => {
    //     renderProducts(products = await (await fetch(productsUrl)).json())
    // })()


    const toTraitPill = ({ name, type }) => {
        return Object.assign(document.createElement('span'), {
            textContent: name,
            className: `${type}TraitPill`
        })
    }

    const toCatCard = ({ name, picture, breed, age, size, traits, cardColor }) => {
        const li = document.createElement('li')
        if(cardColor) li.style.setProperty('--cardColor', cardColor)
        const figure = document.createElement('figure')
        const img = Object.assign(document.createElement('img'), {
            src: picture,
            className: 'productImage'
        })
        const duppedImage = Object.assign(document.createElement('img'), {
            src: picture,
            className: 'duppedImage'
        })
        const figcaption = Object.assign(document.createElement('figcaption'), {
            textContent: name
        })
        const breedSpan = Object.assign(document.createElement('span'), {
            textContent: breed
        })
        const ageSpan = Object.assign(document.createElement('span'), {
            textContent: age
        })
        const sizeSpan = Object.assign(document.createElement('span'), {
            textContent: size
        })

        const traitsContainer = document.createElement('div')
        traits.map(toTraitPill)
            .forEach(traitPill => traitsContainer.appendChild(traitPill))

        figure.appendChild(duppedImage)
        figure.appendChild(img)
        figure.appendChild(figcaption)
        li.appendChild(figure)
        li.appendChild(breedSpan)
        li.appendChild(ageSpan)
        li.appendChild(sizeSpan)
        li.appendChild(traitsContainer)
        return li
    }

    const getStepResult = (title, list) => {
        const li = document.createElement('li')
        const titleElement = Object.assign(document.createElement('div'), {
            textContent: title,
            className: 'stepResultTitle'
        })
        const ul = Object.assign(document.createElement('ul'), {
            className: 'stepResultContainer'
        })
        li.appendChild(titleElement)
        list.map(toCatCard)
            .forEach(catCard => ul.appendChild(catCard))

        if(!list?.length)
            li.appendChild(Object.assign(document.createElement('span'), {
                textContent: 'What a CATastrophe! No cats to render'
            }))
        li.appendChild(ul)
        return li
    }

    Object.assign(window, {
        renderList: (title, list) => {
            resultContainer.appendChild(getStepResult(title, list))
        }
    })
})()