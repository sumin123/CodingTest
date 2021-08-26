function solution(word, pages) {
    var answer = 0;
    var info = {};
    
    pages.forEach((page, idx) => {
        let basicScore = 0;
        // parse
        let regMeta = /(\<meta )[\s\S]+(content=)(?<url>\"[^"]+\")/;
        let regLink = /(a href=\")(?<link>[^\"\s]+)/g;
        let regText = /\>(?<text>[^\<]+)/g;
        let url = regMeta.exec(page).groups.url.split("\"")[1].trim();
        let linkTemp = page.match(regLink);
        let links = [];
        if (linkTemp)
            linkTemp.map(link => links.push(link.split('"')[1].trim()))
        let texts = page.match(regText);
        
        texts.map(text => {
            let result = text.toLowerCase().split(/[^a-z]/).filter(elem => elem !== '>' && elem !== '');
            basicScore += result.filter(element => element === word.toLowerCase()).length
        })

        info[url] = {'idx': idx, 'score': basicScore, 'total': basicScore, 'links': links}
    })
    for (const [url, pageinfo] of Object.entries(info)) {
        pageinfo.links.map(link => {
            if (info[link] !== undefined && pageinfo.links.length !== 0){
                info[link].total += pageinfo.score / pageinfo.links.length
            }
        })
    }
    let max = 0
    for (const [key, value] of Object.entries(info)) {
        if (value.total > max){
            max = value.total;
            answer = value.idx;
        }
    }
    return answer;
}