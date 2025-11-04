import React from 'react';

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
    src?: string;
};

export default function ApplicationLogo({ src = 'images/logo.png', alt = 'Application logo', ...rest }: Props) {
    return <img src={src} alt={alt} {...rest} />;
}
