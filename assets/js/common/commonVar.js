window.clickEventType = () => {
    return (window.ontouchstart!==null) ? 'click' : 'touchstart';
}