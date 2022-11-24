import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import PostDetails from "./components/PostDetails/PostDetails";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Top10 from "./components/Posts/Top10";
import Form from "./components/Form/Form";
import Post from "./components/Posts/Post/Post";
import Posts from "./components/Posts/Posts";
const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const { posts, isLoading } = useSelector((state) => state.posts);

  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />

          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />
          {/* <Route
            path="/top10"
            exact
            // component={() => (!user ? <Auth /> : <Redirect to="/posts" />)}
            component={Top10}
          /> */}
          <Route
            path="/auth"
            exact
            component={() => (!user ? <Auth /> : <Redirect to="/posts" />)}
            // component={Top10}
          />

          <Route exact path="/top10">
            <Posts setCurrentId={setCurrentId} />
          </Route>

          {/* <Top10 post={post} setCurrentId={setCurrentId} /> */}
          <Route exact path="/add">
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Route>
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
