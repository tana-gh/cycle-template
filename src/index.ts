import { run } from '@cycle/run'
import app     from './components/app'
import drivers from './driver'
import '../assets/scss/style.scss'

run(app, drivers)
