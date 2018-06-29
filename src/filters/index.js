import timeago from 'timeago.js'


export function timeAgo(time){
    let instance = timeago()
    return instance.format(time, 'zh_CN')
}

export function parseHomeNews(obj){
    switch(obj.content){
        case '申请特价':
            return `${obj.applyObjectName}申请特价中`
            break
        case '申请签约':
            return `${obj.applyName}${obj.content}${obj.applyObjectName}`
            break
        case '取消特价':
            return `${row.applyObjectName}取消特价中`
            break
        default:
            return obj.content
    }
}