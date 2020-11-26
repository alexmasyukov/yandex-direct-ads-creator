import React from 'react'
import { PageHeader, Layout } from 'antd'
import styles from './page.module.sass'
const { Content } = Layout

interface Props {
  children: React.ReactNode
  title: string
  subTitle: string
}

const PageLayout = ({
  children,
  title = '',
  subTitle = ''
}: Props) => {
  return (
    <Layout className={styles.siteLayout}>
      <PageHeader
        className={styles.pageHeader}
        onBack={() => null}
        title={title}
        subTitle={subTitle}
      />
      <Content style={{ margin: '0 16px' }}>
        <div
          className={styles.siteLayoutBackground}
          style={{ padding: 20, minHeight: '100%' }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  )
}

export default PageLayout
