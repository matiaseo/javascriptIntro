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

const resultContainer = document.querySelector('.resultContainer')

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
    const img = Object.assign(document.createElement('img'), {
        src: picture,
        className: 'catImage'
    })
    const duppedImage = Object.assign(document.createElement('img'), {
        src: picture,
        className: 'duppedImage'
    })
    const figcaption = Object.assign(document.createElement('figcaption'), {
        textContent: name
    })
    const breedSpan = Object.assign(document.createElement('span'), {
        textContent: 'Breed: '
    })
    const breedB = Object.assign(document.createElement('b'), {
        textContent: breed
    })
    const ageSpan = Object.assign(document.createElement('span'), {
        textContent: 'Age: '
    })
    const ageB = Object.assign(document.createElement('b'), {
        textContent: age
    })
    const sizeSpan = Object.assign(document.createElement('span'), {
        textContent: 'Size: '
    })
    const sizeB = Object.assign(document.createElement('b'), {
        textContent: size
    })

    const traitsContainer = Object.assign(document.createElement('div'), {
        className: 'traitsContainer'
    })
    traits.map(toTraitPill)
        .forEach(traitPill => traitsContainer.appendChild(traitPill))

    figure.appendChild(duppedImage)
    figure.appendChild(img)
    figure.appendChild(figcaption)
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
    breedSpan.appendChild(breedB)
    ageSpan.appendChild(ageB)
    sizeSpan.appendChild(sizeB)
    catCard.appendChild(figure)
    catCard.appendChild(breedSpan)
    catCard.appendChild(ageSpan)
    catCard.appendChild(sizeSpan)
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

const getStepResult = (title, result) => {
    const stepContainer = Object.assign(document.createElement('section'), {
        className: 'stepResultSectionContainer'
    })
    const titleElement = Object.assign(document.createElement('header'), {
        textContent: title,
        className: 'stepResultTitle'
    })
    const stepResultListContainer = Object.assign(document.createElement('ul'), {
        className: 'stepResultListContainer'
    })
    stepContainer.appendChild(titleElement)

    if(/string|number/.test(typeof result)) {
        stepContainer.appendChild(getTextResult(result))
    } else if(!([].concat(result || []))?.length) {
        stepContainer.appendChild(getNoContentElement())
    } else {
        [].concat(result || []).map(toCatCard)
            .forEach(catCard => stepResultListContainer.appendChild(catCard))
        stepContainer.appendChild(stepResultListContainer)
    }

    return stepContainer
}

Object.assign(window, {
    renderResult: (title, result=[]) => {
        resultContainer.insertAdjacentElement('afterbegin', getStepResult(title, result))
    }
})

})()