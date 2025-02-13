import React, { useEffect } from 'react'
import { useState } from 'react'
import '../Styles/style.css'

const Todo = () => {

  // array that store title and  description 
  const [listArray, setlistArray] = useState([])

  // array for completed list 
  const [completedList, setcompletedList] = useState([])

  // variables that take title and description 
  const [newtitle, setnewtitle] = useState('')
  const [newdec, setnewdec] = useState('')


  //toggale button 
  const [showcompleted , setshowcompleted ] = useState(false);

  

    
  const addfunc =()=>{

    if(!newtitle.trim() || !newdec.trim())
    {
      alert("empty title or desc cannot be added")
      return
    }



    //creating  a object that stores title and description
    let listobj = {
      title : newtitle,
      description: newdec
    }
    


    //adding into the array using
    setlistArray((prevstate)=>{
      let duparray = [...prevstate]
      duparray.push(listobj);
      localStorage.setItem("todolist",JSON.stringify(duparray)) //
      //used to store it in a localstorage so that it can be accessed when refreshed 
      return duparray
    })

    //clearing the newtitle and description
    setnewtitle('');
    setnewdec('');
    
  }


  const clickOnDelete = (index) => {
    setlistArray((prevlist)=>{
      const updatedlist = prevlist.filter((_,i)=> i != index);
      //filter function that iterates over the list and  is used to filter the list by removing exceeding the elements that returns false for the condition 
      //above _ is a element and i is the index of that element and when i != index if it false that element will be excludded  
      localStorage.setItem("todolist",JSON.stringify(updatedlist));
      return updatedlist;
    })
    console.log(index, "deleted ");
    alert("item deleted")
  }


  const clickOnComplete = (index)=>{
    setcompletedList((prevlist)=>{
     const completeditem = listArray[index];
     const updatedlist = [...prevlist, completeditem];

     localStorage.setItem("completedList",JSON.stringify(updatedlist));
     return updatedlist;
    })

    //to remove or to update the listarray element along with the localStorage after completed clicked
    setlistArray((prevlist)=>{
      const updatedlist = prevlist.filter((_,i)=> i != index);

      //to remove or to update the localstorage after completed 
      localStorage.setItem("todolist",JSON.stringify(updatedlist))
      return updatedlist;
    })

    
  }



  //used to retrieve the data from localstorage From both cpmpletedlist and todolist 
  useEffect(() => {
    const localstorageItem = localStorage.getItem("todolist");
    if(localstorageItem)
    {
      setlistArray(JSON.parse(localstorageItem)) 
      //here we store the items in array converting into object using .parse when refreshed 
    }

    //forr completedlist
    const localstorageItem2 = localStorage.getItem("completedList");
    if(localstorageItem2)
    {
      setcompletedList(JSON.parse(localstorageItem2));
    }
  }, [])
  

  //
  const clickOnDeleteFromCompleted = (index)=>{

    setcompletedList((prevlist)=>{
      const updatedlist = prevlist.filter((_,i)=> i != index);
      //filter function that iterates over the list and  is used to filter the list by removing exceeding the elements that returns false for the condition 
      //above _ is a element and i is the index of that element and when i != index if it false that element will be excludded  
      localStorage.setItem("completedList",JSON.stringify(updatedlist));
      return updatedlist;
    })
  }
 
  

  return (
    <>
      <div className="main">

        {/* the below extra forflexmain is just for flex and for responsive design  */}
        <div className="forflexmain">
          <div className="main1">
            <span>Todo App</span>
            <div>This app is developed using reactjs </div>
          </div>
        </div>
        



        {/* main container */}
        <div className="maincontainer">
        
          <div className="submain">
              <div className="title">Enter Title
                <input type="text"  placeholder='entertitle' id='titleinp' value={newtitle} onChange={(e)=>{setnewtitle(e.target.value)}} />
              </div>

              <label className="desc">Description 
                <input type="text"  placeholder='enter desc' id='descinp' value={newdec} onChange={(e)=>{setnewdec(e.target.value)}}/>
              </label>

              {/* butoon to add  */}
              <div className="forflexbtn">
                <div className="button">
                    <button className="add" onClick={()=>{addfunc()}}>ADD</button>
                </div>
                <div className='button'>
                    <button className='view-completed' onClick={()=>{setshowcompleted(!showcompleted)}}>{showcompleted ? "view todo list" : "view completed list"}</button>
                </div>
              </div>
              
 
          </div>
        </div>
        

        <div className="display">
          {!showcompleted ? (
            <div>
            {listArray.map((item,index)=>{
              return (
                <>
                  <div className="forflex3">
                    <div key={index}>
                      <div>{item.title}</div>
                      <div>{item.description}</div>
                      <div className='forflex2'>
                        <div className="btn">
                          <button className="delete delcom" onClick={()=>clickOnDelete(index)}>Delete</button>
                        </div>
                        <div className="btn">
                          <button className='completed delcom' onClick={()=>{clickOnComplete(index)}}>Completed</button>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </> );}
              )
            }
          </div>):(
            <div>
            {completedList.map((item,index)=>{
              return (
                <>
                  <div className="forflex3">
                    <div key={index}>
                      <div>{item.title}</div>
                      <div>{item.description}</div>
                      <div className='forflex2'>
                        <div className="btn">
                          <button className="delete delcom" onClick={()=>clickOnDeleteFromCompleted(index)}>Delet From Completed</button>
                        </div>
                        {/* <div className="btn">
                          <button className='completed delcom' onClick={()=>{clickOnComplete(index)}}>Completed</button>
                        </div> */}
                      </div>
                    </div>
                    
                  </div>
                </> );}
              )
            }
          </div>
          )}  
          
        </div>

          
      </div>
      
    </>
  )
}

export default Todo


// extra learning 
//  main that displays title and Description */}
//           { {newtitle && //here to return more than one div use react fragment <> 
//             <>
//               <div>{newtitle}</div>
//               <div>{newdec}</div>
//             </>
//           } }  
// below we have to use return explicitly if uisng {} if not use  simple () 
          

