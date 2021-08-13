import { globalStyles } from '../shared/styles'
import '../shared/edo_style.css'

const App = ({ Component, pageProps }) => (
  <>
    {globalStyles}
    <Component {...pageProps} />
  </>
)

export default App
