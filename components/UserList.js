import axios from "axios"
import { useState, useEffect } from "react"
import ReactPaginate from "react-paginate";


const UserList = () => {

    const [ users, setUsers ] = useState([]);
    const [ page, setPage ] = useState(0);
    const [ limit, setLimit ] = useState(10);
    const [ rows, setRows ] = useState(0);
    const [ pages, setPages ] = useState(0);
    const [ keyword, setKeyword ] = useState('');
    const [ query, setQuery ] = useState('');
    const [ msg, setMsg ] = useState('');


    const getUsers = async() => {
        const response = await axios.get(`http://localhost:5000/users?search_query=${keyword}&page=${page}&limit=${limit}`);
    setUsers(response.data.result)        
    setRows(response.data.totalRows)        
    setPage(response.data.page)        
    setPages(response.data.totalPage)        
    };

    useEffect(()=> {    
        getUsers();
    },[page, keyword])


    const changePage = ({selected}) => {
        setPage(selected)
        if(selected === 9) {
            setMsg('Jika data yang anda cari tidak ditemukan, Tolong cari dengan kata kunci yang spesifik!')
        } else {
            setMsg('')
        }
    }

    const searchData = (e)=> {
        e.preventDefault()
        setPage(0)
        setKeyword(query)
    }

  return (
    <>
    <div className="container mt-5">
        <div 
        className="columns">
            <div
            className="column is-centered">
                <form 
                onSubmit={searchData}
                >
                    <div className="field has-addons">
                        <div className="control is-expanded">
                            <input 
                            value={query}
                            className="input"
                            type="text"
                            placeholder="find name or email here..."
                            onChange={(e)=> setQuery(e.target.value) }
                            />                    
                    
                        </div>
                        <div className="control">
                            <button 
                            className="button is-info"
                            type="submit">
                                Search
                            </button>
                        </div>
                    </div>
                </form>
        
            <table
            className="table is-striped is-bordered is-fullwidth mt-2">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                
                <tbody>
                    {users.map((user) =>(
                    
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.gender}</td>
                    </tr>
                    
                    ))}
                </tbody>           
            </table>

            <p
            >Total rows: {rows} Page: {rows ? page + 1 : 0} of {pages}
            </p>
            <p className="has-text-centered has-text-danger">{msg}</p>
            <nav 
            className="pagination is-centered"
            key={rows}
            role="navigation"
            aria-label="pagination">
                <ReactPaginate
                containerClassName={"pagination-list"}
                previousLinkClassName={"pagination-previous"}
                nextLinkClassName={"pagination-next"}
                activeLinkClassName={"pagination-link is-current"}
                disabledLinkClassName={"pagination-link is-disabled"}
                nextLabel={'Next >'}
                previousLabel={'< prev'}
                pageCount={Math.min(10, pages)}
                onPageChange={changePage} 
                />
                </nav>
            
            </div>      
        </div>
   </div> 
   </>
  )
}

export default UserList