import React, { useContext } from "react";
import useFormValidation from "../Auth/useFormValidation";
import validateCreateLink from "../Auth/validateCreateLink";
import { FirebaseContext } from "../../firebase";
const INITIAL_STATE = {
  description: "",
  url: ""
};

function CreateLink(props) {
  const { firebase, user } = useContext(FirebaseContext);

  const { handleSubmit, handleChange, values, errors } = useFormValidation(
    INITIAL_STATE,
    validateCreateLink,
    handleCreateLink
  );
  function handleCreateLink() {
    if (!user) {
      props.history.push("/login");
    } else {
      const { url, description } = values;
      const newLink = {
        url,
        description,
        postedBy: {
          id: user.uid,
          name: user.displayName
        },
        votes: [],
        comments: [],
        created: Date.now()
      };
      firebase.db.collection("links").add(newLink);
      props.history.push("/");
    }
    console.log("link created");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="description"
        type="text"
        placeholder="A description for your link"
        autoComplete="off"
        onChange={handleChange}
        values={values.description}
        className={errors.description && "error-input"}
      />
      {errors.description && <p className="error-text">{errors.description}</p>}
      <input
        name="url"
        type="url"
        placeholder="A url for the link"
        autoComplete="off"
        onChange={handleChange}
        values={values.url}
        className={errors.url && "error-input"}
      />
      {errors.url && <p className="error-text">{errors.url}</p>}

      <button className="button" type="submit">
        {"Submit"}
      </button>
    </form>
  );
}

export default CreateLink;
