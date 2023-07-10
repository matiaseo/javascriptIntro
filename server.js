const { createServer } = require('http')
const serverPort = process.env.PORT || 2304

const getSeedFromText = text => Array.from(text, char => char.charCodeAt(0)).reduce((output, charCode) => ~output * charCode)
const defaultSeed = getSeedFromText('The uncertainty of perception sways my mind into an abyss of paranoia')
const randomGenerator = (function*(value = defaultSeed){
        while(1) yield (value ^= value << 13, value ^= value >> 17, value ^= value << 5, value &= 0x7fffffff)
    })()
const getRandom = (min = 0, max = 2e9) => min + randomGenerator.next().value % max
const shuffleList = list => list.slice().sort(() => getRandom(-1,3))
const pickAtRandom = (list, count) =>
    !count? list[getRandom(0, list.length)|0]
    : [...new Set(
        Array(count).fill(0)
            .map(() => pickAtRandom(list))
    )].sort(({name:name1},{name:name2}) => name1.localeCompare(name2))

const catTraits = [{ "name": "grumpy", "type": "annoying" }, { "name": "gracious", "type": "quiet" }, { "name": "playful", "type": "annoying" }, { "name": "impulsive", "type": "annoying" }, { "name": "sleepy", "type": "quiet" }, { "name": "fancy", "type": "quiet" }, { "name": "energized", "type": "annoying" }, { "name": "lazy", "type": "quiet" }, { "name": "prideful", "type": "annoying" }, { "name": "shy", "type": "quiet" }]
const catBreeds = ['Aegean', 'European Shorthair', 'Balinese', 'Egyptian Mau', 'Arabian Mau', 'Highlander', 'Persian', 'Ragdoll', 'Siamese', 'Toyger']
const catSizes = ['Big', 'Large', 'Small', 'Medium']
const catIds = ['rV1MVEh0Af2Bm4O0','ZHrXPVRJniYPR6pp','2VgBUv9MaBwk5qnK','2bPYDRuvU70sbgja','AYJNTBAktmH3Q7ka','LTxlBUdATocntNid','MBpd0f7cDU5EwhZ9','MkRxexGVMQzEoN73','N6pTLrClzF83df8t','Rn6xqsiHb9B7qgLw','dPKnpfpGVMNgo0v1','dSC4Bs2XLcoYda45','g1LZ81LWXJwFA54p','iDrtyTcdOnAsgJzu','oBeTvAQnCC3uAL0r','qGjZXT5LuroIo8B4','u1S16RJ8tmhFgJ1J','v348KFCS15wsn8CH','0VlkBO6ValjaoeEw','18T0wqXpU3OiGrUb','4wziKEvjfJTzZ1cr','7kAJ3Huta4I97pm2','9tv4duwyYLVW7Mh8','AZbSpEWTWhEC1zm6','BHFMZUJydRxBQvQH','BT9cRBYDJp4WCjzi','CAJRBpyv9Hbe2Yuo','CFnG5UsD2WCxXJ4L','CODndL4wrdpotCAK','CVB6GXU26EYzCldX','DNSG9kP0H5HEKyh7','Hf4nZCCsXa884ILG','HrBUnl8Ee62dCTzA','PzJ1a9ff5dc3MHbu','Q6bmzUbFG2QBYd2r','TtPbFiGQtkY6dphA','WzDq91wE197vVcaQ','XnkePVQ4zPwxuTd8','Ye15Un1Dv53aXmws','ZA03c5umjj8RBIHV']
const catImages = shuffleList(catIds).map(id => `https://cataas.com/cat/${id}?width=128&height=96`)
const catNames = ['Langmuir', 'Planck', 'Curie', 'Lorentz', 'Einstein', 'Langevin', 'Guye', 'Wilson', 'Richardson', 'Debye', 'Knudsen', 'Bragg', 'Kramers', 'Dirac', 'Compton', 'DeBroglie', 'Born', 'Bohr', 'Piccard', 'Henriot', 'Ehrenfest', 'Herzen', 'Donder', 'Schrodinger', 'Verschaffelt', 'Pauli', 'Heisenberg', 'Fowler', 'Brillouin']
const cats = shuffleList(catNames).map(
    (name, index) => ({
        name,
        breed: pickAtRandom(catBreeds),
        age: getRandom(1,16),
        size: pickAtRandom(catSizes),
        picture: catImages[index],
        traits: pickAtRandom(catTraits, getRandom(1,3)),
        cardColor: '#'+getRandom().toString(16).slice(2,5),
        adopted: !getRandom(0,2)
    })
)
console.log(cats.map(({traits})=>traits.map(({name})=>name).sort()))

const parseQueryString = url =>
    [...url.matchAll(/(?:\?|&)(\w+=[^&]+)/g)]
        .map(([,parameter]) => parameter.split('='))
        .reduce((queryParams, [key, value]) => ({...queryParams, [key]: value}),{})

const parseBody = request => new Promise(resolve => {
    let body = ''
    request.on('data', chunk => {
            body = body.concat(chunk)
        }).on('end', () => {
            resolve(body)
        })
})

const jsonHeaders = { 'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*' }
const getOperation = method => ({
    GET: 'list',
    POST: 'create',
    PUT: 'update',
    DELETE: 'delete',
})[method]

const handleRequest = ({ operation, resource, queryString }, body) =>
    console.log(operation, resource, queryString, body)||
    resource?.[operation]?.(queryString)

const getResource = url => ({
    cat: {
        list: () => ({ status: 200, headers: jsonHeaders, data: cats}),
        create: () => ({ status: 200, headers: jsonHeaders, data: {asd:1}}),
        update: () => ({ status: 200, headers: jsonHeaders, data: {asd:1}}),
        delete: () => ({ status: 200, headers: jsonHeaders, data: {asd:1}})
    }
})[url.match(/^\/([^?]+)\??/)?.[1]]

const parseRequest = ({ url, method }) =>
    console.log(url, method) ||
    ({
        resource: getResource(url),
        operation: getOperation(method),
        queryString: parseQueryString(url)
    })

const addHeaders = (response, headers) =>
    (Object.entries(headers).forEach(([key, value]) => response.setHeader(key, value)), response)

const requestListener = async (request, response) => {
    const { status = 400, data, headers = jsonHeaders } =
        handleRequest(parseRequest(request), await parseBody(request)) ?? {}
    addHeaders(response, headers)
    response.statusCode = status
    response.end(data && JSON.stringify(data))
}

createServer(requestListener)
    .listen(serverPort, error=>console.log(error || 'listening at '+ serverPort))

// To run this with auto restart on crash:
// while true; do node server.js; done