import './App.css'
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import { useEffect, useState } from 'react';
import uuid from 'react-uuid';

function App() {
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || []); // 状態変数 空の配列に複数のノートを保持
  const [activeNote, setActiveNote] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes)); // ローカルストレージへ保存
  }, [notes]);

  useEffect(() => {
    setActiveNote(notes[0].id); 
  }, []);

  const onAddNote = () => {
    console.log("ノート追加");
    const newNote = {
      id: uuid(), // uuid生成メソッド 
      title: "newNote",
      content: "内容",
      modDate: Date.now()
    };
    setNotes([...notes, newNote]); // スプレット構文 以前の配列に要素を追加する
    console.log(notes);
  };

  const onDeleteNote = (id) => {
    const filterNotes = notes.filter((note) => note.id !== id);
    setNotes(filterNotes);
  };

  const getAntiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };

  /** 修正された新しいノートの配列を返す。 */
  const onUpdateNote = (updatedNote) => { // id, key, dateを取得
    const updatedNotesArray = notes.map((note) => {
      if(note.id === updatedNote.id) { // activeNote.id
        return updatedNote;
      } else {
        return note;
      }
    });

    setNotes(updatedNotesArray);
  };

  return (
  <div className='App'>
    <Sidebar onAddNote={onAddNote} notes={notes} onDeleteNote={onDeleteNote} activeNote={activeNote} setActiveNote={setActiveNote} />
    <Main activeNote={getAntiveNote()} onUpdateNote={onUpdateNote}/>
  </div>
  );  
}

export default App;
