import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { slugify } from './slugify'

type LexicalNode = {
  type?: string
  tag?: string
  children?: LexicalNode[]
  text?: string
  [key: string]: unknown
}

export type ArticleSection = {
  id: string
  title: string
  nodes: LexicalNode[]
}

function getHeadingText(node: LexicalNode): string {
  if (!node.children?.length) return ''
  return node.children
    .map((c) => ('text' in c && typeof c.text === 'string' ? c.text : ''))
    .join('')
    .trim()
}

/**
 * Parse Lexical post content into sections by h2 headings.
 * Each section has slugified id, title, and nodes (heading + content until next h2).
 */
export function parseArticleSections(
  content: DefaultTypedEditorState | null | undefined,
): ArticleSection[] {
  if (!content?.root?.children?.length) return []

  const children = content.root.children as LexicalNode[]
  const sections: ArticleSection[] = []
  let current: { id: string; title: string; nodes: LexicalNode[] } | null = null

  for (const node of children) {
    const isH2 = node.type === 'heading' && node.tag === 'h2'
    if (isH2) {
      const title = getHeadingText(node)
      const id = slugify(title) || `section-${sections.length}`
      current = { id, title, nodes: [node] }
      sections.push(current)
    } else if (current) {
      current.nodes.push(node)
    } else {
      // Content before first h2: add to a single intro section
      const intro = { id: 'intro', title: '', nodes: [node] }
      sections.push(intro)
      current = intro
    }
  }

  return sections
}
