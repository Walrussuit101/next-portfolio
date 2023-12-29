import IPTVViewer from "./IPTVViewer";
import { getEnglishMediaByGroupTitle } from "../../../utils/iptv";
import AlertsToast from "./AlertsToast";
import { Suspense } from "react";

const IPTVViewerFallback = (
    <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-bars loading-md"></span>
    </div>
)

const IPTV = async () => {
    const medias = await getEnglishMediaByGroupTitle();

    return (
        <>
            {/* <IPTVViewer/> uses useSearchParams(), need to wrap in suspense boundary to use static rendering on this route*/}
            <Suspense fallback={IPTVViewerFallback}>
                <IPTVViewer medias={medias} />
            </Suspense>
            <AlertsToast />
        </>
    );
}

export default IPTV;