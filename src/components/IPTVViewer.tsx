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
            <div className="bg-base-300 w-[90vw] h-[70vh] rounded flex justify-center items-center">
                <span className="loading loading-bars loading-md"></span>
            </div>
        )
    }
)

interface IPTVViewerProps {
    medias: MediaByGroupTitle
}
const IPTVViewer = ({ medias }: IPTVViewerProps) => {
    const [currentMedia, setCurrentMedia] = useState<Media>(
        medias.News.find(media => media.name.toLowerCase().includes('pittsburgh')) ||
        medias.News[0]
    );

    return (
        <div className="min-h-screen flex flex-col justify-start items-center mt-10 gap-5">
            <ReactPlayer
                url={currentMedia.location}
                width='90vw'
                height={'70vh'}
                controls={true}
                onError={(e, data) => console.log(e, data)}
            />
            <p>{currentMedia.name}</p>
            <ChannelSelect medias={medias} setCurrentMedia={setCurrentMedia}/>
        </div>
    )
}

export default IPTVViewer;

interface ChannelSelectProps {
    medias: MediaByGroupTitle,
    setCurrentMedia: (media: Media) => void
    className?: string
}
const ChannelSelect = ({ medias, setCurrentMedia, className }: ChannelSelectProps) => {
    return (
        <div className={`dropdown dropdown-top ${className}`}>
            <div tabIndex={0} role="button" className="btn w-72 btn-lg bg-base-300">Channel Select</div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu bg-base-300 max-h-[60vh] overflow-y-scroll flex-nowrap w-72">
                {
                    Object.keys(medias).map(groupTitle => {
                        return (
                            // sub menus for each grouptitle, ex: News, Religion, etc.
                            // each sub menu for each grouptitle has selectable medias
                            <li key={`sub-menu-${groupTitle}`}>
                                <details>
                                    <summary>{groupTitle}</summary>
                                    <ul className="w-60">
                                        {
                                            medias[groupTitle].map(media => {
                                                return (
                                                    <li key={`channel-${media.name}`} onClick={() => setCurrentMedia(media)}>
                                                        <a className="whitespace-pre-wrap">
                                                            {media.name}
                                                        </a>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </details>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}