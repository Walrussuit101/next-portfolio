export interface ProjectLink {
    link: string
    title: string
}

export interface ProjectMdxMeta {
    title: string
    links: ProjectLink[]
}

export interface BoidFieldBounds {
    x: number
    y: number
}