import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import EndMessage from "./EndMessage";
const ImageList = (props) => {
  return (
    <div className="img-container">
      <InfiniteScroll
        dataLength={props.listImage.length}
        next={props.next}
        hasMore={props.hasMore}
        loader={props.loader}
        endMessage={<EndMessage />}
      >
        {props.listImage.map((e, index) => {
          return (
            <div
              className="img-wrapper ui card column"
              style={{
                width: "100%",
                margin: " 30px auto",
                minWidth: 350,
                maxWidth: 1000
              }}
              key={index}
              title={e.description}
            >
              <div className="content">
                {" "}
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  className="ui header"
                  href={e.links.html}
                  style={{ color: "#607d8b" }}
                >
                  <b>
                    {e.alt_description ? e.alt_description.toUpperCase() : null}
                  </b>
                </a>
                <p className="sub header" style={{ fontWeight: 400 }}>
                  Created by:{" "}
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href={e.user.links.html}
                    style={{ color: "#455a64" }}
                  >
                    {e.user.name}
                  </a>
                </p>
              </div>
              <div className="image" style={{ width: "100%", margin: "auto" }}>
                <a href={e.urls.full} target="_blank" rel="noopener noreferrer">
                  <img
                    src={e.urls.regular}
                    alt={e.alt_description}
                    style={{ width: "100%" }}
                  />
                </a>
              </div>

              <div className="content" id="img-bottom">
                <div className="left floated meta date">
                  {e.created_at.slice(0, 10)}
                </div>
                <span className="right floated">
                  <i className="heart outline like icon red"></i>
                  {e.likes} likes
                </span>{" "}
              </div>
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
};
export default ImageList;
