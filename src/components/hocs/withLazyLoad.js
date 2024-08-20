import React, { Suspense } from 'react';
const withLazyLoad = (Component) => (props) => {
  const lazyLoadFallback = () => (<h1>loading...</h1>)

  return (
    <Suspense fallback={lazyLoadFallback()}>
      <Component {...props} />
    </Suspense>
  )
}

export default withLazyLoad;