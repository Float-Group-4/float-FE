import React from 'react';
// import { useTranslation } from 'react-i18next';

import { Skeleton, SxProps, Typography } from '@mui/material';
// import i18next from 'i18next';

// import { getCurrentLang } from '@base/services/i18n';

interface SpanLangProps {
  keyLang: string;
  namespace?: string;
  className?: string;
  tag?: any;
  showKeyId?: boolean;
  key?: string;
  forID?: string;
  dataPos?: string;
  defaultText?: string;
  children?: React.ReactNode;
  sx?: SxProps;
  textOnly?: boolean;
}

const SpanLang = (props: SpanLangProps) => {
  const {
    keyLang,
    className,
    tag: Tag = 'span',
    showKeyId = true,
    key,
    forID,
    defaultText,
    dataPos,
    children,
    textOnly,
    sx,
    ...rest
  } = props;
  //user lang
  // const { t } = useTranslation();
  // const userLang = getCurrentLang();
  // const hasLang = i18next.hasResourceBundle && i18next.hasResourceBundle(userLang, 'translation');
  // const parse = () => {
  //   return defaultText && !i18next.exists(keyLang) ? defaultText : t(keyLang) || keyLang;
  // };
  // const attr: any = {
  //   className,
  //   key,
  //   //for: forID,
  //   htmlFor: forID
  // };
  // if (showKeyId === true) attr['data-lang-id'] = keyLang;
  // if (dataPos !== '') attr['data-pos'] = dataPos;
  // return (
  //   <>
  //     {textOnly ? (
  //       <span {...attr}>{parse()}</span>
  //     ) : (
  //       <Typography component={Tag} {...attr} sx={sx}>
  //         {children}
  //         {!hasLang && <Skeleton variant="text" sx={{ height: '12px', width: '100%' }} />}
  //         {hasLang && parse()}
  //       </Typography>
  //     )}
  //   </>
  // );
  return <Typography>{keyLang}</Typography>;
};

export default SpanLang;
