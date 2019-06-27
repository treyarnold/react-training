import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';

class Blog extends Component {
  state ={
    auth: true
  }
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li><NavLink to="/posts" exact>Posts</NavLink></li>
              <li><NavLink to={{
                pathname: '/new-post',
                hash: '#submit',
                search: '?quick-submit=true'
              }}>New Post</NavLink></li>
            </ul>
          </nav>
        </header>
        {/* <Route path="/" exact render={() => <h1>Home</h1>}/> */}
        <Switch>
          {this.state.auth? <Route path="/new-post" component={NewPost}/> : null}
          <Route path="/posts" component={Posts} />
          <Redirect from="/" to="/posts" />
          {/* <Route render={()=> <h1>Not Found</h1>} /> */}
        </Switch>
      </div>
    );
  }
}

export default Blog;