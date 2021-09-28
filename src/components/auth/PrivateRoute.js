import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { authContext } from "../../contexts/authContext";

function PrivateRoute({ component: Component, ...rest }) {
  const { loggedInUser } = useContext(authContext);

  return (
    <Route
      {...rest}
      render={(routeProps) => {
        // routeProps = match, location e history
        if (loggedInUser.user._id) {
          // Se o usuário estiver logado, renderize o componente passado como prop
          return <Component {...routeProps} />;
        } else {
          // Caso contrário, redirecione para o login
          return <Redirect to="/login" />;
        }
      }}
    />
  );
}

export default PrivateRoute;
