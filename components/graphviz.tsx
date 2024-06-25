"use client";
import dynamic from "next/dynamic";

const Graphviz = dynamic(() => import("graphviz-react"), { ssr: false });

export const GraphvizComponent = (props: { dot: string }) => {
  const options = { fit: true, height: 300, width: null, zoom: true  };

  return <Graphviz className="" dot={props.dot} options={options} />;
};
