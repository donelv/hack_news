import { Route, Switch } from 'react-router-dom'
import './App.css'
import NewsPage from './components/NewsPage/NewsPage'
import StoryPage from './components/StoryPage/StoryPage'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path={'/'}
          render={() => {
            return <NewsPage />
          }}
        />
        <Route
          exact
          path={'/:newsId'}
          render={() => {
            return <StoryPage />
          }}
        />
        <Route
          exact
          path={'*'}
          render={() => {
            return <div>404 Страница не найдена</div>
          }}
        />
      </Switch>
    </div>
  )
}

export default App
