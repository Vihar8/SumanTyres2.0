import "./styles/index.scss";
import Layout from "./layouts/Layout";
import Landing from "./pages/Landing";
import { Box } from "@mui/material";
import LoaderCommon from "./commoncomponents/Loader/LoaderCommon";

function App() {
  return (
    <Layout>
      <Landing />
      <Box id='appCommonLoader'>
					<LoaderCommon />
      </Box>
    </Layout>
  );
}

export default App;
