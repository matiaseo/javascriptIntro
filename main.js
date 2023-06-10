;(() => {

const interpolatePosition = (value, minA, maxA, minB, maxB) =>
    minB + ((value - minA) * (maxB - minB)) / (maxA - minA)

const set3DRotation = (card, mouseX, mouseY) => {
    const rotateY = interpolatePosition(mouseX, 0, 180, -25, 25)
    const rotateX = interpolatePosition(mouseY, 0, 250, 25, -25)
    const brightness = interpolatePosition(mouseY, 0, 250, 1.5, .9)

    card.style.setProperty('--rotateX', `${rotateX}deg`)
    card.style.setProperty('--rotateY', `${rotateY}deg`)
    card.style.setProperty('--brightness', `${brightness}`)
}

const add3DEffect = card => {
    card.addEventListener('mousemove', ({ offsetX: mouseX, offsetY: mouseY }) => {
        set3DRotation(card, mouseX, mouseY)
    })
    card.addEventListener('mouseleave', () => {
        card.style.setProperty('--rotateX', '0deg')
        card.style.setProperty('--rotateY', '0deg')
        card.style.setProperty('--brightness', '1')
    })
}

const resultContainer = document.querySelector('.resultContainer')

const toTraitPill = ({ name, type }) => {
    return Object.assign(document.createElement('span'), {
        textContent: name,
        className: `${type}TraitPill`
    })
}

const toCatCard = ({ name, picture, breed, age, size, traits, cardColor }) => {
    const catCardContainer = Object.assign(document.createElement('li'), {
        className: 'catCardContainer'
    })

    const catCard = Object.assign(document.createElement('div'), {
        className: 'catCard'
    })
    if (cardColor) {
        catCard.style.setProperty('--cardColor', cardColor + '4')
        catCard.style.setProperty('--cardShadowColor', cardColor)
    }

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
    figcaption.style.setProperty('--imageWidth', `128px`)
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

    add3DEffect(catCardContainer)

    figure.appendChild(duppedImage)
    figure.appendChild(img)
    figure.appendChild(figcaption)
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

const getStepResult = (title, list) => {
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
    
    if(!list?.length) {
        stepContainer.appendChild(getNoContentElement())
    } else {
        list.map(toCatCard)
            .forEach(catCard => stepResultListContainer.appendChild(catCard))
        stepContainer.appendChild(stepResultListContainer)
    }

    return stepContainer
}

Object.assign(window, {
    renderResult: (title, list=[]) => {
        resultContainer.insertAdjacentElement('afterbegin', getStepResult(title, [].concat(list)))
    }
})

})()