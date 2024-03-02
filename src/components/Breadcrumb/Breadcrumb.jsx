import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {
  Link as RouterLink,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

const routes = [
  {
    path: "/",
    name: "Home",
    nested: null
  },
  {
    path: "/order",
    name: "Order",
    nested: null
  },
  {
    path: "/profile",
    name: "Profile",
    nested: null
  }
];

function ListItemLink(props) {
  const { to, open, ...other } = props;
  const primary = props.primary;

  let icon = null;
  if (open != null) {
    icon = open ? <ExpandLess /> : <ExpandMore />;
  }

  return (
    <li>
      <ListItemButton component={RouterLink} to={to} {...other}>
        <ListItemText primary={primary} />
        {icon}
      </ListItemButton>
    </li>
  );
}

ListItemLink.propTypes = {
  open: PropTypes.bool,
  to: PropTypes.string.isRequired,
};

function LinkRouter(props) {
  return <Link {...props} component={RouterLink} />;
}

function Page() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <LinkRouter underline="hover" color="inherit" to="/">
        Home
      </LinkRouter>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const route = routes.find(r => r.path === to);
        const name = route ? route.name : null;

        return last ? (
          <Typography color="text.primary" key={to}>
            {name}
          </Typography>
        ) : (
          <LinkRouter underline="hover" color="inherit" to={to} key={to}>
            {name}
          </LinkRouter>
        );
      })}
    </Breadcrumbs>
  );
}

export default function Breadcrumb() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: 360 }}>
      <Routes>
        <Route path="*" element={<Page />} />
      </Routes>
      <Box
        sx={{
          bgcolor: 'background.paper',
          mt: 1,
        }}
        component="nav"
        aria-label="mailbox folders"
      >
      </Box>
    </Box>
  );
}
