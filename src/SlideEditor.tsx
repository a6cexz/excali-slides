import React, { useState } from 'react'
import { Excalidraw } from '@excalidraw/excalidraw'
import '@excalidraw/excalidraw/index.css'
import { Slide } from './types'

export interface Props {
  slide: Slide
  editMode: boolean
  onSlideChange: (elements: any[], files: Slide['files']) => void
}

const sameElement = (el1: any, el2: any) => {
  const {
    version: _el1Version,
    versionNonce: _el1VersionNonce,
    seed: _el1Seed,
    updated: _el1Updated,
    ...el1Attributes
  } = el1
  const {
    version: _el2Version,
    versionNonce: _el2VersionNonce,
    seed: _el2Seed,
    updated: _el2Updated,
    ...el2Attributes
  } = el2
  return JSON.stringify(el1Attributes) === JSON.stringify(el2Attributes)
}

const sameElements = (elements1: any[], elements2: any[]) =>
  elements1.length === elements2.length &&
  elements1.every((el, index) => sameElement(el, elements2[index]))

export const SlideEditor = ({ slide, editMode, onSlideChange }: Props) => {
  const [initialElements, setInitialElements] = useState(slide.elements)

  const onChange = (elements: readonly any[], _appState: unknown, files: Slide['files']) => {
    const nextElements = [...elements]
    if (!sameElements(nextElements, initialElements)) {
      onSlideChange(nextElements, files)
      setInitialElements(JSON.parse(JSON.stringify(nextElements)))
    }
  }

  return (
    <div
      className="App"
      style={{
        display: 'flex',
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      {!editMode && (
        <style>{`
          .excalidraw .layer-ui__wrapper,
          .excalidraw .App-menu,
          .excalidraw .App-toolbar-container,
          footer.layer-ui__wrapper__footer {
            display: none !important;
          }
        `}</style>
      )}
      <Excalidraw
        key={slide.id}
        initialData={{
          elements: slide.elements,
          files: slide.files,
          scrollToContent: true,
        }}
        onChange={onChange}
        viewModeEnabled={!editMode}
        UIOptions={{
          welcomeScreen: false,
        }}
      />
    </div>
  )
}
