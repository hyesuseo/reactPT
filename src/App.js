import { useState } from "react";

function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const title = event.target.title.value;
          const body = event.target.body.value;
          props.onCreate(title, body);
        }}
      >
        <p>
          <input type="text" name="title" placeholder="title"></input>
        </p>
        <p>
          <textarea name="body" placeholder="body"></textarea>
        </p>
        <p>
          <input type="submit" value="Create"></input>
        </p>
      </form>
    </article>
  );
}
function Header(props) {
  return (
    <header>
      <h1>
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault(); //A태그의 기본동작을 방지 리로드 일어나지 않음
            props.onChangeMode();
          }}
        >
          {props.title}
        </a>
      </h1>
    </header>
  );
}
function Nav(props) {
  const lis = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(
      <li key={t.id}>
        <a
          id={t.id}
          href={"/read/" + t.id}
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode(Number(event.target.id)); //a tag에서 id를 설정해주고, event.target.id로 해주면 그 atag에서 설정한 id를 불러올 수 있게 됨
          }}
        >
          {t.title}
        </a>
      </li>
    );
  }
  return <ol>{lis}</ol>;
}
function Article(props) {
  return (
    <article>
      <h2> {props.title}</h2>
      {props.body}
    </article>
  );
}
function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  //기존 데이터를 불러와서 틀에 보여주고
  //수정한 후
  //저장해서 값을 배열에 저장할 수 있도록
  return <article>
      <h2>Update</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const title = event.target.title.value;
          const body = event.target.body.value;
          props.onUpdate(title, body);
        }}
      >
        <p>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={event=>{
              console.log(event.target.value)
              setTitle(event.target.value)
            }}
          ></input>
        </p>
        <p>
          <textarea
            name="body"
            placeholder="body"
            value={body}
            onChange={event=>{
              setBody(event.target.value);
            }}
          ></textarea>
        </p>
        <p>
          <input type="submit" value="Update"></input>
        </p>
      </form>
    </article>
  
}
function App() {
  // const _mode = useState('Welcome');//초기값으로 해당 상태를 만든다 useState는 배열을 반환한다
  // const mode = _mode[0];
  // const setMode = _mode[1];

  const [mode, setMode] = useState("Welcome");
  //console.log("mode", mode)
  const [id, setID] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html is..." },
    { id: 2, title: "css", body: "css is..." },
    { id: 3, title: "js", body: "js is..." },
  ]);
  let content = null;
  let contextControll = null;
  if (mode === "Welcome") {
    content = <Article title="Welcome" body="Hello, WEB"></Article>;
  } else if (mode === "Read") {
    let title,
      body = null;
    for (let i = 0; i < topics.length; i++) {
      //console.log(topics[i].id, id)
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
      content = 
      <Article title={title} body={body} />;
      contextControll = (<>
        <li>
          <a
            href={"/update/" + id}
            onClick={(event) => {
              event.preventDefault();
              setMode("Update");
            }}
          >           
            Update
          </a>
        </li>
        <li>
              <input type="button" value="Delete" onClick={()=>{
                const newTopics =[]
                for (let i=0; i<topics.length; i++){
                  if(topics[i].id !== id){
                    newTopics.push(topics[i])
                  }
                }
              }}></input>
          </li>
        </>
      )
    }
  } else if (mode === "Create") {
    content = (
      <Create
        onCreate={(title, body) => {
          const newTopic = { id: nextId, title: title, body: body };
          const newTopics = [...topics];
          newTopics.push(newTopic);
          setTopics(newTopics);
          setID(nextId);
          setMode("Read");
          setNextId(nextId + 1);
        }}
      ></Create>
    );
  } else if (mode === "Update") {
    let title,
      body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    //기존의 body와 title을 가져와서 인풋타입에 나타나게 해주고
    content = (
      <Update title={title} body={body} onUpdate={(title, body) => {
        // console.log(title, body)
        const newTopics =[...topics]
        const updatedTopic = {id:id, title:title, body:body}
        for (let i =0 ; i<newTopics.length; i++){
          if(newTopics[i].id = id);
          newTopics[i]= updatedTopic
          break;
        }
        setTopics(newTopics)
        setMode('Read')

      }}></Update>
    );
  }
  return (
    <div className="App">
      <Header
        title="WEB"
        onChangeMode={() => {
          setMode("Welcome");
        }}
      />
      <Nav
        topics={topics}
        onChangeMode={(id) => {
          setMode("Read");
          setID(id);
        }}
      />
      {content}
      <ul>
        <li>
          <a
            href="/create"
            onClick={(event) => {
              event.preventDefault();
              setMode("Create");
            }}
          >
            Create
          </a>
        </li>
        {contextControll}
      </ul>
    </div>
  );
}

export default App;
