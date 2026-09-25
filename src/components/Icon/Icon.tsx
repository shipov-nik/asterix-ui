import React from "react";

export type SVGIconSvgrData = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
export type SVGReactComponent = React.Component<React.SVGProps<SVGSVGElement>>;
export type SVGIconStringData = string;

type SVGIconData = SVGIconSvgrData | SVGReactComponent | SVGIconStringData;

type IconProps = React.SVGAttributes<SVGElement> & {
  // data: JSX.Element;
  data: SVGIconData;
  size?: number | string;
};

export const Icon: React.FC<IconProps> = (props) => {
  const { data, size, ...attrs } = props;

  let w, h;

  if (size) {
    w = size;
    h = size;
  }

  // Parsing viewBox to get width and height in case they were not specified
  let viewBox: string | undefined;

  // SVG as React component
  if (typeof data === "function") {
    const el = data({}) as React.ReactElement<{ viewBox?: string }>;

    if (el) {
      viewBox = el.props.viewBox;
    }
  }

  if (viewBox && (!w || !h)) {
    const values = viewBox.split(/\s+|\s*,\s*/);

    if (!w) {
      w = values[2];
    }
    if (!h) {
      h = values[3];
    }
  }

  const localProps = {
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    width: w,
    height: h,
    fill: "currentColor",
    ...attrs,
  };

  // SVG as React component
  if (typeof data === "function") {
    return <svg {...localProps}>{data({}) as React.ReactElement}</svg>;
  }

  return <svg {...localProps} dangerouslySetInnerHTML={{ __html: data }} />;
};
