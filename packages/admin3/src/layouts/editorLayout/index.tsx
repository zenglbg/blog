import { PageHeader, Layout } from 'antd';
import * as React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

interface IEditorLayoutProps {}

const EditorLayout: React.FunctionComponent<IEditorLayoutProps> = ({ children }) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{'title'}</title>
        <meta name="description" content={'title'} />
      </Helmet>

      <Layout>
        <main className="main-container">{children}</main>
      </Layout>
    </HelmetProvider>
  );
};

export default EditorLayout;
