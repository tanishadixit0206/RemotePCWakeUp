export default function getCookie(name:string){
    const cname=name+"=";
    const decodedCookie=decodeURIComponent(document.cookie);
    const splitCookies=decodedCookie.split(';')
    for(let i=0;i<splitCookies.length;i++){
        while(splitCookies[i].charAt(0)==' '){
           splitCookies[i]=splitCookies[i].substring(1)
        }
        if(splitCookies[i].indexOf("")){
            return splitCookies[i].substring(cname.length,splitCookies[i].length)
        }
    }
    return "";
}