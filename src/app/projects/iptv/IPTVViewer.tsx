'use client';
import { useId, useState } from "react";
import { Media, MediaByGroupTitle } from "../../../types";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { alertsAtom } from "./atoms";

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
    const setAlerts = useSetAtom(alertsAtom);
    const searchParams = useSearchParams();

    const [currentMedia, setCurrentMedia] = useState<Media>(
        medias[searchParams.get('g') || '']?.find(media => media.name === searchParams.get('m')) ||
        medias.News.find(media => media.name.toLowerCase().includes('pittsburgh')) ||
        medias.News[0]
    );

    const onError = (e: any, data: any) => {
        console.log(e);
        console.log(data);

        setAlerts(prevAlerts => {
            return [
                ...prevAlerts,
                {
                    message: `Playback failed for channel ${currentMedia.name}`,
                    type: 'alert-error'
                }
            ]
        })
    }

    return (
        <div className="min-h-screen flex flex-col justify-start items-center mt-10 gap-5">
            <ReactPlayer
                url={currentMedia.location}
                width='90vw'
                height={'70vh'}
                controls={true}
                onError={onError}
            />
            <p>{currentMedia.name}</p>
            <ChannelSelect medias={medias} currentMedia={currentMedia} setCurrentMedia={setCurrentMedia} />
        </div>
    )
}

export default IPTVViewer;

interface ChannelSelectProps {
    medias: MediaByGroupTitle,
    currentMedia: Media,
    setCurrentMedia: (media: Media) => void
    className?: string
}
const ChannelSelect = ({ medias, currentMedia, setCurrentMedia, className }: ChannelSelectProps) => {
    const router = useRouter();

    const selectMedia = (media: Media, group: string) => {
        setCurrentMedia(media);
        router.replace(`?g=${group}&m=${media.name}`);
    }

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
                                    <summary>
                                        {groupTitle}
                                        {medias[groupTitle].find(media => media.name === currentMedia.name) && <div className="badge badge-success badge-sm rounded-full" />}
                                    </summary>
                                    <ul className="w-60">
                                        {
                                            medias[groupTitle].map(media => {
                                                const id = useId();
                                                return (
                                                    <li key={id} onClick={() => selectMedia(media, groupTitle)}>
                                                        <a className="whitespace-pre-wrap">
                                                            {media.name}
                                                            {currentMedia.name === media.name && <div className="badge badge-success badge-sm rounded-full" />}
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