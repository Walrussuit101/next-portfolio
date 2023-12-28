import IPTVViewer from "./IPTVViewer";
import { getEnglishMediaByGroupTitle } from "../../../utils/iptv";
import AlertsToast from "./AlertsToast";

const IPTV = async () => {
    const medias = await getEnglishMediaByGroupTitle();

    return (
        <>
            <IPTVViewer medias={medias} />
            <AlertsToast />
        </>
    );
}

export default IPTV;