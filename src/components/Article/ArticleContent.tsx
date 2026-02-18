import React from 'react'

import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import RichText from '@/components/RichText'

import type { ArticleSection } from '@/utilities/parseArticleSections'
import { parseArticleSections } from '@/utilities/parseArticleSections'

type Props = {
  content: DefaultTypedEditorState | null | undefined
}

export const ArticleContent: React.FC<Props> = ({ content }) => {
  const sections = parseArticleSections(content)
  if (!sections.length) return null

  return (
    <div className="article__content_center">
      {sections.map((section) => (
        <section
          key={section.id}
          className="text-block"
          id={section.id}
          data-cb-type="ARTICLE_TEXT_BLOCK"
        >
          <RichText
            data={{
              root: {
                type: 'root',
                children: section.nodes,
              },
            } as DefaultTypedEditorState}
            enableGutter={false}
            enableProse={false}
          />
        </section>
      ))}
    </div>
  )
}
