import xs, { Stream } from "xstream"
import {
    DOMSource,
    VNode,
    div
} from "@cycle/dom"
import hello, { Sinks as HelloSinks } from './hello'
import name , { Sinks as NameSinks  } from './name'

export interface Sources {
    DOM: DOMSource
}

export interface Sinks {
    DOM: Stream<VNode>
}

const app = (sources: Sources): Sinks => {
    const helloSinks = hello(sources)
    const nameSinks  = name(sources)
    const view$      = getView(helloSinks, nameSinks)
    return {
        DOM: view$
    }
}

const getView = (helloSinks: HelloSinks, nameSinks: NameSinks) => {
    return xs.combine(helloSinks.DOM, nameSinks.DOM).map(([helloDOM, nameDOM]) =>
        div([
            helloDOM,
            nameDOM
        ])
    )
}

export default app
