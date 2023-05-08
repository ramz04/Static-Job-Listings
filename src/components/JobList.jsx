import Filter from "./Filter"
import data from '../assets/data.json'
import {useState , useEffect} from 'react'


function JobList() {

    const [jsonData, setJsonData] = useState([])
    useEffect(() => {
        setJsonData(data)
    }, [])


    const langAndTools = []
    if(jsonData.tools){
        langAndTools.concat(jsonData.tools)
    }
    if(jsonData.languages){
        langAndTools.concat(jsonData.languages)
    }

    console.log(jsonData.tools)

  return (
    <div className="jobs">
        <Filter />
        {jsonData.length === 0 ?
        (
            <p>Jobs are fetching ...</p>
        ) : 
        (
            jsonData.map((i) => 
            <main className={`card shadow-md ${i.featured && 'card--border'}`} key={i.id}>
            <section className="card--wrapper">
                <div className="card--img">
                    <img src={i.logo} alt={i.company} />
                </div>
                <div className="card--company">
                    {i.company}
                    <div className="card--company-feat">
                        {i.new && <span className="new">NEW!</span>}
                        {i.featured && <span className="featured">FEATURED</span>}
                    </div>
                </div>
                <div className="card--position">
                    {i.position}
                </div>
                <div className="card--items">
                    {i.postedAt} · {i.contract} · {i.location}
                </div>
            </section>
            <hr />
            <section className="card--filter">
                <span>{i.role}</span>
                <span>{i.level}</span>
                {i.languages ? (
                    i.languages.map((x,ind) => <span key={ind}>{x}</span>)
                ): ''}
                {i.tools ? (
                    i.tools.map((z,ind) => <span key={ind}>{z}</span>)
                ): ''}
            </section>
        </main>) 
        )}
    </div>
  )
}

export default JobList