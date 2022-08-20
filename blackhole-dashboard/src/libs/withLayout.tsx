const withLayout = (Component: any, Layout: any) => {
  const Test = (props: any) => {
    return (
      <Layout>
        <Component />
      </Layout>
    );
  };
  return Test;
};

export default withLayout;
