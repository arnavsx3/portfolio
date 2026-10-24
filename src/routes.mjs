// Hash routes survive direct links and refreshes on GitHub Pages without server rewrites.
export function contributionPath(repository) {
  return `#/contributions/${repository.split('/').map(encodeURIComponent).join('/')}`
}
export function contributionRepository(hash) {
  if (!hash.startsWith('#/contributions/')) return null
  try {
    const parts = hash
      .slice('#/contributions/'.length)
      .split('/')
      .map(decodeURIComponent)
    return parts.length === 2 &&
      parts.every((part) => /^[a-z\d_.-]+$/i.test(part))
      ? parts.join('/')
      : ''
  } catch {
    return ''
  }
}
