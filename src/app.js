import React from 'react'
import ReactDOM from 'react-dom'
import 'spectre.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Redirect } from 'react-router'
import './styles/style.scss'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'

import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Profile from './components/auth/Profile'

import StoryCreate from './components/stories/StoryCreate'
import StoriesShow from './components/stories/StoriesShow'
import Stories from './components/stories/Stories'
import StoryEdit from './components/stories/StoryEdit'

import Auth from './lib/Auth'

const App = () => {
    return (
        <BrowserRouter>
            <main>
                <Navbar />
                <Switch>
                    <Route path='/stories/new' component={StoryCreate} />
                    <Route path='/stories/:storyId/edit' component={StoryEdit} />
                    <Route path='/stories/:storyId' component={StoriesShow} />
                    <Route path='/stories' component={Stories} />
                    <Route path='/profile' component={Profile} />
                    <Route path='/register' component={Register} />
                    <Route exact path="/" render={() => (
                        Auth.isAuthenticated() ? (
                            <Redirect to="/profile" />
                        ) : (
                                <Login />
                            )
                    )} />
                </Switch>
                <Footer />
            </main>
        </BrowserRouter>
    )
}
ReactDOM.render(
    <App />,
    document.getElementById('root')
)
