import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occured.</p>
      <p>
        <i>
          {(isRouteErrorResponse(error) && error.statusText) ||
            (error as Error).message}
        </i>
      </p>
    </div>
  );
}
