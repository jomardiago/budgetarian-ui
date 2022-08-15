type LayoutProps = {
  children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
  return <div className="w-[90%] mx-auto">{props.children}</div>;
};

export default Layout;
