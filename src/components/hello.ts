import xs, { Stream } from "xstream"
import {
    DOMSource,
    VNode,
    div,
    h1
} from "@cycle/dom"

export interface Sources {
    DOM: DOMSource
}

export interface Sinks {
    DOM: Stream<VNode>
}

interface Intent {
    inputEvent$: Stream<Event | null>
}

interface Model {
    hello$: Stream<string>
}

const hello = (sources: Sources): Sinks => {
    const intent = getIntent(sources.DOM)
    const model  = getModel(intent)
    const view$  = getView(model)
    return {
        DOM: view$
    }
}

const getIntent = (domSource: DOMSource) => {
    return {
        inputEvent$: xs.merge(xs.of(null), (<any>domSource.select('.name')).events('input') as Stream<Event>)
    }
}

const getModel = (intent: Intent) => {
    return {
        hello$: intent.inputEvent$.map(ev => ev == null ? '' : `Hello, ${(<HTMLInputElement>ev.currentTarget).value}!`)
    }
}

const getView = (model: Model) => {
    return model.hello$.map(hello =>
        div([
            h1(hello)
        ])
    )
}

export default hello
