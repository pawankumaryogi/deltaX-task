import React from "react";
import "./Post.css";
import { Button } from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { deletePost } from "../../../actions/posts";
import useStyles from "./styles";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();

  const Likes = () => {
    if (post?.likes?.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const openPost = (e) => {
    // dispatch(getPost(post._id, history));

    history.push(`/posts/${post._id}`);
  };

  return (
    <>
      <div className="listbox">
        <h1>{post.title}</h1>
        <div className="cat-list">
          <div className="imagebox">
            <div>
              <img
                title={post.title}
                src={post.selectedFile}
                alt="Dil Jisse Zinda Hain - Jubin Nautiyal"
                style={{ width: "80px", height: "80px" }}
                className=" b-error"
              />
            </div>
            <div className="buttonn">
              {/* <div  name="edit"> */}
              <Button
                className="edit"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentId(post._id);
                }}
                style={{ color: "red" }}
                size="small"
              >
                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
                <MoreHorizIcon />
                &nbsp;
                <p>Edit</p>
              </Button>

              {/* </div> */}
              {/* <div className="delete"> */}
              {(user?.result?.googleId === post?.creator ||
                user?.result?._id === post?.creator) && (
                <Button
                  size="small"
                  style={{ color: "red" }}
                  onClick={() => dispatch(deletePost(post._id))}
                >
                  <DeleteIcon fontSize="small" /> &nbsp; <p>Delete</p>
                </Button>
              )}

              {/* </div> */}
            </div>
          </div>
          <div className="listbox-tags">
            <p>{post.message}</p>
            <h1>{post.tags} &#9734;</h1>
          </div>
        </div>
      </div>
    </>
    // <Card className={classes.card} raised elevation={6}>
    //   <ButtonBase
    //     component="span"
    //     name="test"
    //     className={classes.cardAction}
    //     onClick={openPost}
    //   >
    //     <CardMedia
    //       className={classes.media}
    //       image={
    //         post.selectedFile ||
    //         "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
    //       }
    //       title={post.title}
    //     />
    //     <div className={classes.overlay}>
    //       <Typography variant="h6">{post.name}</Typography>
    //       <Typography variant="body2">
    //         {moment(post.createdAt).fromNow()}
    //       </Typography>
    //     </div>
    //     {(user?.result?.googleId === post?.creator ||
    //       user?.result?._id === post?.creator) && (
    //       <div className={classes.overlay2} name="edit">
    //         <Button
    //           onClick={(e) => {
    //             e.stopPropagation();
    //             setCurrentId(post._id);
    //           }}
    //           style={{ color: "white" }}
    //           size="small"
    //         >
    //           <MoreHorizIcon fontSize="default" />
    //         </Button>
    //       </div>
    //     )}
    //     <div className={classes.details}>
    //       <Typography variant="body2" color="textSecondary" component="h2">
    //         {post.tags.map((tag) => `#${tag} `)}
    //       </Typography>
    //     </div>
    //     <Typography
    //       className={classes.title}
    //       gutterBottom
    //       variant="h5"
    //       component="h2"
    //     >
    //       {post.title}
    //     </Typography>
    //     <CardContent>
    //       <Typography variant="body2" color="textSecondary" component="p">
    //         {post.message.split(" ").splice(0, 20).join(" ")}...
    //       </Typography>
    //     </CardContent>
    //   </ButtonBase>
    //   <CardActions className={classes.cardActions}>
    //     <Button
    //       size="small"
    //       color="primary"
    //       disabled={!user?.result}
    //       onClick={() => dispatch(likePost(post._id))}
    //     >
    //       <Likes />
    //     </Button>
    //     {(user?.result?.googleId === post?.creator ||
    //       user?.result?._id === post?.creator) && (
    //       <Button
    //         size="small"
    //         color="secondary"
    //         onClick={() => dispatch(deletePost(post._id))}
    //       >
    //         <DeleteIcon fontSize="small" /> &nbsp; Delete
    //       </Button>
    //     )}
    //   </CardActions>
    // </Card>
  );
};

export default Post;
