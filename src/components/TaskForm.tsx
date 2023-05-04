import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react';

// Css
import styles from './TaskForm.module.css';

// Interface
import { ITask } from '../interfaces/Task';

type Props = {
  btnText: string;
  taskList: ITask[];
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>
  task?: ITask | null;
  handleUpdate?(id: number, title: string, difficulty: number) : void;
}

function TaskForm({btnText, taskList, task, setTaskList, handleUpdate }: Props) {

  const [id,setId] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [difficulty, setDiffulty] = useState<number>(0);

  useEffect(() => {
    if(task){
      setId(task.id);
      setTitle(task.title);
      setDiffulty(task.difficulty);
    }
    
  },[task])

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    if(e.target.name === "title"){
      setTitle(e.target.value)
    }
    else{
      setDiffulty(parseInt(e.target.value))
    }

  }

  const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(handleUpdate){

      handleUpdate(id,title,difficulty)

    }else{
      const id = Math.floor(Math.random() * 1000);

      const newTask: ITask = {id, title, difficulty};

      setTaskList!([...taskList, newTask]);

      setTitle("");
      setDiffulty(0);
    }

    

  }

  return (
    <form onSubmit={addTaskHandler} className={styles.form}>
        <label className={styles.input_container}>
          <span>Título:</span>
          <input type='text' name="title" placeholder='Título da tarefa' onChange={handleChange} value={title}/>
        </label>
        <label className={styles.input_container}>
          <span>Dificuldade:</span>
          <input type='text' name="difficulty" placeholder='Dificuldade da tarefa' onChange={handleChange} value={difficulty}/>
        </label>
        <input type='submit' value={btnText} />
    </form>
    
  )
}

export default TaskForm