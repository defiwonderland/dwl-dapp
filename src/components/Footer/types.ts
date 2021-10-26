interface ItemLinks {
    id: string
    text: string,
    link: string
}

export interface CollapseLinkProps {
    title: string,
    content: ItemLinks[]
}