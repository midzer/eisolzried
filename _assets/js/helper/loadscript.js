export function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.async = true;
        script.src = src;
        script.onload = () => {
            resolve(script.src);
        };
        script.onerror = reject;
        if (document.head.lastChild != script) {
            document.head.appendChild(script);
        }
    });
}
