export function getRedirectPath({type, avatar}) {
    /**
     * 根据用户信息，返回跳转地址
     * user.type => /boss && /genius
     * 根据是否有头像判断是否完善了信息
     * user.avatar => /bossinfo && geniusinfo
     */

    let url = (type === 'boss') ? '/boss' : '/genius'
    if (!avatar) {
        url += 'info'
    }
    return url;
}

export function getChatId(userId, targetId) {
    return [userId, targetId].sort().join('_');
}