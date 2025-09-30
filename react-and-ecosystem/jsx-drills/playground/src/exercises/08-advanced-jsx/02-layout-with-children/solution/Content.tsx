import Layout from "./Layout";
import "./style.css"

const Content = () => {
  return (
    <Layout>
      <div className="content">
        <h2>Welcome!</h2>
        <p>
          This is the main content area. Add your text, cards, or other
          components here. The layout will stay consistent regardless of the
          content length.
        </p>
      </div>
    </Layout>
  );
};

export default Content;
