export default function getCookie(name:string){
    const cname=name+"=";
    const decodedCookie=decodeURIComponent(document.cookie);
    console.log(decodedCookie)
    const splitCookies=decodedCookie.split(';')
    console.log(splitCookies)
    if(splitCookies.length==1){
        return splitCookies[0].substring(cname.length,splitCookies[0].length)
    }else{
        for(let i=0;i<splitCookies.length;i++){
            while(splitCookies[i].charAt(0)==' '){
                console.log(splitCookies[i])
               splitCookies[i]=splitCookies[i].substring(1)
            }
            if(splitCookies[i].indexOf("")){
                console.log(splitCookies[i])
                return splitCookies[i].substring(cname.length,splitCookies[i].length)
            }
        }
    }
    return "";
}