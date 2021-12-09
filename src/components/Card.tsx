import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { useIndexedDB } from 'react-indexed-db'
import SunEditor from 'suneditor-react'
import SetOptions from 'suneditor-react/dist/types/SetOptions'
import SunEditorCore from 'suneditor/src/lib/core'
import xss from 'xss'

const editorOption: SetOptions = {
  mode: 'inline',
  buttonList: [
    [
      'paragraphStyle',
      'blockquote',
      'bold',
      'underline',
      'italic',
      'strike',
      'subscript',
      'superscript',
      'fontColor',
      'hiliteColor',
      'textStyle',
      'removeFormat',
      'outdent',
      'indent',
      'align',
      'horizontalRule',
      'list',
      'lineHeight',
      'table',
      'link',
      'image',
      'video',
      'audio',
      'imageGallery',
      'fullScreen',
      'showBlocks',
      'codeView',
      'preview',
      'template'
    ]
  ]
}

export default function Card ({ year, month, day }: { year: number, month: number, day: number }) {
  const { getByID, add, deleteRecord } = useIndexedDB('diary')
  const [diary, setDiary] = React.useState<any>(null)
  const [isEditorVisible, setEditorVisiblity] = useState(false)
  const editor = useRef<SunEditorCore>()

  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor
  }

  useEffect(() => {
    dataFetch()
    setEditorVisiblity(false)
  }, [year, month, day])

  async function apply () {
    const id = parseInt(`${year.toString().padStart(2, '0')}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`)

    if (!diary) {
      await add({ id, content: editor.current?.getContents(true), date: Date.now().toString() })
    } else {
      await deleteRecord(id)
      await add({ id, content: editor.current?.getContents(true), date: Date.now().toString() })
    }

    setEditorVisiblity(false)
    dataFetch()
  }

  function dataFetch () {
    getByID(parseInt(`${year.toString().padStart(2, '0')}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`))
      .then((v) => setDiary(v))
  }

  return (
    <motion.div initial={{ translateX: '200%' }} animate={{ translateX: 0 }} transition={{ delay: 1, duration: 0.3 }} className="w-2/3">
      <div style={{ backgroundColor: '#353A45' }} className="shadow-md p-5 w-full rounded-xl">
        <h1 className="font-pen text-4xl">{year}년 {month}월 {day}일 일기</h1>

        {!diary && <p>아직 일기가 없습니다.</p>}
        {!isEditorVisible && diary?.content && <div className="font-pen text-xl" dangerouslySetInnerHTML={{ __html: xss(diary.content) }} />}

        {isEditorVisible && (
          <div className="py-3">
            <SunEditor placeholder="여기를 눌러 일기 작성을 시작하세요" getSunEditorInstance={getSunEditorInstance} width="100%" height="30vh" defaultValue={diary?.content} setOptions={editorOption} />
            <button onClick={apply} className="mt-3 rounded-md bg-green-500 px-3 py-2">완료</button>
          </div>
        )}
      </div>
      {new Date(year, month - 1, day).getTime() < new Date().getTime() && <button className="bg-gray-500 rounded-md px-3 py-2 mt-5" onClick={() => setEditorVisiblity(!isEditorVisible)}>{!diary ? '일기 쓰기' : '일기 편집'} <FontAwesomeIcon icon={isEditorVisible ? faCaretDown : faCaretUp}/></button>}
    </motion.div>
  )
}
