import React, { useState, useEffect } from 'react'
import {PageApi} from 'src/lib/api/page'
interface IPageProps {
}

const Page: React.FunctionComponent<IPageProps> = (props) => {
  useEffect(() => {
    // PageApi.getPagelist().subscribe(console.log)
    fetch('http://localhost:9999/api/page')
  }, [])

  return null;
};

export default Page;
