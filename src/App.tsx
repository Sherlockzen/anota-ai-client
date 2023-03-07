import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [apiReturn, setApiReturn] = useState([]);

  const link: string = "https://anota-ai-server.up.railway.app/api/notes";

  const handleBtn = () => {
    const title = document.querySelector(".titleInput") as HTMLInputElement;
    const desc = document.querySelector(".descInput") as HTMLInputElement;
    console.log(typeof title.value);
    const values = {
      title: title.value,
      note: desc.value,
    };
    const opt = {
      method: "POST",
      body: JSON.stringify(values),
    };

    interface Note {
      title: string;
      note: string;
    }

    const createNote = async (note: Note) => {
      const response = await fetch('https://anota-ai-server.up.railway.app/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      });

      if (!response.ok) {
        throw new Error('Failed to create note');
      }

      const createdNote = await response.json();
      return createdNote;
    };

    createNote(values);


    // fetch(link, opt)
    //   .then((res) => res.json())
    //   .then((json) => console.log(json))
    //   .then((err) => console.log(err));
  };

  useEffect(() => {
    fetch(link).then(async (res) => setApiReturn(await res.json()));
  }, []);

  const Notes = () => {
    return (
      <div className="flex">
        {apiReturn.map((elem: { title: string; note: string }) => (
          <div className="notesList">
            <div>{`Titulo: ${elem.title}`}</div>
            <div>{`Conteudo: ${elem.note}`}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <div className="">
        <h1 className="selfAlign">Anota ai</h1>
        <div className="createNote container">
          <label className="label container">
            Titulo da nota
            <input className="titleInput" type="text" />
          </label>
          <label className="label container">
            Conteudo:
            <input className="descInput" type="text" />
          </label>
          <button onClick={handleBtn} className="add">
            Adcionar
          </button>
        </div>
      </div>
      <div className="notes">
        <div>Anotações:</div>
        {/* JOGO MEU REACT COMPONENT */}
        <Notes />
      </div>
    </div>
  );
}

export default App;
