'use strict'

import { load } from './helper/lazy'
import { query } from './helper/query'

const observer = new IntersectionObserver(changes => {
  changes.forEach(change => {
    // Edge 15 doesn't support isIntersecting, but we can infer it
    // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/12156111/
    // https://github.com/WICG/IntersectionObserver/issues/211
    const isIntersecting = (typeof change.isIntersecting === 'boolean')
      ? change.isIntersecting : change.intersectionRect.height > 0
    if (isIntersecting) {
      // Stop observing the current target
      observer.unobserve(change.target)

      load(change.target)
    }
  })
}
)

query('.lazy').forEach(function (item) {
  observer.observe(item)
})
