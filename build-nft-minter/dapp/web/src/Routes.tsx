// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Private } from '@redwoodjs/router'
import MainLayout from 'src/layouts/MainLayout/MainLayout'

const Routes = () => {
  return (
    <Router>
      <Private unauthenticated="home" wrap={[MainLayout]}>
        <Route path="/re-auth" page={ReAuthPage} name="reAuth" />
        <Route path="/assets" page={AssetsPage} name="assets" />
        <Route path="/tokens" page={TokensPage} name="tokens" />
      </Private>
      <Route path="/" page={HomePage} name="home" />

      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
