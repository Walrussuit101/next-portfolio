import { M3uParser } from "m3u-parser-generator";
import { MediaByGroupTitle } from "../../types";

export const getEnglishMediaByGroupTitle = async () => {
    // fetch m3u file and parse playlist data from it
    const res = await fetch('https://iptv-org.github.io/iptv/languages/eng.m3u');
    const playListRaw = await res.text();
    const parsedM3UPlaylist = M3uParser.parse(playListRaw);

    // organize playlist contents by group title
    // put all News media together, Sports, etc.
    const byGroupTitle: MediaByGroupTitle = {};

    for (let i = 0; i < parsedM3UPlaylist.medias.length; i++) {
        const media = parsedM3UPlaylist.medias[i];
        const groupTitleString = media.attributes["group-title"]

        // skip any media missing groupTitle attribute or a name
        if (groupTitleString === undefined || media.name === undefined) {
            continue;
        }

        const groupTitles = groupTitleString.split(';');

        for (let k = 0; k < groupTitles.length; k++) {
            const groupTitle = groupTitles[k];

            // if we've seen the groupTitle before, push
            if (groupTitle in byGroupTitle) {
                byGroupTitle[groupTitle].push({
                    name: media.name,
                    location: media.location
                });
            } else {
            // otherwise make a new array
                byGroupTitle[groupTitle] = [{
                    name: media.name,
                    location: media.location
                }];
            }
        }
    }

    return byGroupTitle;
}