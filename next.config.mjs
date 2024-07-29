/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
    },
    webpack: (config) => {
        config.resolve.alias['@'] = path.join(__dirname, 'src');
        return config;
    },
};

export default nextConfig;
