const isPages=process.env.GITHUB_ACTIONS==="true";
const repo="/construction-material-price-monitor";
/** @type {import('next').NextConfig} */
const nextConfig={output:"export",trailingSlash:true,basePath:isPages?repo:"",assetPrefix:isPages?repo:""};
export default nextConfig;
