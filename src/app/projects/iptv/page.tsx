import { getEnglishPlaylists } from "../../../utils/iptv";

const IPTV = async () => {
    await getEnglishPlaylists();

    return <p>hi</p>;
}

export default IPTV;