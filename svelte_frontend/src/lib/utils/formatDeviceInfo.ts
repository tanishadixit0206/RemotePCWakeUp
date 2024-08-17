export default function formatDeviceInfo(info:string){
    const parts=info.split(", ");
    const ip=parts[0].split(': ')[1];
    const mac=parts[1].split(': ')[1];

    return [ip,mac];
}