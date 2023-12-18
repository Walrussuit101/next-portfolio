import IPTVViewer from "../../../components/IPTVViewer";
import { getEnglishMediaByGroupTitle } from "../../../utils/iptv";

const IPTV = async () => {
    const medias = await getEnglishMediaByGroupTitle();

    return <IPTVViewer medias={medias} />;
}

export default IPTV;