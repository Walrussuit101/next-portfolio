export const getPokemonIdFromURL = (url: string) => {
    const urlSplit = url.split('/');

    // id is last in the URL, but has a trailing slash, so length - 2 
    let id = urlSplit[urlSplit.length - 2];

    for (let i = id.length; i < 3; i++) {
        id = "0" + id;
    }

    return id;
}

export const splitDashResourceName = (stat: string) => {
    if (stat.indexOf('-') !== -1) {
        const split = stat.split('-');
        return split.join(' ');
    }

    return stat;
}

const typeHexMap = new Map([
    ['fire', '#EE8130'],
    ['water', '#6390F0'],
    ['electric', '#F7D02C'],
    ['grass', '#7AC74C'],
    ['ice', '#96D9D6'],
    ['fighting', '#C22E28'],
    ['poison', '#A33EA1'],
    ['ground', '#E2BF65'],
    ['flying', '#A98FF3'],
    ['psychic', '#F95587'],
    ['bug', '#A6B91A'],
    ['rock', '#B6A136'],
    ['ghost', '#735797'],
    ['dragon', '#6F35FC'],
    ['dark', '#705746'],
    ['steel', '#B7B7CE'],
    ['fairy', '#D685AD'],
])
export const getTypeColor = (type: string) => {
    const color = typeHexMap.get(type);

    if (color) return color;
    return '#FFFFFF';
}