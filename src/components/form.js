import "../styles/form.css"

function Form() {
    return (
      <form>
        <div>
            <label htmlFor="id1">Digite aqui:</label>
            <input 
                type="text"  
                id="id1"
                placeholder="Digite aqui:"    
            />
        </div>
        <div>
            <label htmlFor="id2">Digite aqui:</label>
            <input 
                type="text"  
                id="id2"
                placeholder="Digite aqui:"    
            />
        </div>
        <div>
            <label htmlFor="id3">Digite aqui:</label>
            <input 
                type="text"  
                id="id3"
                placeholder="Digite aqui:"    
            />
        </div>

        <input type="submit" value="Submit"></input>
      </form>
    );
  }
  
  export default Form;