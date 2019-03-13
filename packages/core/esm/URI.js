const URI = {
    parse: (url) => {
        const [protocol, hostname] = url.split("://");
        const parts = { protocol, hostname, path: "/" };
        return parts;
    },
    build: ({ protocol, hostname }) => {
        return `${protocol}://${hostname}`;
    }
};

export default URI;
