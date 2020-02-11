import React, { useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { FirebaseContext } from "../../firebase";

import { differenceInHours } from "date-fns";
import { getDomain } from "../../utils";
function LinkItem({ link, index, showCount, history }) {
  const { firebase, user } = useContext(FirebaseContext);

  function handleVote() {
    if (!user) {
      history.push("/login");
    } else {
      // This line only gives you a reference
      // This is the basic pattern for updating.
      const voteRef = firebase.db.collection("links").doc(link.id);
      voteRef.get().then(doc => {
        if (doc.exists) {
          const previousVotes = doc.data().votes;
          const vote = {
            voteBy: {
              id: user.uid,
              name: user.displayName
            }
          };
          const updatedVotes = [...previousVotes, vote];
          voteRef.update({ votes: updatedVotes });
        }
      });
    }
  }
  function handleDeleteLink() {
    console.log({ link });
    const linkRef = firebase.db.collection("links").doc(link.id);
    linkRef
      .delete()
      .then(() => {
        console.log(`Document with ID ${link.id} deleted`);
      })
      .catch(err => {
        console.error(`Error deleting document ${err}`);
      });
  }

  const postedByAuthUser = user && user.uid == link.postedBy.id;
  return (
    <div className="flex items-start mt2">
      <div className="flex items-center">
        {showCount && <span className="grey">{index}</span>}
        <div className="vote-button" onClick={handleVote}>
          {"Vote \u2b06"}
        </div>
      </div>
      <div className="ml1">
        <div>
          {link.description}
          <span className="link">{getDomain(link.url)}</span>
        </div>
        <div className="f6 lh-copy grey">
          {link.votes.length} votes by {link.postedBy.name}{" "}
          {differenceInHours(Date.now(), link.created)} {" | "}
          <Link to={`/link/${link.id}`}>
            {link.comments.length > 0
              ? `${link.comments.length} comments`
              : "discuss"}
          </Link>
          {postedByAuthUser && (
            <>
              {"|"}{" "}
              <span className="delete-button" onClick={handleDeleteLink}>
                delete
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default withRouter(LinkItem);
