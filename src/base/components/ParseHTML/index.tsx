import React from 'react';

interface RawHtmlProps {
  htmlContent: string;
}

const RawHtml = (props: RawHtmlProps) => {
  const { htmlContent } = props;
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default RawHtml;
