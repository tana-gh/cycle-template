import xs, { Stream } from "xstream"
import {
    DOMSource,
    VNode,
    div,
    input
} from "@cycle/dom"

export interface Sources {
    DOM: DOMSource
}

export interface Sinks {
    DOM: Stream<VNode>
}

const name = (sources: Sources): Sinks => {
    const view$ = getView()
    return {
        DOM: view$
    }
}

const getView = () => {
    return xs.of(
        div([
            input('.name', { type: 'text' })
        ])
    )
}

export default name
