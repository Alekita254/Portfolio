import Meta from "../components/SEO/Meta";
import WorkspaceIntro from "../components/intro/WorkspaceIntro";

// const TRACKING_ID = process.env.NEXT_PUBLIC_TRACKING_ID;
// ReactGA.initialize(TRACKING_ID);

function App() {
  return (
    <>
      <Meta />
      <WorkspaceIntro />
    </>
  )
}

export default App;
