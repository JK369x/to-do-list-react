import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import List from "./components/List";
import Alert from "./components/Alert";
function App() {
  //!variable state
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [modEdit, setModEdit] = useState(false)
  const [checkModeEdit, setCheckModeEdit] = useState(null)

  //!function
  const submitData = (e) => {
    //?e คือดักจบ event ใน form
    e.preventDefault(); //?คงค่าไว้ก่อน
    console.log("add list =", name);
    if (!name) {
      //!show alert check name is empty
      setAlert({show:true,msg:'name is empty',type:'error'})
    } else if(modEdit && name){
        const result = list.map((item)=>{
          if(item.id === checkModeEdit){
            return {...item,title:name}
          }
          return item
        })
        setList(result);
        setName("");
        setModEdit(false)
        setCheckModeEdit(null)
        setAlert({show:true,msg:'edit',type:'success'}) 
    }else{
      const newItem = {
        id: uuidv4(),
        title: name,
      };
      setList([...list, newItem]);
      setName("");
      setAlert({show:true,msg:'success',type:'success'}) 
    }
  };
  //!remove item
  const removeItem = (id) =>{
    console.log(id)
    const result = list.filter((item)=>item.id !== id)
    setList(result)
    setAlert({show:true,msg:'delete !!',type:'error'})
  }
  //!mode edit
  const Edit = (id) =>{
  setModEdit(true)
  setCheckModeEdit(id)
  const result = list.find((item)=>item.id === id)
  setName(result.title)
  }
  return (
    <section className="container">
      <h1>Todo-List</h1>
      {alert.show && <Alert {...alert} setAlert={setAlert} list={list}/>}
      <form action="" className="form-group" onSubmit={submitData}>
        <div className="form-control">
          <input
            type="text"
            className="text-input"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <button type="submit" className="submit-btn">
            {modEdit ? 'edit' : 'add'}
          </button>
        </div>
      </form>
      <section className="list-container">
        {list.map((data, index) => {
          return <List key={index} {...data} removeItem={removeItem} Edit={Edit}/>;
        })}
      </section>
    </section>
  );
}

export default App;
