import React from "react";
import { Link } from "react-router-dom";
import distanceInWordsToNow from "date-fns/difference_in_hours";
import { getDayOfYear, differenceInHours } from "date-fns";
import { getDomain } from "../../utils";
function LinkItem({ link, index, showCount }) {
  console.log({ link });
  return (
    <div className="flex items-start mt2">
      <div className="flex items-center">
        {showCount && <span className="grey">{index}</span>}
        <div className="vote-button">{"\u2b06"}</div>
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
        </div>
      </div>
      LinkItem
    </div>
  );
}

export default LinkItem;
