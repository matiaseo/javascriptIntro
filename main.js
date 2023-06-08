;(() => {
    const resultContainer = document.querySelector('.resultContainer')

    const toTraitPill = ({ name, type }) => {
        return Object.assign(document.createElement('span'), {
            textContent: name,
            className: `${type}TraitPill`
        })
    }

    const toCatCard = ({ name, picture, breed, age, size, traits, cardColor }) => {
        const li = Object.assign(document.createElement('li'), {
            className: 'catCard'
        })
        if(cardColor) {
            li.style.setProperty('--cardColor', cardColor+'4')
            li.style.setProperty('--cardShadowColor', cardColor)
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

        figure.appendChild(duppedImage)
        figure.appendChild(img)
        figure.appendChild(figcaption)
        breedSpan.appendChild(breedB)
        ageSpan.appendChild(ageB)
        sizeSpan.appendChild(sizeB)
        li.appendChild(figure)
        li.appendChild(breedSpan)
        li.appendChild(ageSpan)
        li.appendChild(sizeSpan)
        li.appendChild(traitsContainer)
        return li
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
        const li = Object.assign(document.createElement('ul'), {
            className: 'stepResultSectionContainer'
        })
        const titleElement = Object.assign(document.createElement('header'), {
            textContent: title,
            className: 'stepResultTitle'
        })
        const stepResultListContainer = Object.assign(document.createElement('ul'), {
            className: 'stepResultListContainer'
        })
        li.appendChild(titleElement)
        list.map(toCatCard)
            .forEach(catCard => stepResultListContainer.appendChild(catCard))

        if(!list?.length) {
            li.appendChild(getNoContentElement())
        } else {
            li.appendChild(stepResultListContainer)
        }
        return li
    }

    Object.assign(window, {
        renderList: (title, list) => {
            resultContainer.insertAdjacentElement('afterbegin', getStepResult(title, list))
        },
        renderCat: (title, cat) => {
            resultContainer.insertAdjacentElement('afterbegin', getStepResult(title, [cat]))
        }
    })
})()