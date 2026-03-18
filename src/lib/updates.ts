const fallbackUpdateRepo = "madmalio/cutlist";
const fallbackSiteUrl = "https://www.cutlogic.app";

type GitHubLatestReleaseResponse = {
  tag_name?: string;
  html_url?: string;
  published_at?: string;
  body?: string;
};

export type LatestUpdatePayload = {
  latestVersion: string;
  releaseUrl: string;
  publishedAt: string;
  releaseNotes: string;
  downloadUrl: string;
};

function buildStableWindowsDownloadUrl() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL?.trim() || fallbackSiteUrl;
  return `${baseUrl.replace(/\/$/, "")}/download/windows`;
}

function normalizeVersion(tag: string) {
  const value = String(tag || "").trim();
  if (!value) {
    return "";
  }
  return value.startsWith("v") || value.startsWith("V")
    ? value.slice(1)
    : value;
}

export async function getLatestUpdatePayload(): Promise<LatestUpdatePayload> {
  const repo = process.env.GITHUB_RELEASE_REPO?.trim() || fallbackUpdateRepo;
  const apiUrl = `https://api.github.com/repos/${repo}/releases/latest`;

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "cutlogic-website",
  };

  const token = process.env.GITHUB_TOKEN?.trim();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(apiUrl, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`GitHub latest release request failed (${response.status})`);
  }

  const release = (await response.json()) as GitHubLatestReleaseResponse;
  const latestVersion = normalizeVersion(release.tag_name || "");
  if (!latestVersion) {
    throw new Error("Latest release is missing a valid tag");
  }

  return {
    latestVersion,
    releaseUrl: String(release.html_url || "").trim(),
    publishedAt: String(release.published_at || "").trim(),
    releaseNotes: String(release.body || "").trim(),
    downloadUrl: buildStableWindowsDownloadUrl(),
  };
}
