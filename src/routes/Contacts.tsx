import { Form, useLoaderData } from "react-router-dom";
import { getContact } from "../contacts";

type Contact = {
  first?: string;
  last?: string;
  avatar?: string;
  twitter?: string;
  notes?: string;
  favorite?: boolean;
};

export async function loader({ params }) {
  return getContact(params.contactId);
}

export function Contact() {
  const contact = useLoaderData() as Contact;
  if (!contact) {
    return null;
  }
  return (
    <div id="contact">
      <div>
        <img key={contact.avatar} src={contact.avatar || ""} alt="Avatar" />
      </div>
      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>
        {contact.twitter && (
          <p>
            <a href={`https://twitter.com/${contact.twitter}`} target="_blank">
              {contact.twitter}
            </a>
          </p>
        )}
        {contact.notes && <p>{contact.notes}</p>}
        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(e) => {
              if (!confirm("Please confirm you want to delete this record")) {
                e.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }) {
  let favorite = contact.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}
