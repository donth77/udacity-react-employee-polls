import { useLocation, useNavigate, useParams } from "react-router-dom";

export function formatDate(timestamp) {
  const d = new Date(timestamp);
  const locale = navigator.language;
  const time = d.toLocaleString(locale, {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return `${time} | ${d.toLocaleDateString(locale)}`;
}

export const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};
