"use client";
import dynamic from 'next/dynamic';

const Graphviz = dynamic(() => import('graphviz-react'), { ssr: false });

export const GraphvizComponent = (props: {dot: string}) => {
    const options = {fit: true, height: 300, width: 300, zoom: false};

    return (<Graphviz dot={props.dot} options={options} />);
}