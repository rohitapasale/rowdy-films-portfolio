/**
 * Portfolio Videos Data
 * Add or edit videos here to update the portfolio section automatically.
 *
 * Each item supports:
 * - id: unique string identifier
 * - title: human-readable project title
 * - description: 1-2 line professional description
 * - videoSrc: path to video file (relative to project root)
 * - thumbnail: path to poster/thumbnail image
 * - category: category key matching filter buttons ('parallax', 'ad-creatives', 'motion-graphics', etc.)
 * - tags: array of tag labels displayed on the card
 */

const videos = [
    {
        id: "diwali-ramayana-parallax",
        title: "Diwali Ramayana Parallax Animation",
        description: "A dynamic 2.5D parallax animation illustrating the epic homecoming to Ayodhya with multi-plane depth and cinematic lighting.",
        videoSrc: "public/videos/diwali-ramayana-parallax-animation.mp4",
        thumbnail: "public/images/diwali-ramayana-parallax-animation.jpg",
        category: "parallax",
        tags: ["After Effects", "Parallax", "2D Animation"]
    },
    {
        id: "dussehra-parallax",
        title: "Dussehra Parallax Animation",
        description: "Cinematic battlefield sequence in layered depth, bringing traditional lore to life through multi-plane motion and sunset atmospheres.",
        videoSrc: "public/videos/dussehra_parallax_animation.mp4",
        thumbnail: "public/images/dussehra_parallax_animation.jpg",
        category: "parallax",
        tags: ["After Effects", "Parallax", "Layered Artwork"]
    },
    {
        id: "pg-advertisement",
        title: "PG Accommodation Ad Creative",
        description: "High-converting promotional video built for social platforms featuring punchy kinetic captions, upbeat pacing, and vibrant branding.",
        videoSrc: "public/videos/pg_advertisment.mp4",
        thumbnail: "public/images/pg_advertisment.jpg",
        category: "ad-creatives",
        tags: ["Ad Creatives", "Meta Campaigns", "Short Form"]
    },
    {
        id: "property-showcase-meta",
        title: "Property Showcase Meta Ads",
        description: "Room-by-room vertical real estate showcase engineered for Meta ad campaigns with quick cuts, modern typography, and hook-driven retention.",
        videoSrc: "public/videos/property_showcase_meta_ads.mp4",
        thumbnail: "public/images/property_showcase_meta_ads.jpg",
        category: "ad-creatives",
        tags: ["Meta Ads", "Short Vertical", "Video Editing"]
    },
    {
        id: "upi-explainer",
        title: "UPI Explainer Motion Graphics",
        description: "Clear and engaging educational explainer integrating custom character animations, bank motion graphics, and animated subtitles.",
        videoSrc: "public/videos/upi_explaner.mp4",
        thumbnail: "public/images/upi_explaner.jpg",
        category: "motion-graphics",
        tags: ["Motion Graphics", "After Effects", "Premiere Pro"]
    }
];

// Support both ES module and browser global loading
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { videos };
}
if (typeof window !== 'undefined') {
    window.portfolioVideos = videos;
}

