import test from 'node:test'
import assert from 'node:assert/strict'
import { contributionPath, contributionRepository } from '../src/routes.mjs'

test('contribution links resolve to generated repository pages, including a newly discovered project', () => {
  for (const repository of [
    'repowise-dev/repowise',
    'new-owner/new-project',
    'scarletkc/Hatoba',
  ]) {
    assert.equal(
      contributionRepository(contributionPath(repository)),
      repository,
    )
  }
})
test('home anchors are preserved and malformed routes resolve to the missing-project view', () => {
  assert.equal(contributionRepository('#work'), null)
  assert.equal(contributionRepository(''), null)
  for (const hash of [
    '#/contributions/%/bad',
    '#/contributions/owner',
    '#/contributions/owner/repo/extra',
    '#/contributions/%3Cscript%3E/repo',
  ]) {
    assert.equal(contributionRepository(hash), '')
  }
})
