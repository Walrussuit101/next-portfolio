export interface BoidFieldBounds {
    x: number
    y: number
}

export interface EvoChainDisplay {
    name: string
    stage: number
}

export interface MediaByGroupTitle {
    [groupTitle: string]: Media[]
}

export interface Media {
    name: string
    location: string
}