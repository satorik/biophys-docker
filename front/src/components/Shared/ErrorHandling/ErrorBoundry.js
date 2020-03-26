import FallbackComponent from './FallBackComponent'
import withErrorHandler from './withErrorHandler'

export default (Component) => withErrorHandler(
  FallbackComponent,
  Component
)
