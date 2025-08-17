// Map repository names to custom thumbnail image URLs.
// Keys should match the GitHub repository name exactly (case-sensitive), e.g. 'my-repo'.
// Values can be absolute URLs (https://...) or paths under public, e.g. '/images/projects/my-repo.jpg'.
// Example:
// export const thumbnailOverrides = {
//   'my-repo': '/images/projects/my-repo.jpg',
//   'another-repo': 'https://your-cdn.com/imgs/another.png'
// };

export const thumbnailOverrides = {
  // Sentimint project (supports common name variants)
  sentimint: '/images/projects/sentimint.jpeg',
  sentmint: '/images/projects/sentimint.jpeg',
  'Sentimint-AI-Stock-Analyser': '/images/projects/sentimint.jpeg',
  'sentimint-ai-stock-analyser': '/images/projects/sentimint.jpeg',
  'Sentimint-AI-Stock-Analyzer': '/images/projects/sentimint.jpeg',
  'sentimint-ai-stock-analyzer': '/images/projects/sentimint.jpeg',
  // Trust Drive project (blockchain)
  'trust-drive': '/images/projects/blockchain.jpg',
  TrustDrive: '/images/projects/blockchain.jpg',
  trustdrive: '/images/projects/blockchain.jpg',
  // Suspicious Baggage Detection System
  'Suspicious-Baggage-Detection-System': '/images/projects/baggage.jpeg',
  'suspicious-baggage-detection-system': '/images/projects/baggage.jpeg',
};

// Resolve a thumbnail for a given repo name using flexible matching:
// 1) Exact key match
// 2) Case-insensitive key match
// 3) Partial contains match (case-insensitive)
export function resolveThumbnailForRepo(repoName) {
  if (!repoName) return null;
  if (thumbnailOverrides[repoName]) return thumbnailOverrides[repoName];
  const lower = String(repoName).toLowerCase();
  // Case-insensitive exact
  for (const key of Object.keys(thumbnailOverrides)) {
    if (key.toLowerCase() === lower) return thumbnailOverrides[key];
  }
  // Partial contains
  for (const key of Object.keys(thumbnailOverrides)) {
    if (lower.includes(String(key).toLowerCase())) {
      return thumbnailOverrides[key];
    }
  }
  return null;
}


