'use client';
import { useState } from "react";
import { Media, MediaByGroupTitle } from "../types";
import dynamic from "next/dynamic";

// lazy load <ReactPlayer/> on client
const ReactPlayer = dynamic(
    () => import('react-player'),
    { 
        ssr: false,
        loading: () => (
            <div className="bg-base-300 w-3/4 h-[500px] rounded flex justify-center items-center">
                <span className="loading loading-bars loading-md"></span>
            </div>
        )
    }
)

interface IPTVViewerProps {
    medias: MediaByGroupTitle
}
const IPTVViewer = ({ medias }: IPTVViewerProps) => {
    const [currentMedia, setCurrentMedia] = useState<Media>(medias.News[0]);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <ReactPlayer
                url={currentMedia.location}
                width='75%'
                height={500}
                controls={true}
                onError={(e, data) => console.log(e, data)}
            />
        </div>
    )
}

export default IPTVViewer;