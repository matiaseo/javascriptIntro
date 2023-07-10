;(() => {

const interpolateLinearValue = (value, minA, maxA, minB, maxB) =>
    minB + ((value - minA) * (maxB - minB)) / (maxA - minA)

const set3DRotationProperties = (card, mouseX, mouseY) => {
    const { width, height } = card.getBoundingClientRect()
    const rotateY = interpolateLinearValue(mouseX, 0, width, -30, 30)
    const rotateX = interpolateLinearValue(mouseY, 0, height, 30, -30)
    const brightness = 1.5 - (mouseY-height/2)*(mouseY-height/2)/(height*height/2)
        - (mouseX-width/2)*(mouseX-width/2)/(width*width/2)

    card.style.setProperty('--rotateX', `${rotateX}deg`)
    card.style.setProperty('--rotateY', `${rotateY}deg`)
    card.style.setProperty('--brightness', `${brightness}`)
}

const toTraitPill = ({ name, type }) => {
    return Object.assign(document.createElement('span'), {
        textContent: name,
        className: `${type}TraitPill`
    })
}

const toCatCard = ({ name, picture, breed, age, size, traits, cardColor, adopted }) => {
    const catCardContainer = Object.assign(document.createElement('li'), {
        className: 'catCardContainer'
    })
    catCardContainer.addEventListener('mousemove', ({ offsetX: mouseX, offsetY: mouseY }) => {
        set3DRotationProperties(catCardContainer, mouseX, mouseY)
    })

    const catCard = Object.assign(document.createElement('div'), {
        className: 'catCard'
    })
    if (cardColor) {
        catCard.style.setProperty('--cardColor', cardColor + '4')
        catCard.style.setProperty('--cardShadowColor', cardColor)
    }
    catCard.style.setProperty('--imageWidth', `128px`)

    const figure = document.createElement('figure')
    const img = picture && Object.assign(document.createElement('img'), {
        src: picture,
        className: 'catImage'
    })
    const duppedImage = picture && Object.assign(document.createElement('img'), {
        src: picture,
        className: 'duppedImage'
    })
    const figcaption = name && Object.assign(document.createElement('figcaption'), {
        textContent: name
    })
    const breedSpan = breed && Object.assign(document.createElement('span'), {
        textContent: 'Breed: '
    })
    const breedB = breed && Object.assign(document.createElement('b'), {
        textContent: breed
    })
    const ageSpan = age && Object.assign(document.createElement('span'), {
        textContent: 'Age: '
    })
    const ageB = age && Object.assign(document.createElement('b'), {
        textContent: age
    })
    const sizeSpan = size && Object.assign(document.createElement('span'), {
        textContent: 'Size: '
    })
    const sizeB = size && Object.assign(document.createElement('b'), {
        textContent: size
    })

    const traitsContainer = Object.assign(document.createElement('div'), {
        className: 'traitsContainer'
    })
    ;[].concat(traits || []).map(toTraitPill)
        .forEach(traitPill => traitsContainer.appendChild(traitPill))

    if(picture) figure.appendChild(duppedImage)
    if(picture) figure.appendChild(img)
    if(name) figure.appendChild(figcaption)
    catCard.appendChild(figure)
    if(adopted) {
        const adoptedContainer = Object.assign(document.createElement('div'), {
            className: 'adoptedContainer'
        })
        const adopted = Object.assign(document.createElement('span'), {
            textContent: '✓Adopted',
            className: 'adopted'
        })
        adoptedContainer.appendChild(adopted)
        figure.appendChild(adoptedContainer)
    }
    if(breed) breedSpan.appendChild(breedB)
    if(age) ageSpan.appendChild(ageB)
    if(size) sizeSpan.appendChild(sizeB)
    if(breed) catCard.appendChild(breedSpan)
    if(age) catCard.appendChild(ageSpan)
    if(size) catCard.appendChild(sizeSpan)

    catCard.appendChild(traitsContainer)
    catCardContainer.appendChild(catCard)
    return catCardContainer
}

const getTextResult = result => {
    const span = Object.assign(document.createElement('span'), {
        textContent: result,
        className: 'textResult'
    })
    return span
}

const getNoContentElement = () => {
    const container = Object.assign(document.createElement('div'), {
        className: 'noContent'
    })
    const span1 = Object.assign(document.createElement('span'), {
        textContent: 'What a CATastrophe!',
    })
    const span2 = Object.assign(document.createElement('span'), {
        textContent: 'No cats to render',
    })
    container.appendChild(span1)
    container.appendChild(span2)
    return container
}

const getStepResultContent = result => {
    try {
        if(/string|number|boolean/.test(typeof result)) {
            return getTextResult(result)
        } else if(!([].concat(result || []))?.length) {
            return getNoContentElement()
        } else {
            const stepResultListContainer = Object.assign(document.createElement('ul'), {
                className: 'stepResultListContainer'
            })
            ;[].concat(result).map(toCatCard)
                .forEach(catCard => stepResultListContainer.appendChild(catCard))
            return stepResultListContainer
        }
    } catch {
        return getNoContentElement()
    }
}

const getStepResult = (title, result, previous) => {
    const stepContainer = Object.assign(document.createElement('section'), {
        className: 'stepResultSectionContainer'
    })
    const titleElement = Object.assign(document.createElement('header'), {
        textContent: title,
        className: 'stepResultTitle'
    })
    const stepResultMainContainer = Object.assign(document.createElement('main'), {
        className: 'stepResultMainContainer'
    })
    
    const previousContainer = Object.assign(document.createElement('div'), {
        className: 'previousContainer'
    })
    const currentContainer = Object.assign(document.createElement('div'), {
        className: 'currentContainer'
    })

    stepContainer.appendChild(titleElement)

    stepResultMainContainer.appendChild(currentContainer)
    currentContainer.appendChild(getStepResultContent(result))

    stepResultMainContainer.appendChild(previousContainer)
    previousContainer.appendChild(getStepResultContent(previous))

    stepContainer.appendChild(stepResultMainContainer)
    previousContainer.classList.add('animated')

    return stepContainer
}

const resultContainer = document.querySelector('.resultContainer')

Object.assign(window, {
    renderResult: (title, result=[], previous=[]) => {
        console.log('Rendering', title)
        resultContainer.insertBefore(getStepResult(title, result, previous), document.querySelector('.stepResultSectionContainer,.historyTogglerLabel'))
    },
    getCatFood: async (type, quantity, callback) => {
        callback('Food delivered...')
        await Promise.resolve()
        callback('Calling the callback again?')
        callback('What\'s going on?')
    },
    checkCatFoodStock: (type, quantity) => ({'Adult cat food': 8, 'Kitten food': 4}[type] >= quantity),
    orderCatFoodWithPromise: (type, quantity) => new Promise((resolve, reject) => {
        if(checkCatFoodStock(type, quantity))
            resolve('Food delivered')
        else
            reject('Out of stock')
    })
})

})()