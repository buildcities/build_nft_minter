import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const MediaPage = () => {
  return (
    <>
      <MetaTags title="Media" description="Media page" />

      <h1>MediaPage</h1>
      <p>
        Find me in <code>./web/src/pages/MediaPage/MediaPage.tsx</code>
      </p>
      <p>
        My default route is named <code>media</code>, link to me with `
        <Link to={routes.media()}>Media</Link>`
      </p>
    </>
  )
}

export default MediaPage
