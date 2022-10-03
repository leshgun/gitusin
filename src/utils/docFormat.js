// TODO: Code review need here
function relLinkToGlobal(data, url) {
	// const regex = /(\[[\w ]*\])\(\/?([\w/.?=]+)\)\]?\(?([\w/.?=]+)\)?/gi;
	// return data.replace(regex, `$1(${url}/$2?raw=true)`)
    const regExImg = /(!\[[\w\s]*\])\(\/?([\w/.?=]+)\)/gi;
    const regExLink = /(\[(?:[^\]\n\r]*)\])\(\/?([\w-/.?=]+)\)/gi;
    const regExScrollLink = /(\[(?:[^\]\n\r]*)\])\(#\/?([\w-]+)\)/gi;
    const regExImgLink = /(\[(?:[^\n\r]*)\])\(\/?([\w/.?=]+)\)/gi;
    data = data.replace(regExImg, `$1(${url}/$2?raw=true)`);
    data = data.replace(regExLink, `$1(${url}/$2)`);
    data = data.replace(regExScrollLink, `$1(${url}#$2)`);
    data = data.replace(regExImgLink, `$1(${url}/$2)`);
	return data
}

export default function docFormat(doc, data) {
	// console.log(doc.html_url + '/blob' + doc.default_branch)
	return relLinkToGlobal(data, doc.html_url + '/blob/' + doc.default_branch);
}