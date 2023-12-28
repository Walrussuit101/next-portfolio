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

export interface Alert {
    message: string
    type: 'alert-info' | 'alert-success' | 'alert-warning' | 'alert-error'
}